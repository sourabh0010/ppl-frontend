import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TimelineRight from "./timeline_right";
import Url from "../../util/Config";
import Like from "./components/Like";

function Timeline(props) {
  //taking userid from localstorage
  const id = localStorage.getItem("id");

  //settting up hooks

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [click, setClick] = useState(0);
  //fetching all post from database
  useEffect(() => {
    axios.get(`${Url.baseurl}/upload/getpost`).then((response) => {
      console.log("hi")
      setData(response.data);
    });

    //featching user details

    axios.post(`${Url.baseurl}/auth/users`, { _id: id }).then((response) => {
      console.log("hello")
      setUser(response.data);
    });
  }, [click]);
  //trigering effect on every new post

  const ReloadPageOnEveryPost = (e) => {
    setClick(click + 1);
  };

  const updateClick = async (postId, e) => {
    //updating likes
    e.preventDefault();
    await Like.Makelikes(postId, id);

    setClick(click + 1);
  };

  return (
    <div>
      {console.log(user)}
      <div className="container">
        <div className="content">
          <TimelineRight handlec={ReloadPageOnEveryPost} />
          <div className="content_lft">
            <div className="contnt_1">
              <div className="list_1">
                <ul>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Friends
                  </li>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Flaged
                  </li>
                </ul>
              </div>
              <div className="timeline_div">
                <div className="timeline_div1">
                  <div className="profile_pic">
                    <img alt="" src="/images/timeline_img1.png" />
                    <div className="profile_text">
                      <a href>Change Profile Pic</a>
                    </div>
                  </div>
                  <div className="profile_info">
                    <div className="edit_div">
                      <a href>
                        Edit <img alt="" src="/images/timeline_img.png" />
                      </a>
                    </div>
                    <div className="profile_form">
                      <ul>
                        <li>
                          <div className="div_name1">Name :</div>
                          <div className="div_name2">{user.username}</div>
                        </li>
                        <li>
                          <div className="div_name1">Sex :</div>
                          <div className="div_name2">Male </div>
                        </li>
                        <li>
                          <div className="div_name1">Description :</div>
                          <div className="div_name3">
                            This is an example of a comment. You can create as
                            many comments like this one or sub comments as you
                            like and manage all of your content inside Account.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="timeline_div2">
                  <ul>
                    <li>
                      <a href className="active">
                        Timeline{" "}
                      </a>
                    </li>
                    <li>
                      <a href>About </a>
                    </li>
                    <li>
                      <a href>Album</a>
                    </li>
                    <li>
                      <a href> Pets</a>
                    </li>
                    <li>
                      <a href>My Uploads </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="contnt_2">
              {data
                .map((item) => {
                  return (
                    <div className="div_a">
                      <div className="div_title">{item.description} </div>
                      <div className="btm_rgt">
                        <div className="btm_arc">{item.category}</div>
                      </div>
                      <div className="div_top">
                        <div className="div_top_lft">
                          <img alt="" src="/images/img_6.png" />
                          {user.username}
                        </div>
                        <div className="div_top_rgt">
                          <span className="span_date">{item.date}</span>
                          <span className="span_time">{item.time}</span>
                        </div>
                      </div>
                      <Link to={`/${item._id}`}>
                        <div className="div_image">
                          <img
                            src={`http://localhost:3002/${item.image}`}
                            alt="pet"
                          />
                        </div>
                      </Link>
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
                              <a href onClick={(e) => updateClick(item._id, e)}>
                                <span className="btn_icon">
                                  <img src="/images/icon_003.png" alt="share" />
                                </span>
                                {item.likes.length} Likes
                              </a>
                            </li>
                            <li>
                              <a href>
                                <span className="btn_icon">
                                  <img src="/images/icon_004.png" alt="share" />
                                </span>
                                {item.comments.length} Comments
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Timeline;
