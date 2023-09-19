import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FlightIcon from "@mui/icons-material/Flight";
import { NavLink, useParams } from "react-router-dom";

function DashboardPage() {
  const role = localStorage.getItem("role");
  const { flightId } = useParams();

  return (
    <Container maxWidth="md" component="main" sx={{ pt: 5, pb: 6 }}>
      {role === "admin" && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <NavLink to={`/flights/${flightId}/passenger`}>
                <CardActionArea>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <PersonIcon />
                      <Typography gutterBottom variant="button">
                        Manage Passenger
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </NavLink>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <NavLink to="/ancillary">
                <CardActionArea>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <PersonIcon />
                      <Typography gutterBottom variant="button">
                        Manage anciallry service per flight
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </NavLink>
            </Card>
          </Grid>
        </Grid>
      )}
      {role === "staff" && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <NavLink to={`/flights/${flightId}/checkin`}>
                <CardActionArea>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <PersonIcon />
                      <Typography gutterBottom variant="button">
                        Check-In
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </NavLink>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <NavLink to={`/flights/${flightId}/inflight`}>
                <CardActionArea>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      spacing={1}
                    >
                      <FlightIcon />
                      <Typography gutterBottom variant="button">
                        In-Flight
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </NavLink>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default DashboardPage;
