import React, { useEffect, useState } from "react";
import LayoutDesign from "../MainLayout/Layout";
import Loader from "../../Loader/Loader";
import "./Booking.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BookAppointmentAction,
  CheckAppointmentsAction,
  SingledDoctorAction,
  userClearErrorsAction,
} from "../../../Actions/UserAction";
import { FaUserDoctor } from "react-icons/fa6";
import { ToastError, ToastSuccess } from "../../AlertPops/Alertpop";
import {
  BOOK_APPOINTMENT_RESET,
  CHECK_APPOINTMENTS_RESET,
  CHECK_APPOINTMENTS_CLEAR,
} from "../../../Constants/UserConstants";
import moment from "moment";
import "moment-timezone";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

const Booking = () => {
  const { doctorID } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    doctorDetail,
    error: DrError,
  } = useSelector((state) => state.HomeDoctors);
  const {
    loading: BookingLoading,
    isSuccess,
    isAvailable,
    isBooking,
    error,
    progress,
  } = useSelector((state) => state.BookAppoinment);
  const { user } = useSelector((state) => state.user);

  const [AppointmentDate, setAppointmentDate] = useState("");
  const [temp, settemp] = useState(moment().format("YYYYMMDD"));
  const [AppointmentTime, setAppointmentTime] = useState(
    moment().add(1, "hour").format("HH") + ":00"
  );

  const DatePickerHandler = (v) => {
    dispatch({ type: CHECK_APPOINTMENTS_CLEAR });
    let z = moment(v).format("L");
    setAppointmentDate(z);
    let newArray = z.split("/");
    settemp(`${newArray[2]}-${newArray[0]}-${newArray[1]}`);
  };
  const onChechAvailableHandler = () => {
    const CheckApointmentsFormData = new FormData();
    CheckApointmentsFormData.append("doctorId", doctorID);
    CheckApointmentsFormData.append("date", temp);
    CheckApointmentsFormData.append("time", AppointmentTime);

    dispatch(CheckAppointmentsAction(CheckApointmentsFormData));
  };

  const BookingHandler = () => {
    const BookingFormData = new FormData();
    BookingFormData.append("doctorId", doctorID);
    BookingFormData.append("name", user.name);
    BookingFormData.append("date", AppointmentDate);
    BookingFormData.append("time", AppointmentTime);
    console.log(AppointmentDate);

    dispatch(BookAppointmentAction(BookingFormData));
  };

  useEffect(() => {
    dispatch(SingledDoctorAction(doctorID));
  }, [dispatch, doctorID]);

  useEffect(() => {
    if (isSuccess) {
      ToastSuccess(isSuccess);
      dispatch({ type: BOOK_APPOINTMENT_RESET });
    }
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
    if (DrError) {
      ToastError(DrError);
      dispatch(userClearErrorsAction());
    }
    if (isAvailable) {
      ToastSuccess(isAvailable);
      dispatch({ type: CHECK_APPOINTMENTS_RESET });
    }
  }, [dispatch, isSuccess, error, DrError, isAvailable]);
  return (
    <>
      {loading || BookingLoading ? (
        <Loader />
      ) : (
        <LayoutDesign>
          <div className="bookingWrapper">
            <div className="divisions">
              <div className="AppointmentDiv">
                <header>
                  <h1>Booking Appointment</h1>
                </header>

                <div
                  style={{
                    display: "grid",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={dayjs(temp)}
                      onChange={(value) => DatePickerHandler(value.$d)}
                    />

                    <input
                      type="time"
                      step={3600}
                      value={AppointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                    />
                  </LocalizationProvider>

                  <br />
                  {progress ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={onChechAvailableHandler}
                    >
                      Check Availability
                    </Button>
                  )}
                  {isBooking && (
                    <>
                      <br />
                      <Button
                        variant="contained"
                        color="success"
                        onClick={BookingHandler}
                      >
                        Book Appointment
                      </Button>
                    </>
                  )}
                  <br />
                </div>
              </div>
              {/* ----Doctor Details */}
              {doctorDetail && (
                <div className="DoctorDetailsDiv">
                  <header>
                    <h1>Doctor Details</h1>
                  </header>
                  <div className="details">
                    <div className="imageIcon">
                      <FaUserDoctor />
                    </div>

                    <div>
                      <b>Name</b> : Dr.
                      {doctorDetail.firstname + " " + doctorDetail.lastname}
                    </div>

                    <div>
                      <b>Phone</b> : {doctorDetail.phone}
                    </div>

                    <div>
                      <b>Email</b> : {doctorDetail.email}
                    </div>

                    <div>
                      <b>Website</b> : {doctorDetail.website}
                    </div>

                    <div>
                      <b>Specialization</b> : {doctorDetail.specialization}
                    </div>

                    <div>
                      <b>Experience</b> : {doctorDetail.experience}
                    </div>

                    <div>
                      <b>Fees Per Cunsaltation</b> :{" "}
                      {doctorDetail.feesPerCunsaltation}
                    </div>

                    <div>
                      <b>Timings</b> :{" "}
                      {doctorDetail.timings.start +
                        " : " +
                        doctorDetail.timings.end}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </LayoutDesign>
      )}
    </>
  );
};

export default Booking;
