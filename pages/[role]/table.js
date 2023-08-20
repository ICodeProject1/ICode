import React, { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import SideNav from "../../components/SideNav";
import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { motion } from "framer-motion";

const upVariant = {
  hide: {
    opacity: 0,
    y: 100,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
};

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = async () => {
    const res = await fetch("/api/table", {
      method: "POST",
    });
    const newRow = await res.json();
    setRows((oldRows) => [
      ...oldRows,
      {
        ...newRow,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow._id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon className="add-icon" />}
        onClick={handleClick}
      >
        Add User
      </Button>
    </GridToolbarContainer>
  );
}

const Table = ({ role }) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch("/api/table");
      const data = await res.json();
      if (res.ok) {
        setRows(data);
        const names = data
          .map((el) => el.name)
          .filter((el, i, arr) => (i === arr.lastIndexOf(el) ? true : false));
        setTotalRows(
          names.map((name) => {
            let user;
            user = data.find((el) => el.name === name && el.session === 1);
            const sessionOne = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 2);
            const sessionTwo = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 3);
            const sessionThree = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 4);
            const sessionFour = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 5);
            const sessionFive = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 6);
            const sessionSix = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 7);
            const sessionSeven = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 8);
            const sessionEight = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 9);
            const sessionNine = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 10);
            const sessionTen = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 11);
            const sessionEleven = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;

            user = data.find((el) => el.name === name && el.session === 12);
            const sessionTwelve = user
              ? user.starting +
                user.attendance +
                user.bonus +
                user.tasks +
                user.attitude
              : 0;
            return {
              name,
              _id: data.find((el) => el.name === name)._id,
              role: data.find((el) => el.name === name).role,
              "session-1": sessionOne,
              "session-2": sessionTwo,
              "session-3": sessionThree,
              "session-4": sessionFour,
              "session-5": sessionFive,
              "session-6": sessionSix,
              "session-7": sessionSeven,
              "session-8": sessionEight,
              "session-9": sessionNine,
              "session-10": sessionTen,
              "session-11": sessionEleven,
              "session-12": sessionTwelve,
            };
          })
        );
      } else {
        console.log(res);
      }
      setLoading(false);
    };
    getData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/table/${id}`, { method: "DELETE" })
          .then(() =>
            Swal.fire("Deleted!", "User has been deleted.", "success")
          )
          .catch((error) => console.log(error));
        setRows(rows.filter((row) => row._id !== id));
      }
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.newTable) {
      setRows(rows.filter((row) => row._id !== id));
      fetch(`/api/table/${id}`, { method: "DELETE" })
        .then((res) => console.log(res.json))
        .catch((error) => console.log(error));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, newTable: false };
    console.log(newRow);
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    setTotalRows(
      totalRows.map((el) =>
        el.name === newRow.name
          ? {
              ...el,
              [`session-${newRow.session}`]:
                newRow.starting +
                newRow.attendance +
                newRow.bonus +
                newRow.tasks +
                newRow.attitude,
            }
          : el
      )
    );
    const res = await fetch(`/api/table/${newRow._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newRow,
        newTable: false,
      }),
    });
    if (res.ok) {
      console.log("added");
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "starting",
      headerName: "Starting Points",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "attendance",
      headerName: "Attendance",
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "bonus",
      headerName: "Bonus Points",
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "tasks",
      headerName: "Tasks",
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "attitude",
      headerName: "Commitment and Attitude",
      type: "number",
      width: 250,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 150,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        return (
          +params.row.starting +
          +params.row.final +
          +params.row.tasks +
          +params.row.attendance +
          +params.row.attitude +
          +params.row.bonus
        );
      },
    },
    {
      field: "session",
      headerName: "Session",
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      editable: true,
      type: "singleSelect",
      headerAlign: "left",
      valueOptions: ["hr", "pr", "oc", "cb", "mm", "tech"],
      valueFormatter: (params) => {
        return params.value.toUpperCase();
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon className="action-icon" />}
              label="Save"
              color="#000"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon className="action-icon" />}
              label="Cancel"
              className="text-red-600"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const secondColumns = [
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: ["hr", "pr", "oc", "cb", "mm", "tech"],
      width: 150,
      align: "left",
      headerAlign: "left",
      valueFormatter: (params) => {
        return params.value.toUpperCase();
      },
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      width: 150,
      headerAlign: "left",
      align: "left",
      valueGetter: (params) => {
        return (
          +params.row["session-1"] +
          +params.row["session-2"] +
          +params.row["session-3"] +
          +params.row["session-4"] +
          +params.row["session-5"] +
          +params.row["session-6"] +
          +params.row["session-7"] +
          +params.row["session-8"] +
          +params.row["session-9"] +
          +params.row["session-10"] +
          +params.row["session-11"] +
          +params.row["session-12"]
        );
      },
    },

    {
      field: "session-1",
      headerName: "Session 1",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-2",
      headerName: "Session 2",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-3",
      headerName: "Session 3",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-4",
      headerName: "Session 4",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-5",
      headerName: "Session 5",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-6",
      headerName: "Session 6",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-7",
      headerName: "Session 7",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-8",
      headerName: "Session 8",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-9",
      headerName: "Session 9",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-10",
      headerName: "Session 10",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-11",
      headerName: "Session 11",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "session-12",
      headerName: "Session 12",
      type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
    },
  ];

  return (
    <main className="flex flex-col md:flex-row min-h-screen third-bg">
      <div className="items-stretch">
        <SideNav role={role} />
      </div>
      <div className="flex-1 py-20 px-10 max-w-full">
        <h1 className="text-center text-5xl">All The Users Points</h1>
        <motion.div
          variants={upVariant}
          initial="hide"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full h-[600px] md:h-1/2 grid grid-cols-1 mt-10 md:mt-4"
        >
          {loading ? (
            <h2 className="text-center text-2xl mt-10">Loading...</h2>
          ) : (
            <DataGrid
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              hideFooter={true}
              sx={{
                backgroundColor: "#101418",
                color: "white",
                fontSize: 18,
                overflowX: "auto",
              }}
              slots={{
                toolbar: EditToolbar,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
            />
          )}
        </motion.div>
        <motion.div
          variants={upVariant}
          initial="hide"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full h-[600px] md:h-1/2 grid grid-cols-1 mt-10 md:my-4"
        >
          {loading ? (
            <h2 className="text-center text-2xl mt-10">Loading...</h2>
          ) : (
            <DataGrid
              getRowId={(row) => row._id}
              rows={totalRows}
              columns={secondColumns}
              hideFooter={true}
              sx={{
                backgroundColor: "#101418",
                color: "white",
                fontSize: 18,
                overflowX: "auto",
              }}
            />
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default Table;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const role = context.params.role;
  const roles = [
    "admin",
    "adminhr",
    "adminpr",
    "adminoc",
    "admincb",
    "adminmm",
    "admintech",
    "hr",
    "pr",
    "oc",
    "cb",
    "mm",
    "tech",
  ];

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?error=You are not authenticated`,
        permanent: false,
      },
    };
  }

  if (!roles.includes(role)) {
    return {
      notFound: true,
    };
  }

  if (session.user.role !== "admin" && session.user.role !== "adminhr") {
    return {
      redirect: {
        destination: `/auth/login?error=You are not authorized`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      // to secure data rendered
      role,
    },
  };
}
