import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  DialogActions,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import {
  loadPassengers,
  savePassenger,
} from "../redux/actions/passengerAction";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import PropTypes from "prop-types";

function ManagePassengerPage() {
  const { flightId } = useParams();
  const passengersList = useSelector((state) => state.passengers);

  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 40,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
      },
      {
        accessorKey: "seatNo",
        header: "Seat No.",
        enableEditing: false,
        size: 40,
      },
      {
        accessorKey: "ancillaryServices",
        header: "Ancillary Services",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "passport",
        header: "Passport",
        size: 80,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 80,
      },
      {
        accessorKey: "dob",
        header: "DOB",
        enableEditing: false,
        size: 90,
        Cell: ({ cell }) =>
          `${
            cell.getValue() !== ""
              ? new Date(cell.getValue()).toLocaleDateString()
              : ""
          }`,
      },
    ],
    []
  );

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    dispatch(savePassenger(values));
    exitEditingMode();
  };

  useEffect(() => {
    dispatch(
      loadPassengers({ mandarotyFileds: false, flight: flightId })
    ).catch(() => {});
  }, [dispatch, flightId]);

  const handleCreateNewPassenger = (values) => {
    dispatch(savePassenger(values));
  };

  const showData = () => {
    if (passengersList.length !== 0) {
      return (
        <>
          <MaterialReactTable
            columns={columns}
            data={passengersList}
            initialState={{ pagination: { pageIndex: 0, pageSize: 5 } }}
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            enableSorting={false}
            enableColumnFilters={false}
            positionActionsColumn="last"
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    color="info"
                    onClick={() => table.setEditingRow(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <>
                <Button
                  color="primary"
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Add New Passenger
                </Button>
                <Button
                  color="primary"
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Add New Passenger
                </Button>
              </>
            )}
          />
          <CreateNewAccountModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewPassenger}
          />

          {/* <FormControl sx={{ mb: 2, minWidth: 180 }} size="small">
            <InputLabel id="filter-select-label">Filter</InputLabel>
            <Select
              labelId="filter-select-label"
              id="filter-select"
              value={filter}
              label="Filter"
              onChange={handleFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="CheckedIn">Checked-In</MenuItem>
              <MenuItem value="NotCheckedIn">Not Checked-In</MenuItem>
              <MenuItem value="Infant">Infant</MenuItem>
              <MenuItem value="WheeChair">WheeChair</MenuItem>
            </Select>
          </FormControl>
           */}
        </>
      );
    } else if (passengersList.error !== "") {
      return <p>{passengersList.error}</p>;
    }
  };

  return <div className="passengers"> {showData()}</div>;
}

function mapStateToProps(state) {
  return {
    passengersList: state.passengers,
  };
}

const mapDispatchToProps = {
  loadPassengers,
  savePassenger,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePassengerPage);

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const initialPassenger = {
    name: "",
    passport: "",
    address: "",
    dob: "",
    infant: false,
    weelchair: false,
    specialMeals: false,
    flight: "",
    seatno: "",
    id: "",
    checkedIn: false,
  };

  const [values, setValues] = React.useState(initialPassenger);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add New Passenger</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {
              // eslint-disable-next-line
              columns.map((column) => {
                if (column.accessorKey === "dob") {
                  return (
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      key={column.accessorKey}
                    >
                      <DemoContainer components={["DateField"]}>
                        <DateField
                          label={column.header}
                          fullWidth={true}
                          onChange={(newValue) =>
                            setValues({
                              ...values,
                              [column.accessorKey]: newValue,
                            })
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                } else if (column.accessorKey !== "id") {
                  return (
                    <TextField
                      key={column.accessorKey}
                      label={column.header}
                      name={column.accessorKey}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  );
                }
              })
            }
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add New Passenger
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateNewAccountModal.propTypes = {
  open: PropTypes.bool,
  columns: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
