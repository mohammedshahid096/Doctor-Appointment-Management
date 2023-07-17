import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Loader/Loader";
import LayoutDesign from "../Layouts/MainLayout/Layout";
import "./StylesFolder/AllUsers.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToastError } from "../AlertPops/Alertpop";
import {
  AdminClearErrorAction,
  AllUserAdminAction,
} from "../../Actions/AdminAction";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.AdminsLists);

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
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "doctor",
      headerName: "Doctor",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.isDoctor === true ? "YES" : "No";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: () => {
        return (
          <>
            <Link to={`/admin/users`}>
              <FaEdit />
            </Link>

            <Button>
              <FaTrashAlt />
            </Button>

            <Button variant="contained" color="error">
              Block
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        doctor: item.isDoctor,
        email: item.email,
        name: item.name,
      });
    });

  if (error) {
    ToastError(error);
    dispatch(AdminClearErrorAction());
  }
  useEffect(() => {
    dispatch(AllUserAdminAction());
  }, [dispatch]);
  return (
    <LayoutDesign>
      <div className="UsersListWrapper">
        <h1>All Users</h1>
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

export default AllUsers;
