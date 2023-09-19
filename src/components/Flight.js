import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import { loadFlights, loadSeatDetails } from "../redux/actions/flightAction";
import propTypes from "prop-types";
import "../css/_flight-details.scss";
import FlightSeatDetails from "./common/FlightSeatDetails.js";
import { Typography, Grid, Divider, Paper, Stack } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PassengerList from "./PassengerList.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: propTypes.node,
  index: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
};

function Flight() {
  const { flightId } = useParams();
  const dispatch = useDispatch();
  const flightDetails = useSelector((state) => state.flights);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabType = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    dispatch(loadFlights({ flight: flightId }));
    dispatch(loadSeatDetails({ flight: flightId }));
  }, [dispatch, flightId]);

  const showFlightData = () => {
    if (flightDetails.length !== 0) {
      return (
        <>
          <Stack>
            <Paper
              elevation={0}
              className="flight-details"
              aria-label="Flight Details"
            >
              <Stack direction="column" spacing={2}>
                <Stack direction="row">
                  <FlightIcon />
                  <Stack direction="column">
                    <Typography variant="subtitle2">Flight Id</Typography>
                    <Typography variant="body2">
                      {flightDetails[0].id}
                    </Typography>
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
                    <Typography variant="body2">
                      {flightDetails[0].time}
                    </Typography>
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
            </Paper>
          </Stack>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Flight {flightId}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={7} lg={8}>
          <Tabs
            value={activeTab}
            onChange={handleTabType}
            aria-label="Airline Check-In"
            className="checkInMenuTabs"
          >
            <Tab label="Seat Mapping" />
            <Tab label="Passenger List" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <FlightSeatDetails flight={flightId} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <PassengerList flight={flightId} />
          </TabPanel>
        </Grid>
        <Grid item xs={12} sm={4} md={5} lg={4}>
          {showFlightData()}
        </Grid>
      </Grid>
    </>
  );
}

Flight.propTypes = {
  flightDetails: propTypes.array.isRequired,
  loadFlights: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    flightDetails: state.flights,
  };
}

const mapDispatchToProps = {
  loadFlights,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
