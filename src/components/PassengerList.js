import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadPassengers,
  savePassenger,
} from "../redux/actions/passengerAction";
import { updateSeatDetails } from "../redux/actions/flightAction";
import propTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  TableFooter,
} from "@mui/material";
import SeatSelection from "./common/SeatSelection";

function PassengerList({ flight }) {
  const passengersList = useSelector((state) => state.passengers);
  const seatDetail = useSelector((state) => state.seats);

  const dispatch = useDispatch();

  // Table pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Table filter
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSeatChange = async (passenger, event) => {
    const updatedPassenger = { ...passenger, checkedIn: event.target.checked };
    const updatedSeat = seatDetail[0].seat.map((item) => {
      return item.id === passenger.seatNo
        ? { ...item, checkedIn: event.target.checked }
        : item;
    });
    await dispatch(savePassenger(updatedPassenger));
    await dispatch(updateSeatDetails({ seat: updatedSeat }, flight));
  };

  useEffect(() => {
    dispatch(loadPassengers({ mandarotyFileds: false, flight: flight }));
  }, [dispatch, flight]);

  const getUpdatedPassengers = () => {
    if (filter === "") {
      return passengersList;
    } else if (filter === "CheckedIn") {
      return passengersList.filter((passenger) => {
        return passenger.checkedIn;
      });
    } else if (filter === "NotCheckedIn") {
      return passengersList.filter((passenger) => {
        return !passenger.checkedIn;
      });
    } else if (filter === "Infant") {
      return passengersList.filter((passenger) => {
        return passenger.infants;
      });
    } else {
      return passengersList.filter((passenger) => {
        return passenger.wheelchairRequired;
      });
    }
  };

  const showData = () => {
    if (passengersList.length !== 0) {
      return (
        <>
          <FormControl sx={{ mb: 2, minWidth: 180 }} size="small">
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

          <TableContainer component={Paper}>
            <Table aria-label="Passengers List">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Flight ID</TableCell>
                  <TableCell>Seat No.</TableCell>
                  <TableCell>Ancillary Services</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getUpdatedPassengers()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.fid}</TableCell>
                      <TableCell>
                        <SeatSelection
                          seatDetail={seatDetail}
                          passenger={row}
                        />
                        <Checkbox
                          checked={row.checkedIn}
                          onChange={(e) => handleSeatChange(row, e)}
                          inputProps={{ "aria-label": row.seatNo }}
                        />
                      </TableCell>
                      <TableCell>{row.ancillaryServices}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={4}
                    count={getUpdatedPassengers().length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      );
    } else if (passengersList.error !== "") {
      return <p>{passengersList.error}</p>;
    }
  };

  return <div className="passengers"> {showData()}</div>;
}

PassengerList.propTypes = {
  flight: propTypes.string,
};

export default PassengerList;
