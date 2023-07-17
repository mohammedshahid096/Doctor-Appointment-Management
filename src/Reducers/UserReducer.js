import {
  DOCTOR_APPOINTMENTS_FAIL,
  DOCTOR_APPOINTMENTS_REQUEST,
  DOCTOR_APPOINTMENTS_SUCCESS,
} from "../Constants/DoctorConstant";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  APPLY_DOCTOR_REQUEST,
  APPLY_DOCTOR_SUCCESS,
  APPLY_DOCTOR_FAIL,
  USER_CLEAR_ERRORS,
  APPLY_DOCTOR_RESET,
  CHANGE_UNREAD_NOTI_REQUEST,
  CHANGE_UNREAD_NOTI_SUCCESS,
  CHANGE_UNREAD_NOTI_FAIL,
  CHANGE_UNREAD_NOTI_RESET,
  REFRESH_USER_REQUEST,
  REFRESH_USER_SUCCESS,
  REFRESH_USER_FAIL,
  DELETE_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_RESET,
  ALL_APPROVED_DR_REQUEST,
  ALL_APPROVED_DR_SUCCESS,
  ALL_APPROVED_DR_FAIL,
  SINGLE_DOCTOR_DETAIL_REQUEST,
  SINGLE_DOCTOR_DETAIL_SUCCESS,
  SINGLE_DOCTOR_DETAIL_FAIL,
  BOOK_APPOINTMENT_SUCCESS,
  BOOK_APPOINTMENT_REQUEST,
  BOOK_APPOINTMENT_FAIL,
  BOOK_APPOINTMENT_RESET,
  CHECK_APPOINTMENTS_REQUEST,
  CHECK_APPOINTMENTS_SUCCESS,
  CHECK_APPOINTMENTS_FAIL,
  CHECK_APPOINTMENTS_RESET,
  CHECK_APPOINTMENTS_CLEAR,
  USER_APPOINTMENTS_REQUEST,
  USER_APPOINTMENTS_SUCCESS,
  USER_APPOINTMENTS_FAIL,
} from "../Constants/UserConstants";

// TODO : in this reducer user details & token details will be present
export const UserReducer = (state = { user: {}, token: null }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case REFRESH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
      };
    // ! -----------success cases------------
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOAD_USER_SUCCESS:
    case REFRESH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    // ! ------- Fail or Error cases -----------
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
    case REFRESH_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO : in this reducer all the approved doctors lists and single doctorDetails
export const ApprovedDoctorsReducer = (
  state = { doctors: [], doctorDetail: {} },
  action
) => {
  switch (action.type) {
    case ALL_APPROVED_DR_REQUEST:
    case SINGLE_DOCTOR_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ALL_APPROVED_DR_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: action.payload,
      };
    case SINGLE_DOCTOR_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        doctorDetail: action.payload,
      };
    case ALL_APPROVED_DR_FAIL:
    case SINGLE_DOCTOR_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO : if the user apply for a doctor post
export const ApplyDoctorReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_DOCTOR_REQUEST:
      return {
        loading: true,
      };
    case APPLY_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isApplied: action.payload,
      };
    case APPLY_DOCTOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case APPLY_DOCTOR_RESET:
      return {
        loading: false,
        isApplied: null,
      };
    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO : this reducer is for deleting the unread notifications and then deleting the reading notificatons
export const NotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_UNREAD_NOTI_REQUEST:
    case DELETE_NOTIFICATION_REQUEST:
      return {
        loading: true,
      };
    case CHANGE_UNREAD_NOTI_SUCCESS:
      return {
        ...state,
        loading: false,
        isReaded: action.payload,
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case CHANGE_UNREAD_NOTI_FAIL:
    case DELETE_NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHANGE_UNREAD_NOTI_RESET:
      return {
        ...state,
        loading: false,
        isReaded: null,
      };
    case DELETE_NOTIFICATION_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: null,
      };
    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO : this reducer consists of booking appointment and Checking Available bookings
export const BookAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_APPOINTMENT_REQUEST:
      return {
        loading: true,
      };
    case CHECK_APPOINTMENTS_REQUEST:
      return {
        progress: true,
      };
    case CHECK_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        progress: false,
        isAvailable: action.payload,
        isBooking: true,
      };
    case BOOK_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: action.payload,
        isBooking: false,
      };
    case CHECK_APPOINTMENTS_FAIL:
      return {
        ...state,
        progress: false,
        error: action.payload,
        isBooking: false,
      };
    case BOOK_APPOINTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHECK_APPOINTMENTS_RESET:
      return {
        ...state,
        isAvailable: null,
      };
    case BOOK_APPOINTMENT_RESET:
      return {
        ...state,
        isSuccess: null,
      };
    case CHECK_APPOINTMENTS_CLEAR:
      return {
        ...state,
        isBooking: false,
      };
    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO : this reducer consists of All the user appointments
export const UserAppointmentsReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case USER_APPOINTMENTS_REQUEST:
    case DOCTOR_APPOINTMENTS_REQUEST:
      return {
        loading: true,
      };
    case USER_APPOINTMENTS_SUCCESS:
    case DOCTOR_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
      };
    case USER_APPOINTMENTS_FAIL:
    case DOCTOR_APPOINTMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
