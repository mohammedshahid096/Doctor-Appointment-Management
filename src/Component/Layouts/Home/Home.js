import React, { useEffect } from "react";
import "./Home.css";
import LayoutDesign from "../MainLayout/Layout";
import Loader from "../../Loader/Loader";
import DoctorsProfile from "./DoctorsProfile";
import { useDispatch, useSelector } from "react-redux";
import { AllAprovedDoctorsAction } from "../../../Actions/UserAction";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, doctors } = useSelector((state) => state.HomeDoctors);

  useEffect(() => {
    dispatch(AllAprovedDoctorsAction());
  }, [dispatch]);

  return (
    <LayoutDesign>
      {loading ? (
        <Loader />
      ) : (
        <div className="HomeDocotor">
          <header>
            <h1>Doctors List</h1>
          </header>
          <section>
            {doctors &&
              doctors.map((item, index) => (
                <DoctorsProfile profileData={item} key={index} />
              ))}
          </section>
        </div>
      )}
    </LayoutDesign>
  );
};

export default Home;
