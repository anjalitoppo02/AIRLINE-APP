import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Box, Typography, Grid, Tabs, Tab, Fab } from "@mui/material";
import ServicesCardPage from "./common/ServicesCard";
import {
  loadFlightServices,
  saveFlightService,
} from "../redux/actions/flightServiceAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddNewServicesModal from "./common/ServiceModal";

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
      {value === index && <Box sx={{ mt: "40px" }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: propTypes.node,
  index: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
};

const fabStyle = {
  position: "absolute",
  bottom: 50,
  right: 30,
};

function FlightServicesPage() {
  const flightServices = useSelector((state) => state.services);
  const { flightId } = useParams();
  const dispatch = useDispatch();

  // Tab Configuration
  const [activeTab, setActiveTab] = useState(0);
  const handleTabType = (event, newValue) => setActiveTab(newValue);

  //Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fServices = [
    {
      label: 'Ancillary Services',
      id: 'ancillaryServices'
    },
    {
      label: 'Special Meals',
      id: 'specialMeal'
    },
    {
      label: 'Shopping Items',
      id: 'inflightShop'
    }
  ];

  const handleAddNewService = (value) => {
    console.log(value);
    const updatedService = flightServices[0];
    console.log(updatedService.fServices[activeTab].id));
    switch(activeTab) {
      case 0:
        updatedService.ancillaryServices.push(value);
        break;
      case 1:
        updatedService.specialMeal.push(value);
        break;
      case 2:
        updatedService.inflightShop.push(value);
        break;
      default:
        break;
    }
    

    dispatch(saveFlightService(updatedService));
  };

  useEffect(() => {
    dispatch(loadFlightServices({ flight: flightId }));
  }, [dispatch, flightId]);

  const showData = () => {
    if (flightServices.length !== 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={activeTab}
              onChange={handleTabType}
              aria-label="Flight Services Tab"
              className="primary-menu-tab"
              variant="scrollable"
              scrollButtons="auto"
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
              <ServicesCardPage
                fService={flightServices[0].inflightShop}
                serviceType="shopping-item"
              />
            </TabPanel>
            <Fab
              color="primary"
              size="medium"
              aria-label="Add flight service button"
              sx={fabStyle}
              onClick={() => setCreateModalOpen(true)}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      );
    } else if (flightServices.error !== "") {
      return <p>{flightServices.error}</p>;
    }
  };

  return (
    <>
      <Typography className="heading" variant="h3">
        Flight Services
      </Typography>
      {showData()}

{fServices.map((item, index) => {
   <AddNewServicesModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleAddNewService}
  key={item.id}
        flightService={activeTab === index ? item : null}
      />
}
)}
     
    </>
  );
}

export default FlightServicesPage;
