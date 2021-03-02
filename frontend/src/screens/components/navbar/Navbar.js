import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import action from "../../../redux/action";

function Index(props) {
  const [isHovered, setHover] = useState(false);

  const logOut = (e) => {
    props.dispatch(action.loggedOut());
    localStorage.removeItem("id");
    localStorage.removeItem("username");
  };
  return (
    <div>
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button
              type="button"
              className="btn btn-navbar"
              data-toggle="collapse"
              data-target=".nav-collapse"
            >
              {" "}
              <span className="icon-bar" /> <span className="icon-bar" />{" "}
              <span className="icon-bar" />{" "}
            </button>
            <a className="brand" href>
              PPL
            </a>
            <div className="pro_info pull-right">
              <div className="pro_icn">
                <img src="/images/pic_small.png" alt="" />
              </div>
              <div className="pro_txt">
                me
                <b className="caret" />
              </div>
              {localStorage.getItem("id") && (
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dLabel"
                >
                  <li>
                    <a tabIndex={-1} href>
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href>
                      Message Box
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href>
                      Change Language
                    </a>
                  </li>
                  <li>
                    <Link to="/" onClick={logOut} tabIndex={-1} href>
                      Logout
                    </Link>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1} href>
                      <input type="text" placeholder="search" />
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active">
                  {" "}
                  <Link to="/timeline">Home</Link>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>E-Coupons</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>E-Brands</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>Resuse Market</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>Lost and Found</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="header_lft">
          <div className="logo">
            <a href>
              <img src="/./images/logo.png" alt="" />
            </a>
          </div>
          <div className="navigatn">
            <ul>
              <li>
                <a href className="active">
                  Home
                </a>
              </li>
              <li>
                <a href> E-Coupons </a>
              </li>
              <li>
                <a href>E-Brands </a>
              </li>
              <li>
                <a href> Resuse Market </a>
              </li>
              <li>
                <a href> Lost and Found</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div">
            <img src="/./images/flag.png" alt="" />
          </div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box">
            <a href>
              <span className="msg_count">100</span>
            </a>
          </div>
          <div className="info_div">
            <div
              className="image_div"
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {" "}
              <img src="/./images/pic.png" alt="" />{" "}
              {isHovered && localStorage.getItem("id") && (
                <button
                  size="l"
                  style={{
                    position: "absolute",
                    top: "55px",
                    right: "65px",
                  }}
                  variant="primary"
                >
                  <Link to="/" onClick={logOut} tabIndex={-1} href>
                    Logout
                  </Link>
                </button>
              )}
            </div>

            <div className="info_div1">Me</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    userData: state.data,
  };
}
export default connect(mapStateToProps)(Index);
