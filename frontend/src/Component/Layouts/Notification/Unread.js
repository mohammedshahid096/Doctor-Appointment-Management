import React, { useEffect } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineDoNotDisturbOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "../../AlertPops/Alertpop";
import Loader from "../../Loader/Loader";
import { CHANGE_UNREAD_NOTI_RESET } from "../../../Constants/UserConstants";
import {
  ChangeNotificationAction,
  userClearErrorsAction,
} from "../../../Actions/UserAction";

const Unread = (props) => {
  const { allnotifications, functionCall } = props;

  const dispatch = useDispatch();
  const { loading, isReaded, error } = useSelector(
    (state) => state.Notification
  );

  const markAllNotifications = () => {
    dispatch(ChangeNotificationAction());
  };

  useEffect(() => {
    if (isReaded) {
      ToastSuccess(isReaded);
      dispatch({ type: CHANGE_UNREAD_NOTI_RESET });
      functionCall();
    }
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
  }, [dispatch, isReaded, error, functionCall]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {allnotifications.length === 0 ? (
            <div className="nonotification">
              <di>No</di>
              <MdOutlineDoNotDisturbOff />
              <div>Notifications</div>
            </div>
          ) : (
            <>
              <p onClick={markAllNotifications}>Mark all read</p>
              {allnotifications.map((item) => {
                return (
                  <div className="unreadClass">
                    <div>{<FaRegEnvelope />}</div>
                    <div>
                      <div>{item.type}</div>
                      <small>{item.message}</small>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Unread;
