import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Box, Typography, Divider, Grid, Tabs, Tab } from "@mui/material";
import ServicesCardPage from "./common/ServicesCard";
import { loadFlightServices } from "../redux/actions/flightServiceAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

function FlightServicesPage() {
  const flightServices = useSelector((state) => state.services);
  const { flightId } = useParams();
  const dispatch = useDispatch();

  // Tab Configuration
  const [activeTab, setActiveTab] = useState(0);
  const handleTabType = (event, newValue) => setActiveTab(newValue);

  useEffect(() => {
    dispatch(loadFlightServices({ flight: flightId }));
  }, [dispatch, flightId]);

  const showData = () => {
    if (flightServices.length !== 0) {
      console.log(flightServices);
      return (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Flight Services
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tabs
                value={activeTab}
                onChange={handleTabType}
                aria-label="Airline Check-In"
                className="checkInMenuTabs"
              >
                <Tab label="Ancillary Services" />
                <Tab label="Special Meals" />
                <Tab label="Shopping Items" />
              </Tabs>

              <TabPanel value={activeTab} index={0}>
                <ServicesCardPage
                  fService={flightServices[0].ancillaryServices}
                  serviceType="ancillary-service"
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <ServicesCardPage
                  fService={flightServices[0].specialMeal}
                  serviceType="special-meal"
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <div>Shopping Items</div>
              </TabPanel>
            </Grid>
          </Grid>
        </>
      );
    } else if (flightServices.error !== "") {
      return <p>{flightServices.error}</p>;
    }
  };

  return <>{showData()}</>;
}

export default FlightServicesPage;
