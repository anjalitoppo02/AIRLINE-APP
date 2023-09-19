import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFlights } from "../redux/actions/flightAction.js";
import {
  CssBaseline,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import "../css/_flightList.scss";
import { grey } from "@mui/material/colors";

function FlightList() {
  const flightList = useSelector((state) => state.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFlights({ flight: 0 }));
  }, [dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box mt={2} className="flight-list">
        <List
          aria-labelledby="flight-list"
          color={grey[900]}
          subheader={
            <ListSubheader component="div" id="flight-list" color="inherit">
              Flight
            </ListSubheader>
          }
        >
          {flightList.map((flight) => {
            return (
              <ListItem key={flight.id} disablePadding>
                <ListItemButton
                  component="a"
                  href={`/flights/${flight.id}/dashboard`}
                >
                  <ListItemIcon>
                    <FlightIcon />
                  </ListItemIcon>
                  <ListItemText primary={flight.id} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </React.Fragment>
  );
}

export default FlightList;
