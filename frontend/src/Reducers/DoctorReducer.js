import {
  DOCTOR_CLEAR_ERRORS,
  DOCTOR_PROFILE_FAIL,
  DOCTOR_PROFILE_REQUEST,
  DOCTOR_PROFILE_SUCCESS,
  UPDATE_APPOINTMENT_STATUS_FAIL,
  UPDATE_APPOINTMENT_STATUS_REQUEST,
  UPDATE_APPOINTMENT_STATUS_RESET,
  UPDATE_APPOINTMENT_STATUS_SUCCESS,
  UPDATE_DOCTOR_PROFILE_FAIL,
  UPDATE_DOCTOR_PROFILE_REQUEST,
  UPDATE_DOCTOR_PROFILE_RESET,
  UPDATE_DOCTOR_PROFILE_SUCCESS,
} from "../Constants/DoctorConstant";

// TODO : doctor profile reducer
export const DoctorProfieReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case DOCTOR_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        doctor: action.payload,
      };
    case DOCTOR_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DOCTOR_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO : doctor operations reducer
export const DoctorOperationsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DOCTOR_PROFILE_REQUEST:
    case UPDATE_APPOINTMENT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_DOCTOR_PROFILE_SUCCESS:
    case UPDATE_APPOINTMENT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_DOCTOR_PROFILE_FAIL:
    case UPDATE_APPOINTMENT_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_DOCTOR_PROFILE_RESET:
    case UPDATE_APPOINTMENT_STATUS_RESET:
      return {
        ...state,
        isUpdated: null,
      };
    case DOCTOR_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
