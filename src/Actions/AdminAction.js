import URLConstant from "../Constants/URLConstant";
import axios from "axios";
import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ADMIN_CLEAR_ERRORS,
  ALL_DOCTORS_REQUEST,
  ALL_DOCTORS_SUCCESS,
  ALL_DOCTORS_FAIL,
  CHANGE_DOCTOR_ACCOUNT_STATUS_REQUEST,
  CHANGE_DOCTOR_ACCOUNT_STATUS_SUCCESS,
  CHANGE_DOCTOR_ACCOUNT_STATUS_FAIL,
} from "../Constants/AdminConstant";

// TODO : getting  all the  users list
export const AllUserAdminAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: ALL_USERS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(`${URLConstant}/admin/users`, config);

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : getting  all the  doctors list
export const AllDoctorAdminAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: ALL_DOCTORS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(`${URLConstant}/admin/doctors`, config);

    dispatch({
      type: ALL_DOCTORS_SUCCESS,
      payload: data.doctors,
    });
  } catch (error) {
    dispatch({
      type: ALL_DOCTORS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : changing the doctor status
export const ChangeDoctorStatusAction =
  (DoctorID, DoctorStatus) => async (dispatch, getState) => {
    try {
      const headertoken = getState().user.token;
      dispatch({ type: CHANGE_DOCTOR_ACCOUNT_STATUS_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${headertoken}`,
        },
      };

      const { data } = await axios.put(
        `${URLConstant}/admin/changeaccoutstatus`,
        { DoctorID, DoctorStatus },
        config
      );
      dispatch({
        type: CHANGE_DOCTOR_ACCOUNT_STATUS_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_DOCTOR_ACCOUNT_STATUS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// TODO : for clearing all the admin errors
export const AdminClearErrorAction = () => async (dispatch) => {
  dispatch({ type: ADMIN_CLEAR_ERRORS });
};
