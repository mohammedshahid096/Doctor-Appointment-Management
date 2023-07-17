import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Loader/Loader";
import LayoutDesign from "../Layouts/MainLayout/Layout";
import "./StylesFolder/AllUsers.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "../AlertPops/Alertpop";
import {
  AdminClearErrorAction,
  AllDoctorAdminAction,
  ChangeDoctorStatusAction,
} from "../../Actions/AdminAction";
import { CHANGE_DOCTOR_ACCOUNT_STATUS_RESET } from "../../Constants/AdminConstant";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const { loading, error, doctors } = useSelector((state) => state.AdminsLists);
  const {
    loading: OperationLoading,
    error: OperationError,
    isStatusChange,
  } = useSelector((state) => state.AdminOperations);

  const ApprovedSubmitHanlder = (doctorID, Status) => {
    dispatch(ChangeDoctorStatusAction(doctorID, Status));
  };

  const columns = [
    { field: "index", headerName: "S.no", minWidth: 10, flex: 0.2 },

    { field: "id", headerName: "User ID", minWidth: 90, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 70,
      flex: 0.4,
    },

    {
      field: "phone",
      headerName: "Phone",
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
      flex: 0.4,
      headerName: "Actions",
      minWidth: 170,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/doctors`}>
              <FaEdit />
            </Link>

            <Button>
              <FaTrashAlt />
            </Button>
            {params.row.status === "pending" ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => ApprovedSubmitHanlder(params.id, "approved")}
              >
                Approve
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={() => ApprovedSubmitHanlder(params.id, "pending")}
              >
                Reject
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const rows = [];

  doctors &&
    doctors.forEach((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        email: item.email,
        name: item.firstname + " " + item.lastname,
        phone: item.phone,
        status: item.status,
      });
    });

  if (error) {
    ToastError(error);
    dispatch(AdminClearErrorAction());
  }

  useEffect(() => {
    if (OperationError) {
      ToastError(OperationError);
      dispatch(AdminClearErrorAction());
    }
    if (isStatusChange) {
      ToastSuccess(isStatusChange);
      dispatch({ type: CHANGE_DOCTOR_ACCOUNT_STATUS_RESET });
    }
    dispatch(AllDoctorAdminAction());
  }, [dispatch, OperationError, isStatusChange]);

  return (
    <LayoutDesign>
      <div className="UsersListWrapper">
        <h1>All Doctors</h1>
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

export default AllDoctors;
