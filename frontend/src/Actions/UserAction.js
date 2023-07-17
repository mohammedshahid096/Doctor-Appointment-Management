import URLConstant from "../Constants/URLConstant";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REFRESH_USER_REQUEST,
  REFRESH_USER_SUCCESS,
  REFRESH_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  APPLY_DOCTOR_REQUEST,
  APPLY_DOCTOR_FAIL,
  APPLY_DOCTOR_SUCCESS,
  CHANGE_UNREAD_NOTI_FAIL,
  CHANGE_UNREAD_NOTI_REQUEST,
  CHANGE_UNREAD_NOTI_SUCCESS,
  DELETE_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_REQUEST,
  ALL_APPROVED_DR_REQUEST,
  ALL_APPROVED_DR_SUCCESS,
  ALL_APPROVED_DR_FAIL,
  SINGLE_DOCTOR_DETAIL_REQUEST,
  SINGLE_DOCTOR_DETAIL_SUCCESS,
  SINGLE_DOCTOR_DETAIL_FAIL,
  BOOK_APPOINTMENT_SUCCESS,
  BOOK_APPOINTMENT_REQUEST,
  BOOK_APPOINTMENT_FAIL,
  CHECK_APPOINTMENTS_REQUEST,
  CHECK_APPOINTMENTS_SUCCESS,
  CHECK_APPOINTMENTS_FAIL,
  USER_APPOINTMENTS_REQUEST,
  USER_APPOINTMENTS_SUCCESS,
  USER_APPOINTMENTS_FAIL,
} from "../Constants/UserConstants";
import axios from "axios";

// TODO :  Login Action
export const LoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/login`,
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : Register the User
export const SignupAction = (Data) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${URLConstant}/user/register`,
      Data,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : Load user
export const LoadUserAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(`${URLConstant}/user/me`, config);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL });
  }
};

// TODO : refresh user
export const RefreshUserAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: REFRESH_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(`${URLConstant}/user/me`, config);
    dispatch({
      type: REFRESH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: REFRESH_USER_FAIL });
  }
};

// TODO : Logout Action
export const LogoutAction = () => async (dispatch) => {
  try {
    await axios.get(`${URLConstant}/user/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : Apply for a Doctor Post
export const applyDoctorAction = (Details) => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: APPLY_DOCTOR_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.post(
      `${URLConstant}/user/doctor-apply`,
      Details,
      config
    );
    dispatch({
      type: APPLY_DOCTOR_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: APPLY_DOCTOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : changing unread notification to read notification
export const ChangeNotificationAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: CHANGE_UNREAD_NOTI_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.put(
      `${URLConstant}/user/change-notification-read`,
      null,
      config
    );

    dispatch({
      type: CHANGE_UNREAD_NOTI_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_UNREAD_NOTI_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : delete the notifications
export const DeleteNotificationAction =
  (lists) => async (dispatch, getState) => {
    try {
      const headertoken = getState().user.token;
      dispatch({ type: DELETE_NOTIFICATION_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${headertoken}`,
        },
        data: {
          lists,
        },
      };

      const { data } = await axios.delete(
        `${URLConstant}/user/delete-notifcation`,
        config
      );

      dispatch({
        type: DELETE_NOTIFICATION_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: DELETE_NOTIFICATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TODO : All Aproved doctors will be show on home page
export const AllAprovedDoctorsAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: ALL_APPROVED_DR_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(`${URLConstant}/user/doctors`, config);
    dispatch({
      type: ALL_APPROVED_DR_SUCCESS,
      payload: data.doctors,
    });
  } catch (error) {
    dispatch({
      type: ALL_APPROVED_DR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : getting a single doctor details
export const SingledDoctorAction = (doctorID) => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: SINGLE_DOCTOR_DETAIL_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(
      `${URLConstant}/user/doctors/${doctorID}`,
      config
    );
    dispatch({
      type: SINGLE_DOCTOR_DETAIL_SUCCESS,
      payload: data.doctorDetails,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_DOCTOR_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : booking an appointment
export const BookAppointmentAction =
  (Details) => async (dispatch, getState) => {
    try {
      const headertoken = getState().user.token;
      dispatch({ type: BOOK_APPOINTMENT_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${headertoken}`,
        },
      };

      const { data } = await axios.post(
        `${URLConstant}/user/booking`,
        Details,
        config
      );

      dispatch({
        type: BOOK_APPOINTMENT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: BOOK_APPOINTMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TODO : booking an appointment
export const CheckAppointmentsAction =
  (Details) => async (dispatch, getState) => {
    try {
      const headertoken = getState().user.token;
      dispatch({ type: CHECK_APPOINTMENTS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${headertoken}`,
        },
      };

      const { data } = await axios.post(
        `${URLConstant}/user/appoints-available`,
        Details,
        config
      );

      dispatch({
        type: CHECK_APPOINTMENTS_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: CHECK_APPOINTMENTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TODO : all booking appointments list
export const UserAppointmentsAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: USER_APPOINTMENTS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(
      `${URLConstant}/user/myappointments`,
      config
    );

    dispatch({
      type: USER_APPOINTMENTS_SUCCESS,
      payload: data.appointments,
    });
  } catch (error) {
    dispatch({
      type: USER_APPOINTMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : For clear all User the errors
export const userClearErrorsAction = () => async (dispatch) => {
  dispatch({ type: USER_CLEAR_ERRORS });
};
