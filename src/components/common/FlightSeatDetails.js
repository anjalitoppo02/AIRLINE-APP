import React from "react";
import { useSelector } from "react-redux";
import propTypes from "prop-types";
import "../../assets/css/single_flight.scss";
import {
  Grid,
  Stack,
  Typography,
  Paper,
  Checkbox,
  Tooltip,
  Button,
} from "@mui/material";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

function FlightSeatDetails({ feature }) {
  const seatDetail = useSelector((state) => state.seats);

  return (
    <Grid
      container
      className="seat-details"
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 1, sm: 2 }}
    >
      {seatDetail.length > 0 &&
        seatDetail[0].seat.map((item) => {
          return (
            <Grid item xs={3} key={item.id}>
              <Stack direction="column" alignItems="center">
                <Tooltip
                  title="Empty Seat"
                  arrow
                  disableHoverListener={!item.isAvailable}
                >
                  <Button className="seatButton">
                    <Paper
                      variant="outlined"
                      className={` 
                  ${
                    item.wheelchairRequired && feature === "checkIn"
                      ? "wheelchair"
                      : ""
                  } 
                  ${item.infants && feature === "checkIn" ? "infants" : ""} 
                  ${
                    item.specialMeal && feature === "inFlight"
                      ? "special-meals"
                      : ""
                  }
                  ${item.isAvailable ? "availableSeats" : "normal"}`}
                    >
                      <Checkbox
                        inputProps={{ "aria-label": "Airline Seat" }}
                        icon={<AirlineSeatReclineNormalIcon />}
                        checkedIcon={<AirlineSeatReclineNormalIcon />}
                        id={item.id}
                        checked={item.checkedIn}
                        className="airlineSeat"
                      />
                    </Paper>
                  </Button>
                </Tooltip>
                <Typography variant="subtitle2" htmlFor={item.id}>
                  {item.id}
                </Typography>
              </Stack>
            </Grid>
          );
        })}
    </Grid>
  );
}

FlightSeatDetails.propTypes = {
  flight: propTypes.string,
  feature: propTypes.string,
};

export default FlightSeatDetails;
