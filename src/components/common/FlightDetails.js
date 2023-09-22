import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { loadFlights } from "../../redux/actions/flightAction";
import { Typography, Paper, Stack } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import propTypes from "prop-types";
import "../../css/_flight-details.scss";

function FlightDetailsPage({ flight }) {
  const flightDetails = useSelector((state) => state.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFlights({ flight: flight }));
  }, [dispatch, flight]);

  return (
    <Stack>
      <Paper
        elevation={0}
        className="flight-details"
        aria-label="Flight Details"
      >
        {flightDetails.length > 0 && (
          <Stack direction="column" spacing={2}>
            <Stack direction="row">
              <FlightIcon />
              <Stack direction="column">
                <Typography variant="subtitle2">Flight Id</Typography>
                <Typography variant="body2">{flightDetails[0].id}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <CalendarMonthIcon />
              <Stack direction="column">
                <Typography variant="subtitle2">Date</Typography>
                <Typography variant="body2">
                  {flightDetails[0].scheduleDate}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <AccessTimeIcon />
              <Stack direction="column">
                <Typography variant="subtitle2">Time</Typography>
                <Typography variant="body2">{flightDetails[0].time}</Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <FlightTakeoffIcon />
              <Stack direction="column">
                <Typography variant="subtitle2">From</Typography>
                <Typography variant="body2">
                  {flightDetails[0].source}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <FlightLandIcon />
              <Stack direction="column">
                <Typography variant="subtitle2">To</Typography>
                <Typography variant="body2">
                  {flightDetails[0].destination}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}

FlightDetailsPage.propTypes = {
  flight: propTypes.string.isRequired,
  flightDetails: propTypes.array,
  loadFlights: propTypes.func,
};

function mapStateToProps(state) {
  return {
    flightDetails: state.flights,
  };
}

const mapDispatchToProps = {
  loadFlights,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetailsPage);
