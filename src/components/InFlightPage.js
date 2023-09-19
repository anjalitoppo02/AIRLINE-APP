import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  loadPassengers,
  savePassenger
} from "../../redux/actions/passengerAction";
import { loadAncillaryServices } from "../../redux/actions/ancillaryServiceAction";
import propTypes from "prop-types";
import { createTheme, Box, Grid, Paper, List, ListItem, Button, Tooltip, MenuItem, Checkbox, Divider, ListItemText, Select } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

function InFlightPage() {
  const theme = createTheme();
  const passengers = useSelector((state) => state.passengers);
  const ancillaryServices = useSelector((state) => state.ancillaryServices);
  const dispatch = useDispatch();
  let passengersLookUp = {};

  const initialPassenger = {
    name: "",
    passport: "",
    address: "",
    dob: "",
    infant: false,
    weelchair: false,
    specialMeals: false,
    flight: "",
    seatno: "",
    id: "",
    createdAt: "",
    checkedIn: false
  };
  const [selectedPassenger, setSelectedPassenger] = React.useState(
      initialPassenger
  );

  const [selectedFlight, setFlight] = React.useState(1);
  const [selectedAncilaryService, setAncilaryService] = React.useState(1);

  const [filter] = React.useState({
    weelchair: false,
    infant: false,
    specialMeals: false,
    checkedIn: false
  });

  const seatColumns = ["A", "B", "C"];
  const seatRows = ["1", "2", "3"];

  if (passengers.length > 0) {
    // eslint-disable-next-line
    passengers.map((passengers) => {
      passengersLookUp[passengers.id] = passengers.name;
    });
  }

  const loadAsyncData = useCallback(async () => {
    try {
      await dispatch(
        loadPassengers({
          mandarotyFields: false,
          flight: selectedFlight
        })
      );
      await dispatch(loadAncillaryServices());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [selectedFlight, dispatch]);

  useEffect(() => {
    loadAsyncData();
  }, [loadAsyncData]);

  const handleCheckedIn = (event) => {
    setSelectedPassenger({
      ...selectedPassenger,
      checkedIn: event.target.checked
    });
  };

  const handleWeelchair = (event) => {
    setSelectedPassenger({
        ...selectedPassenger,
        weelchair: event.target.checked
    });
  };

  const handleInfant = (event) => {
    setSelectedPassenger({
        ...selectedPassenger,
        infant: event.target.checked
    });
  };

  const handleSpecialMeals = (event) => {
    setSelectedPassenger({
        ...selectedPassenger,
        specialMeals: event.target.checked
    });
  };

  const handleSeatNo = (event) => {
    setSelectedPassenger({
        ...selectedPassenger,
        seatno: event.target.value
    });
  };

  function setPassengerCheckIn(passenger) {
    setSelectedPassenger(passenger);
  }
  
  function handleSave(passenger) {
    dispatch(savePassenger(passenger));
    setSelectedPassenger(initialPassenger);
    loadSeatNo();
  }

  const handleAncillaryOption = (event) => {
    setSelectedPassenger({
      ...selectedPassenger,
      ancillaryServices: [...ancillaryServices, selectedAncilaryService]
    });
    console.log(selectedAncilaryService);

    console.log(selectedPassenger);
  };
    
  function loadSeatNo() {
    const seatNumbers = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];

    let optionItems = seatNumbers.map((item) =>
      passengers.find((o) => o.seatno === item) === undefined ? (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ) : (
        <MenuItem disabled key={item} value={item}>
          {item}
        </MenuItem>
      )
    );
    return optionItems;
  }
    
  function loadAncillaryOptions() {
    let optionItems = ancillaryServices.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        {item.service}
      </MenuItem>
    ));
    return optionItems;
  }

  function isPassengerCheckedIn(seatno) {
      let checkedIn = false;
      let passenger = {};
      // eslint-disable-next-line
      passengers.map((item) => {
        if (item.seatno === seatno) {
          checkedIn = true;
          passenger = item;
        }
      });
  
      if (
        (filter.checkedIn === true && passenger.checkedIn !== true) ||
        (filter.weelchair === true && passenger.weelchair !== true) ||
        (filter.infant === true && passenger.infant !== true) ||
        (filter.specialMeals === true && passenger.specialMeals !== true)
      ) {
        return false;
      }
  
      if (checkedIn) {
        return (
          <React.Fragment>
            <Tooltip title={passenger.name} aria-label="add">
              <Button
                sx={{ margin: theme.spacing(1), textAlign: 'center' }}
                variant="contained"
                color="primary"
                onClick={(event) => {
                  setPassengerCheckIn(passenger);
                }}
              >
                {seatno}
                <AccessibleIcon
                  sx={{
                    color: passenger.weelchair ? '#fff' : '#b0bec5'
                  }}
                />
                <ChildFriendlyIcon
                  sx={{
                    color: passenger.infant ? '#fff' : '#b0bec5'
                  }}
                />
                <RestaurantMenuIcon
                  sx={{
                    color: passenger.specialMeals ? '#fff' : '#b0bec5'
                  }}
                />
                <CheckCircleIcon
                  sx={{
                    color: passenger.checkedIn ? '#fff' : '#b0bec5'
                  }}
                />
              </Button>
            </Tooltip>
          </React.Fragment>
        );
      } else {
        return (
          <Button
            disabled
            sx={{ margin: theme.spacing(1), textAlign: 'center' }}
            variant="contained"
          >
            {seatno}
            <AccessibleIcon />
            <ChildFriendlyIcon />
            <RestaurantMenuIcon />
            <CheckCircleIcon />
          </Button>
        );
      }
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: theme.spacing(1),
                margin: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary
              }}
            >
              <Grid item xs={12}>
                <div>
                  <List>
                    <ListItem>
                      <Button
                        variant="contained"
                        color={selectedFlight === 1 ? "primary" : "grey"}
                        sx={{ margin: theme.spacing(1), textAlign: 'center' }}
                        startIcon={<FlightIcon />}
                        onClick={(event) => {
                          setFlight(1);
                        }}
                      >
                        Flight 1 (10:00 AM)
                      </Button>

                      <Button
                        variant="contained"
                        color={selectedFlight === 2 ? "primary" : "grey"}
                        sx={{ margin: theme.spacing(1), textAlign: 'center' }}
                        startIcon={<FlightIcon />}
                        onClick={(event) => {
                          setFlight(2);
                        }}
                      >
                        Flight 2 (12:00 PM)
                      </Button>
                      <Button
                        variant="contained"
                        color={selectedFlight === 3 ? "primary" : "grey"}
                        sx={{ margin: theme.spacing(1), textAlign: 'center' }}
                        startIcon={<FlightIcon />}
                        onClick={(event) => {
                          setFlight(3);
                        }}
                      >
                        Flight 3 (06:00 PM)
                      </Button>
                    </ListItem>
                  </List>
                </div>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={8} justify="space-between">
            {seatColumns.map((seatColumn) => (
              // eslint-disable-next-line react/jsx-key
              <Paper
                sx={{
                  padding: theme.spacing(1),
                  margin: theme.spacing(1),
                  textAlign: 'center',
                  color: theme.palette.text.secondary
                }}
              >
                {seatRows.map((seatRow) =>
                  isPassengerCheckedIn(seatColumn + seatRow)
                )}
              </Paper>
            ))}
          </Grid>

          <Grid item xs={4}>
            <Paper
              sx={{
                padding: theme.spacing(1),
                margin: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary
              }}
            >
              <List component="nav" sx={{ flexGrow: 1 }}>
                <ListItem divider>
                  <ListItemText primary="Passenger Details" />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!selectedPassenger.name.length}
                    sx={{ 
                      margin: theme.spacing(1),
                      textAlign: "center"
                    }}
                    startIcon={<SaveIcon />}
                    onClick={(event) => {
                      handleSave(selectedPassenger);
                    }}
                  >
                    SAVE
                  </Button>
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Checked In" />
                  <Checkbox
                    disabled
                    checked={selectedPassenger.checkedIn}
                    onChange={handleCheckedIn}
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Seat No" />
                  <Select
                    disabled
                    value={selectedPassenger.seatno}
                    onChange={handleSeatNo}
                  >
                    {loadSeatNo()}
                  </Select>
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Name" />
                  {selectedPassenger.name}
                </ListItem>
                <Divider />
                <ListItem divider>
                  <ListItemText primary="Passport" />
                  {selectedPassenger.passport}
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="Address" />
                  {selectedPassenger.address}
                </ListItem>
                <ListItem divider>
                  <ListItemText primary="DOB" />
                  {selectedPassenger.dob}
                </ListItem>
                <Checkbox
                  disabled
                  checked={selectedPassenger.weelchair}
                  onChange={handleWeelchair}
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
                <AccessibleIcon
                  color={!selectedPassenger.weelchair ? "default" : "primary"}
                />
                <Checkbox
                  disabled
                  checked={selectedPassenger.infant}
                  onChange={handleInfant}
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
                <ChildFriendlyIcon
                  color={!selectedPassenger.infant ? "default" : "primary"}
                />
                <Checkbox
                  checked={selectedPassenger.specialMeals}
                  onChange={handleSpecialMeals}
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
                <RestaurantMenuIcon
                  color={
                    !selectedPassenger.specialMeals ? "default" : "primary"
                  }
                />

                <Divider light />
                <ListItem divider>
                  <ListItemText primary="Add Ancillary Service" />
                </ListItem>
                <ListItem divider>
                  <Select
                    value={selectedAncilaryService}
                    onChange={(e) => {
                      setAncilaryService(e.target.value);
                    }}
                  >
                    {loadAncillaryOptions()}
                  </Select>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ 
                      margin: theme.spacing(1),
                      textAlign: "center"
                    }}
                    startIcon={<AddIcon />}
                    onClick={(event) => {
                      handleAncillaryOption(event);
                    }}
                  >
                    ADD
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

InFlightPage.propTypes = {
    checkInPassengers: propTypes.array.isRequired,
    passengers: propTypes.array.isRequired,
    ancillaryServices: propTypes.array.isRequired,
    loadAncillaryServices: propTypes.func.isRequired,
    loadPassengers: propTypes.func.isRequired,
    savePassenger: propTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        checkInPassengers: state.checkInPassengers,
        passengers: state.passengers,
        ancillaryServices: state.ancillaryServices,
    }
}

const mapDispatchToProps = {
    loadAncillaryServices,
    loadPassengers,
    savePassenger,
}

export default connect(mapStateToProps, mapDispatchToProps)(InFlightPage)