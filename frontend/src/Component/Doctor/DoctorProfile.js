import React, { useEffect, useState } from "react";
import "./StyleFolder/DoctorProfile.css";
import LayoutDesign from "../Layouts/MainLayout/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { ToastSuccess, ToastError } from "../AlertPops/Alertpop";
import Loader from "../Loader/Loader";
import {
  DoctorErrorsAction,
  DoctorProfileAction,
  UpdateDoctorProfileAction,
} from "../../Actions/DoctorAction";
import { UPDATE_DOCTOR_PROFILE_RESET } from "../../Constants/DoctorConstant";

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const { loading, doctor, error } = useSelector(
    (state) => state.DoctorProfile
  );
  const {
    loading: UpdateLoading,
    isUpdated,
    error: UpdateError,
  } = useSelector((state) => state.DoctorOperation);

  const [ApplyDetails, setApplyDetails] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feesPerCunsaltation: "",
  });
  const [DoctorTime, setDoctorTime] = useState({
    start: "00:00",
    end: "00:00",
  });

  const onChangeHandler = (event) => {
    setApplyDetails({
      ...ApplyDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeTimeHandler = (event) => {
    setDoctorTime({
      ...DoctorTime,
      [event.target.name]: event.target.value,
    });
  };

  const submitUpdateDoctorHandler = (event) => {
    event.preventDefault();
    const UpdateDoctorFormData = new FormData();
    UpdateDoctorFormData.append("firstname", ApplyDetails.firstname);
    UpdateDoctorFormData.append("lastname", ApplyDetails.lastname);
    UpdateDoctorFormData.append("phone", ApplyDetails.phone);
    UpdateDoctorFormData.append("email", ApplyDetails.email);
    UpdateDoctorFormData.append("website", ApplyDetails.website);
    UpdateDoctorFormData.append("address", ApplyDetails.address);
    UpdateDoctorFormData.append("specialization", ApplyDetails.specialization);
    UpdateDoctorFormData.append("experience", ApplyDetails.experience);
    UpdateDoctorFormData.append(
      "feesPerCunsaltation",
      ApplyDetails.feesPerCunsaltation
    );
    UpdateDoctorFormData.append("start", DoctorTime.start);
    UpdateDoctorFormData.append("end", DoctorTime.end);
    dispatch(UpdateDoctorProfileAction(UpdateDoctorFormData));
  };

  useEffect(() => {
    if (doctor) {
      setApplyDetails({
        firstname: doctor.firstname,
        lastname: doctor.lastname,
        phone: doctor.phone,
        email: doctor.email,
        website: doctor.website,
        address: doctor.address,
        specialization: doctor.specialization,
        experience: doctor.experience,
        feesPerCunsaltation: doctor.feesPerCunsaltation,
      });
      doctor.timings &&
        setDoctorTime({
          start: doctor.timings.start,
          end: doctor.timings.end,
        });
    }
    if (isUpdated) {
      ToastSuccess(isUpdated);
      dispatch(DoctorErrorsAction());
      dispatch({ type: UPDATE_DOCTOR_PROFILE_RESET });
      dispatch(DoctorProfileAction());
    }
    if (error) {
      ToastError(error);
      dispatch(DoctorErrorsAction());
    }
    if (UpdateError) {
      ToastError(UpdateError);
      dispatch(DoctorErrorsAction());
    }
  }, [dispatch, doctor, isUpdated, UpdateError, error]);

  useEffect(() => {
    dispatch(DoctorProfileAction());
  }, [dispatch]);

  return (
    <LayoutDesign>
      {loading || UpdateLoading ? (
        <Loader />
      ) : (
        <div className="ApplyDoctorWrapper">
          <header>
            <h1>Appy For Doctor</h1>
          </header>

          <div
            style={{ padding: document.innerWidth > "600px" ? "2rem" : "1rem" }}
          >
            <form
              className="applydcotorform"
              onSubmit={submitUpdateDoctorHandler}
            >
              <h2>- Personal Details -</h2>
              <div className="applyrows">
                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> First Name :
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your first  name"
                    variant="outlined"
                    size="small"
                    name="firstname"
                    value={ApplyDetails.firstname}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Second Name :
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your second name"
                    variant="outlined"
                    size="small"
                    name="lastname"
                    value={ApplyDetails.lastname}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Phone No :
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your phone number"
                    variant="outlined"
                    size="small"
                    type="number"
                    name="phone"
                    onChange={onChangeHandler}
                    value={ApplyDetails.phone}
                    required
                  />
                </div>

                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Email:
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your email address"
                    variant="outlined"
                    size="small"
                    type="email"
                    name="email"
                    value={ApplyDetails.email}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div>
                  <label>Website link :</label>
                  <TextField
                    id="outlined-basic"
                    label="your website link"
                    variant="outlined"
                    size="small"
                    name="website"
                    value={ApplyDetails.website}
                    onChange={onChangeHandler}
                  />
                </div>

                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Address:
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your clinic address"
                    variant="outlined"
                    size="small"
                    name="address"
                    value={ApplyDetails.address}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>

              <br />
              <h2>- Professional Details -</h2>
              <div className="applyrows">
                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Specialization :
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your specialization"
                    variant="outlined"
                    size="small"
                    name="specialization"
                    value={ApplyDetails.specialization}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Experience :
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your experience"
                    variant="outlined"
                    size="small"
                    type="number"
                    name="experience"
                    value={ApplyDetails.experience}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div>
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Fees per
                    Cunsalation:
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="your fees amount"
                    variant="outlined"
                    size="small"
                    type="number"
                    name="feesPerCunsaltation"
                    value={ApplyDetails.feesPerCunsaltation}
                    onChange={onChangeHandler}
                    required
                  />
                </div>

                <div className="timepicker">
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> Start Shift Time:
                  </label>
                  <input
                    type="time"
                    name="start"
                    value={DoctorTime.start}
                    onChange={onChangeTimeHandler}
                    required
                  />
                </div>

                <div className="timepicker">
                  <label>
                    {" "}
                    <span className="requiredstar">*</span> End Shift Time:
                  </label>
                  <input
                    type="time"
                    name="end"
                    value={DoctorTime.end}
                    onChange={onChangeTimeHandler}
                    required
                  />
                </div>
              </div>
              <br />

              <div className="submitapply">
                <Button variant="contained" color="success" type="submit">
                  Upadte Your Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LayoutDesign>
  );
};

export default DoctorProfile;
