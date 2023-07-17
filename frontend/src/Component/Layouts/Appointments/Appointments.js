import React, { useEffect } from "react";
import LayoutDesign from "../MainLayout/Layout";
import Loader from "../../Loader/Loader";
import "./Appointments.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { UserAppointmentsAction } from "../../../Actions/UserAction";
import moment from "moment";

const Appointments = () => {
  const dispatch = useDispatch();
  const { loading, appointments } = useSelector((state) => state.Appointments);
  const columns = [
    { field: "index", headerName: "S.no", minWidth: 10, flex: 0.2 },

    { field: "id", headerName: "Appointment ID", minWidth: 90, flex: 0.5 },

    {
      field: "doctor",
      headerName: "Doctor Name",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 70,
      flex: 0.4,
    },

    {
      field: "time",
      headerName: "Time",
      minWidth: 70,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 70,
      flex: 0.2,
      renderCell: (params) => {
        let s = params.row.status === "pending" ? "reject" : "approved";
        return <div className={s}>{params.row.status}</div>;
      },
    },
  ];

  const rows = [];

  appointments &&
    appointments.forEach((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        doctor: item.doctorName,
        date: moment(item.date).format("DD-MM-YYYY"),
        time: moment(item.time).format("HH:mm"),
        status: item.status,
      });
    });

  useEffect(() => {
    dispatch(UserAppointmentsAction());
  }, [dispatch]);

  return (
    <LayoutDesign>
      <div className="appointmentsList">
        <header>
          <h1>Appointments List</h1>
        </header>
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="ListTable"
                autoHeight
              />
            </div>
          )}
        </div>
      </div>
    </LayoutDesign>
  );
};

export default Appointments;
