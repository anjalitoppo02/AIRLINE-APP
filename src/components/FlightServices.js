import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
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
  // Tab Configuration
  const [activeTab, setActiveTab] = useState(0);
  const handleTabType = (event, newValue) => setActiveTab(newValue);
  
  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Flight Services
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
            <Tab label="Ancillary Services" />
            <Tab label="Special Meals" />
              <Tab label="Shopping Items" />
          </Tabs>
          </Grid>
          </Grid>
    </>
  );
}

export default FlightServicesPage;
