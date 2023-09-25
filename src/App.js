import React, { Suspense, lazy } from "react";
import "./assets/css/style.scss";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import SignIn from "./components/Login";
import CircularProgress from "@mui/material/CircularProgress";
import { ProtectedRoute } from "./ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import "@fontsource/public-sans";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const FlightList = lazy(() => import("./components/FlightList"));
const DashboardPage = lazy(() => import("./components/Dashboard"));
const FlightCheckInPage = lazy(() => import("./components/CheckInFlight"));
const InFlightPage = lazy(() => import("./components/InFlight"));
const ManagePassengerPage = lazy(() => import("./components/ManagePassenger"));
const FlightServicePage = lazy(() => import("./components/FlightServices"));

const theme = createTheme({
  typography: {
    fontFamily: ["Public Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#212b36",
    },
    secondary: {
      main: "#fa541c",
    },
  },
});

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Header />
        <Container maxWidth="lg" sx={{ padding: "50px 0px" }}>
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route
              path="/"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <ProtectedRoute>
                    <FlightList />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="flights"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <ProtectedRoute>
                    <FlightList />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="flights/:flightId/dashboard"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="flights/:flightId/checkin"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <ProtectedRoute>
                    <FlightCheckInPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="flights/:flightId/inflight"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <ProtectedRoute>
                    <InFlightPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="flights/:flightId/passenger"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <ProtectedRoute>
                    <ManagePassengerPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="flights/:flightId/flightServices"
              element={
                <Suspense fallback={<CircularProgress />}>
                  <ProtectedRoute>
                    <FlightServicePage />
                  </ProtectedRoute>
                </Suspense>
              }
            />

            <Route path="*" element={<PageNotFound />} />
            {/* 
          <Route
            path="/passenger"
            element={
              <Suspense fallback={<CircularProgress />}>
                <ProtectedRoute>
                  <ManagePassengerPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          
          <Route
            path="/inflight"
            element={
              <Suspense fallback={<CircularProgress />}>
                <ProtectedRoute>
                  <InFlightPage />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/ancillary"
            element={
              <Suspense fallback={<CircularProgress />}>
                <ProtectedRoute>
                  <AncillaryServicePage />
                </ProtectedRoute>
              </Suspense>
            }
          /> */}
          </Routes>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
