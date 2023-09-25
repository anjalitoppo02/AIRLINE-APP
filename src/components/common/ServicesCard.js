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

function ServicesCardPage({ fService, serviceType }) {
  console.log(fService);
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
