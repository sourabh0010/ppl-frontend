import React, { useEffect, useState } from "react";
import axios from "axios";

import Url from "../../../util/Config";
import FormInput from "../../../components/forms/Form";
import like from "../components/Like";

function Index(props) {
  //taking data from localsy=torage
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  //setting up hooks
  const [post, setPost] = useState({});
  const [likeLength, setLikeLength] = useState(0);
  const [isLIke, setIsLIke] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);
  const [commentTxt, setCommentTxt] = useState("");
  const [openCommentBox, setOpenCommentBox] = useState(false);

  const id = props.match.params.id; //post id from url

  //fetching a single post
  useEffect(() => {
    axios.post(`${Url.baseurl}/upload/singlepost`, { _id: id }).then((res) => {
      setPost(res.data[0]);
      setLikeLength(res.data[0].likes.length);
      setComments(res.data[0].comments);
      setCommentsLength(res.data[0].comments.length);
      const a = res.data[0].likes.includes(userId);
      setIsLIke(a);
    });
  }, []);
  //updating likes
  const ChangeLike = async (e) => {
    e.preventDefault();
    const data = await like.Makelikes(id, userId);
    setLikeLength(data.data[0].likes.length);
    const a = data.data[0].likes.includes(userId);
    setIsLIke(a);
  };
  const handleCommentClick = (e) => {
    //typing in comment input box
    e.preventDefault();
    setCommentTxt(e.target.value);
  };

  //submiting a new comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${Url.baseurl}/upload/comment`, {
        _id: id,
        username: username,
        text: commentTxt,
      })
      .then((res) => {
        setComments(res.data[0].comments);
        setCommentsLength(res.data[0].comments.length);
        setOpenCommentBox(false);
      });
  };
  const handleOpenComment = (e) => {
    //toggling comment box
    e.preventDefault();
    setOpenCommentBox(!openCommentBox);
  };
  return (
    <div>
      <div className="container">
        <div className="content"></div>
        {/* <TimelineRight /> */}
        <div className="content_lft">
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">{post.description}</div>
              <div className="btm_rgt">
                <div className="btm_arc">{post.category}</div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img alt="" src="/images/img_6.png" />
                  {post.username}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">{post.date}</span>
                  <span className="span_time">{post.time}</span>
                </div>
              </div>
              <div className="div_image">
                <img alt="" src={`${Url.baseurl}/${post.image}`} />
              </div>
              <div className="div_btm">
                <div className="btm_list">
                  <ul>
                    <li>
                      <a href>
                        <span className="btn_icon">
                          <img src="/images/icon_001.png" alt="share" />
                        </span>
                        Share
                      </a>
                    </li>
                    <li>
                      <a href>
                        <span className="btn_icon">
                          <img src="/images/icon_002.png" alt="share" />
                        </span>
                        Flag
                      </a>
                    </li>
                    <li>
                      {isLIke ? (
                        <a href onClick={ChangeLike}>
                          <span className="btn_icon">
                            <img src="/images/icon_003.png" alt="share" />
                          </span>
                          {likeLength} Likes
                        </a>
                      ) : (
                        <a href onClick={ChangeLike}>
                          <span className="btn_icon btn_icon1">
                            <img src="/images/icon_003.png" alt="share" />
                          </span>
                          {likeLength} Likes
                        </a>
                      )}
                    </li>
                    <li>
                      <a href onClick={handleOpenComment}>
                        <span className="btn_icon">
                          <img src="/images/icon_004.png" alt="share" />
                        </span>
                        {commentsLength} Comments
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="contnt_3">
            {openCommentBox && (
              <form onSubmit={handleCommentSubmit}>
                <FormInput
                  lable="Type comment"
                  placeholder="Enter your comment"
                  type="text"
                  name="comment"
                  onchange={handleCommentClick}
                />
                <FormInput type="submit" />
              </form>
            )}
            <ul>
              {comments
                .map((item) => {
                  return (
                    <li>
                      <div className="list_image">
                        <div className="image_sec">
                          <img alt="" src="/images/post_img.png" />
                        </div>
                        <div className="image_name">{item.username}</div>
                      </div>
                      <div className="list_info">{item.text}</div>
                      <input
                        type="button"
                        defaultValue="Reply"
                        className="orng_btn"
                      />
                    </li>
                  );
                })
                .reverse()}
            </ul>
            <div className="view_div">
              <a href>View more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
