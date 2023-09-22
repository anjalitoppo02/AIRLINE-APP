import React from "react";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import propTypes from "prop-types";
import "../../css/service_card.scss";

function ServicesCardPage({ fService, serviceType }) {
  console.log(fService);
  return (
    <>
      <Grid container spacing={2}>
        {fService.map((item, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={serviceType}
                  height="140"
                  className={serviceType}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
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
