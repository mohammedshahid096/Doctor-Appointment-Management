import URLConstant from "../Constants/URLConstant";
import axios from "axios";

import {
  DOCTOR_APPOINTMENTS_FAIL,
  DOCTOR_APPOINTMENTS_REQUEST,
  DOCTOR_APPOINTMENTS_SUCCESS,
  DOCTOR_CLEAR_ERRORS,
  DOCTOR_PROFILE_FAIL,
  DOCTOR_PROFILE_REQUEST,
  DOCTOR_PROFILE_SUCCESS,
  UPDATE_APPOINTMENT_STATUS_FAIL,
  UPDATE_APPOINTMENT_STATUS_REQUEST,
  UPDATE_APPOINTMENT_STATUS_SUCCESS,
  UPDATE_DOCTOR_PROFILE_FAIL,
  UPDATE_DOCTOR_PROFILE_REQUEST,
  UPDATE_DOCTOR_PROFILE_SUCCESS,
} from "../Constants/DoctorConstant";

// TODO : getting details of the doctor action
export const DoctorProfileAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: DOCTOR_PROFILE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(`${URLConstant}/doctor/me`, config);

    dispatch({
      type: DOCTOR_PROFILE_SUCCESS,
      payload: data.doctor,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : updating the doctor profile Action
export const UpdateDoctorProfileAction =
  (Details) => async (dispatch, getState) => {
    try {
      const headertoken = getState().user.token;
      dispatch({ type: UPDATE_DOCTOR_PROFILE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${headertoken}`,
        },
      };

      const { data } = await axios.put(
        `${URLConstant}/doctor/me`,
        Details,
        config
      );

      dispatch({
        type: UPDATE_DOCTOR_PROFILE_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DOCTOR_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TODO : all booking appointments list
export const DoctorAppointmentsAction = () => async (dispatch, getState) => {
  try {
    const headertoken = getState().user.token;
    dispatch({ type: DOCTOR_APPOINTMENTS_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${headertoken}`,
      },
    };

    const { data } = await axios.get(
      `${URLConstant}/doctor/appointments`,
      config
    );

    dispatch({
      type: DOCTOR_APPOINTMENTS_SUCCESS,
      payload: data.appointments,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_APPOINTMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// TODO : updating the doctor profile Action
export const UpdateAppointmentAction =
  (id, Details) => async (dispatch, getState) => {
    try {
      const headertoken = getState().user.token;
      dispatch({ type: UPDATE_APPOINTMENT_STATUS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${headertoken}`,
        },
      };

      const { data } = await axios.put(
        `${URLConstant}/doctor/appointments/${id}`,
        Details,
        config
      );

      dispatch({
        type: UPDATE_APPOINTMENT_STATUS_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_APPOINTMENT_STATUS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TODO : for clearing all the Doctor related errors
export const DoctorErrorsAction = () => async (dispatch) => {
  dispatch({ type: DOCTOR_CLEAR_ERRORS });
};
