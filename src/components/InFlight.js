import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import propTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  Typography,
  Divider,
  Grid,
  Stack,
  Skeleton,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Paper,
  // Checkbox,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // TablePagination,
  // TableFooter,
} from "@mui/material";
import FlightSeatDetails from "./common/FlightSeatDetails";
import FlightDetailsPage from "./common/FlightDetails";
import { loadSeatDetails } from "../redux/actions/flightAction";

function InFlightPage() {
  const { flightId } = useParams();
  const dispatch = useDispatch();

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
                    className="special-meals"
                  />
                  <Typography variant="subtitle2">Special Meals</Typography>
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
              <FlightSeatDetails feature="inFlight" />
            </Stack>
            {/* <Stack direction="column">
              <TableContainer component={Paper}>
                <Table aria-label="Passengers List">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Flight ID</TableCell>
                      <TableCell>Seat No.</TableCell>
                      <TableCell>Ancillary Services</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack> */}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={5} lg={4}>
          <FlightDetailsPage flight={flightId} />
        </Grid>
      </Grid>
    </>
  );
}

export default InFlightPage;
