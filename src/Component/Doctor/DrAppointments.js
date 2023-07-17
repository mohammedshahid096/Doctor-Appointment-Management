import React, { useEffect } from "react";
import LayoutDesign from "../Layouts/MainLayout/Layout";
import Loader from "../Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  DoctorAppointmentsAction,
  DoctorErrorsAction,
  UpdateAppointmentAction,
} from "../../Actions/DoctorAction";
import { Button } from "@mui/material";
import { ToastError, ToastSuccess } from "../AlertPops/Alertpop";
import { UPDATE_APPOINTMENT_STATUS_RESET } from "../../Constants/DoctorConstant";

const DrAppointments = () => {
  const dispatch = useDispatch();
  const { loading, appointments } = useSelector((state) => state.Appointments);
  const {
    loading: OperationLoading,
    isUpdated,
    error,
  } = useSelector((state) => state.DoctorOperation);

  const SubmitStatusHandler = (id, v) => {
    dispatch(UpdateAppointmentAction(id, { status: v }));
  };
  const columns = [
    { field: "index", headerName: "S.no", minWidth: 10, flex: 0.2 },

    { field: "id", headerName: "Appointment ID", minWidth: 90, flex: 0.5 },

    {
      field: "patientname",
      headerName: "Patient Name",
      minWidth: 100,
      flex: 0.3,
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
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 170,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "pending" ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => SubmitStatusHandler(params.id, "approved")}
                >
                  Approve
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => SubmitStatusHandler(params.id, "pending")}
                >
                  Reject
                </Button>
              </>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  const rows = [];

  appointments &&
    appointments.forEach((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        patientname: item.userName,
        date: moment(item.date).format("DD-MM-YYYY"),
        time: moment(item.time).format("HH:mm"),
        status: item.status,
      });
    });

  useEffect(() => {
    dispatch(DoctorAppointmentsAction());
  }, [dispatch]);

  useEffect(() => {
    if (isUpdated) {
      ToastSuccess(isUpdated);
      dispatch({ type: UPDATE_APPOINTMENT_STATUS_RESET });
      dispatch(DoctorAppointmentsAction());
    }
    if (error) {
      ToastError(error);
      dispatch(DoctorErrorsAction());
    }
  }, [dispatch, isUpdated, error]);

  return (
    <LayoutDesign>
      <div className="appointmentsList">
        <header>
          <h1>Appointments List</h1>
        </header>
        <div>
          {loading || OperationLoading ? (
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

export default DrAppointments;
