import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import propTypes from "prop-types";
import { savePassenger } from "../../redux/actions/passengerAction.js";
import { updateSeatDetails } from "../../redux/actions/flightAction.js";
import { useDispatch } from "react-redux";

function SeatSelection({ seatDetail, passenger }) {
  const [seat, setSeat] = useState(passenger.seatNo);
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    setSeat(event.target.value);
    const updatedPassenger = { ...passenger, seatNo: event.target.value };
    const updatedSeat = seatDetail[0].seat.map((item) => {
      if (item.id === event.target.value) {
        return {
          ...item,
          checkedIn: passenger.checkedIn,
          wheelchairRequired: passenger.wheelchairRequired,
          infants: passenger.infants,
          isAvailable: false,
        };
      } else if (item.id === passenger.seatNo) {
        return {
          ...item,
          checkedIn: false,
          wheelchairRequired: false,
          infants: false,
          isAvailable: true,
        };
      } else {
        return item;
      }
    });
    await dispatch(savePassenger(updatedPassenger));
    await dispatch(updateSeatDetails({ seat: updatedSeat }, passenger.fid));
  };

  return (
    <FormControl sx={{ minWidth: 80 }} size="small">
      <InputLabel>Seat No.</InputLabel>
      <Select value={seat} label="Seat No." onChange={handleChange}>
        {seatDetail[0].seat.map((item) => {
          if (item.isAvailable || item.id === passenger.seatNo) {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            );
          }
          return null;
        })}
      </Select>
    </FormControl>
  );
}

SeatSelection.propTypes = {
  seatDetail: propTypes.array,
  passenger: propTypes.object,
};

export default SeatSelection;
