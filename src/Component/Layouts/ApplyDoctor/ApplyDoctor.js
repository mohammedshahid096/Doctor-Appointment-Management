import React, { useEffect, useState } from "react";
import "./ApplyDoctor.css";
import LayoutDesign from "../MainLayout/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "../../AlertPops/Alertpop";
import {
  applyDoctorAction,
  userClearErrorsAction,
} from "../../../Actions/UserAction";
import { APPLY_DOCTOR_RESET } from "../../../Constants/UserConstants";
import Loader from "../../Loader/Loader";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const { loading, error, isApplied } = useSelector(
    (state) => state.ApplyDoctor
  );

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
    start: "",
    end: "",
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
  const submitApplyDoctorHandler = (event) => {
    event.preventDefault();
    const ApplyDoctorFormData = new FormData();
    ApplyDoctorFormData.append("firstname", ApplyDetails.firstname);
    ApplyDoctorFormData.append("lastname", ApplyDetails.lastname);
    ApplyDoctorFormData.append("phone", ApplyDetails.phone);
    ApplyDoctorFormData.append("email", ApplyDetails.email);
    ApplyDoctorFormData.append("website", ApplyDetails.website);
    ApplyDoctorFormData.append("address", ApplyDetails.address);
    ApplyDoctorFormData.append("specialization", ApplyDetails.specialization);
    ApplyDoctorFormData.append("experience", ApplyDetails.experience);
    ApplyDoctorFormData.append(
      "feesPerCunsaltation",
      ApplyDetails.feesPerCunsaltation
    );
    ApplyDoctorFormData.append("start", DoctorTime.start);
    ApplyDoctorFormData.append("end", DoctorTime.end);

    dispatch(applyDoctorAction(ApplyDoctorFormData));
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      dispatch(userClearErrorsAction());
    }
    if (isApplied) {
      ToastSuccess(isApplied);
      dispatch({ type: APPLY_DOCTOR_RESET });
    }
  }, [dispatch, error, isApplied]);
  return (
    <LayoutDesign>
      {loading ? (
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
              onSubmit={submitApplyDoctorHandler}
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
                  Apply for Doctor
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </LayoutDesign>
  );
};

export default ApplyDoctor;
