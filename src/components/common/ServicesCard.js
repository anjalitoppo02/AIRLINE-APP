import React from "react";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Stack,
  // Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import propTypes from "prop-types";
import "../../assets/css/service_card.scss";
import { useSelector, useDispatch } from "react-redux";
import { saveFlightService } from "../../redux/actions/flightServiceAction";

function ServicesCardPage({ fService, serviceType }) {
  const flightServices = useSelector((state) => state.services);
  const dispatch = useDispatch();

  const handleDelete = async (val) => {
    console.log(val);
    let updatedService;
    switch (serviceType) {
      case "ancillary-service":
        updatedService = {
          ...flightServices[0],
          ancillaryServices: fService.filter((item) => item !== val),
        };
        break;
      case "special-meal":
        updatedService = {
          ...flightServices[0],
          specialMeal: fService.filter((item) => item !== val),
        };
        break;
      case "shopping-item":
        updatedService = {
          ...flightServices[0],
          inflightShop: fService.filter((item) => item !== val),
        };
        break;
      default:
        updatedService = { ...flightServices };
    }

    console.log(updatedService);
    await dispatch(saveFlightService(updatedService));
  };

  return (
    <>
      <Grid container spacing={2}>
        {fService.map((item, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card className="flightService">
                <CardMedia
                  component="img"
                  alt={serviceType}
                  height="140"
                  className={serviceType}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="white"
                  >
                    {item}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      variant="outlined"
                      className="editBtn"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      variant="outlined"
                      className="deleteBtn"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default ServicesCardPage;

ServicesCardPage.propTypes = {
  fService: propTypes.array,
  serviceType: propTypes.string,
};
