import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorsProfile = (props) => {
  const { profileData } = props;
  const navigate = useNavigate();
  return (
    <div className="doctorsProfile">
      <div className="doctorHeading">
        Dr.{profileData.firstname + " " + profileData.lastname}
      </div>
      <div className="details">
        <div>
          <b>Specialization</b> : {profileData.specialization}
        </div>

        <div>
          <b>Experience</b> : {profileData.experience}
        </div>

        <div>
          <b>Fees Per Cunsaltation</b> : {profileData.feesPerCunsaltation}
        </div>

        <div>
          <b>Timings</b> :{" "}
          {profileData.timings.start + " : " + profileData.timings.end}
        </div>

        <div style={{ margin: " 10px auto" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/bookingappointment/${profileData._id}`)}
          >
            Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfile;
