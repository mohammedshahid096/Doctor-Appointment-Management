import React, { useState, useEffect } from "react";
import { MdOutlineDoNotDisturbOff } from "react-icons/md";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../../AlertPops/Alertpop";
import Loader from "../../Loader/Loader";
import {
  DeleteNotificationAction,
  userClearErrorsAction,
} from "../../../Actions/UserAction";
import { DELETE_NOTIFICATION_RESET } from "../../../Constants/UserConstants";

const Read = (props) => {
  const { allseennotifications, functionCall } = props;
  const dispatch = useDispatch();
  const { loading, isDeleted, error } = useSelector(
    (state) => state.Notification
  );

  const [deleteChecks, setdeleteChecks] = useState([]);
  const [selectAll, setselectAll] = useState(false);

  const onChangeCheckHanlder = (event, index) => {
    let prev = deleteChecks;
    let itemIndex = prev.indexOf(index);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(index);
    }
    setdeleteChecks([...prev]);
  };

  const SelectAllHandler = () => {
    setselectAll(!selectAll);
  };

  const DeleteNotificationHandler = () => {
    if (deleteChecks.length === 0) {
      ToastWarning("Select the notification");
      return;
    }
    dispatch(DeleteNotificationAction(deleteChecks));
    setdeleteChecks([]);
  };

  useEffect(() => {
    if (isDeleted) {
      ToastSuccess(isDeleted);
      dispatch({ type: DELETE_NOTIFICATION_RESET });
      functionCall();
    }
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
  }, [dispatch, isDeleted, error, functionCall]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {allseennotifications.length === 0 ? (
            <div className="nonotification">
              <di>No</di>
              <MdOutlineDoNotDisturbOff />
              <div>Notifications</div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <p onClick={SelectAllHandler}>
                  {selectAll ? "Unselect All" : "Select All"}
                </p>
                <p onClick={DeleteNotificationHandler}>Delete</p>
              </div>
              {allseennotifications.map((item, index) => {
                return (
                  <div className="unreadClass" key={index}>
                    <div>
                      <Checkbox
                        onChange={(e) => onChangeCheckHanlder(e, index)}
                      />
                    </div>
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

export default Read;
