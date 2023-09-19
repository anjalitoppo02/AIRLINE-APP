import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import propTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Tabs,
  Tab,
  Stack,
  Skeleton,
} from "@mui/material";
import FlightSeatDetails from "./common/FlightSeatDetails.js";
import PassengerList from "./PassengerList.js";
import FlightDetailsPage from "./common/FlightDetails.js";
import { loadSeatDetails } from "../redux/actions/flightAction.js";

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

function CheckInFlightPage() {
  const { flightId } = useParams();
  const dispatch = useDispatch();

  // Tab Configuration
  const [activeTab, setActiveTab] = useState(0);
  const handleTabType = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    dispatch(loadSeatDetails({ flight: flightId }));
  }, [dispatch, flightId]);

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
            <Grid container>
              <Stack direction="column">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  className="referenceLists"
                >
                  <Stack direction="row">
                    <Skeleton
                      variant="circular"
                      width={15}
                      height={15}
                      className="infant-wheelachair"
                    />
                    <Typography variant="subtitle2">
                      Infant and Wheelchair
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Skeleton
                      variant="circular"
                      width={15}
                      height={15}
                      className="infant"
                    />
                    <Typography variant="subtitle2">Infant</Typography>
                  </Stack>
                  <Stack direction="row">
                    <Skeleton
                      variant="circular"
                      width={15}
                      height={15}
                      className="wheelachair"
                    />
                    <Typography variant="subtitle2">Wheelchair</Typography>
                  </Stack>
                  <Stack direction="row">
                    <Skeleton
                      variant="circular"
                      width={15}
                      height={15}
                      className="normal"
                    />
                    <Typography variant="subtitle2">Normal</Typography>
                  </Stack>
                </Stack>
                <FlightSeatDetails feature="checkIn" />
              </Stack>
            </Grid>
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <PassengerList flight={flightId} />
          </TabPanel>
        </Grid>
        <Grid item xs={12} sm={4} md={5} lg={4}>
          <FlightDetailsPage flight={flightId} />
        </Grid>
      </Grid>
    </>
  );
}

export default CheckInFlightPage;
