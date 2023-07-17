import {
  ADMIN_CLEAR_ERRORS,
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_DOCTORS_FAIL,
  ALL_DOCTORS_REQUEST,
  ALL_DOCTORS_SUCCESS,
  CHANGE_DOCTOR_ACCOUNT_STATUS_REQUEST,
  CHANGE_DOCTOR_ACCOUNT_STATUS_SUCCESS,
  CHANGE_DOCTOR_ACCOUNT_STATUS_FAIL,
  CHANGE_DOCTOR_ACCOUNT_STATUS_RESET,
} from "../Constants/AdminConstant";

// TODO : Lists of doctors and users
export const AllListsReducers = (
  state = { users: [], doctors: [] },
  action
) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
    case ALL_DOCTORS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: action.payload,
      };
    case ALL_USERS_FAIL:
    case ALL_DOCTORS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// TODO : any type of operation like status changed
export const AdminOperationsReducers = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_DOCTOR_ACCOUNT_STATUS_REQUEST:
      return {
        loading: true,
      };
    case CHANGE_DOCTOR_ACCOUNT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isStatusChange: action.payload,
      };
    case CHANGE_DOCTOR_ACCOUNT_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CHANGE_DOCTOR_ACCOUNT_STATUS_RESET:
      return {
        ...state,
        isStatusChange: null,
      };
    case ADMIN_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
