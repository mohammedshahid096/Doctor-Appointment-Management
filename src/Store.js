import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ApplyDoctorReducer,
  ApprovedDoctorsReducer,
  BookAppointmentReducer,
  NotificationReducer,
  UserAppointmentsReducer,
  UserReducer,
} from "./Reducers/UserReducer";
import GetCookie from "./Routes/GetCookie";
import {
  AdminOperationsReducers,
  AllListsReducers,
} from "./Reducers/AdminReducer";
import {
  DoctorOperationsReducer,
  DoctorProfieReducer,
} from "./Reducers/DoctorReducer";

const Reducer = combineReducers({
  user: UserReducer,
  ApplyDoctor: ApplyDoctorReducer,
  Notification: NotificationReducer,
  AdminsLists: AllListsReducers,
  AdminOperations: AdminOperationsReducers,
  DoctorProfile: DoctorProfieReducer,
  DoctorOperation: DoctorOperationsReducer,
  HomeDoctors: ApprovedDoctorsReducer,
  BookAppoinment: BookAppointmentReducer,
  Appointments: UserAppointmentsReducer,
});

const initialState = {
  user: {
    token: GetCookie() ? GetCookie() : null,
  },
};

const middleware = [thunk];

const Store = createStore(
  Reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
