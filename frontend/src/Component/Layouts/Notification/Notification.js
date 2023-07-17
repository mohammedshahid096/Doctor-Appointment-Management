import React, { useState } from "react";
import LayoutDesign from "../MainLayout/Layout";
import "./Notification.css";
import { AiOutlineNotification, AiFillMessage } from "react-icons/ai";
import Unread from "./Unread";
import { useSelector, useDispatch } from "react-redux";
import Read from "./Read";
import { RefreshUserAction } from "../../../Actions/UserAction";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [notificationBoolean, setnotificationBoolean] = useState(true);
  const ChangeNotification = (x) => {
    if (x) {
      setnotificationBoolean(false);
    }
    if (!x) {
      setnotificationBoolean(true);
    }
  };

  const childToParentcall = () => {
    dispatch(RefreshUserAction());
  };
  return (
    <LayoutDesign>
      <div className="notificationMain">
        <header>
          <h1>Notifications</h1>
        </header>
        <div
        //   style={{ padding: document.innerWidth > "600px" ? "2rem" : "1rem" }}
        >
          <nav>
            <div
              className={notificationBoolean ? "notiactiveclass" : ""}
              onClick={() => ChangeNotification(false)}
            >
              {" "}
              <AiOutlineNotification />
              Notification ({user && user.notification.length})
            </div>

            <div
              className={notificationBoolean ? "" : "notiactiveclass"}
              onClick={() => ChangeNotification(true)}
            >
              <AiFillMessage />
              Readed ({user.seennotification.length})
            </div>
          </nav>

          <div className="changeWrapper">
            {notificationBoolean ? (
              <Unread
                allnotifications={user.notification}
                functionCall={childToParentcall}
              />
            ) : (
              <Read
                allseennotifications={user.seennotification}
                functionCall={childToParentcall}
              />
            )}
          </div>
        </div>
      </div>
    </LayoutDesign>
  );
};

export default Notification;
