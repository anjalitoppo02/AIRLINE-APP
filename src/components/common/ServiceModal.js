import React from "react";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slide,
  Grid,
} from "@mui/material";
import propTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddNewServicesModal({ open, onClose, onSubmit }) {
  const [newFlightService, setNewFlightService] = React.useState("");

  const handleSubmit = () => {
    onSubmit(newFlightService);
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        maxWidth="xs"
        fullWidth={true}
        TransitionComponent={Transition}
      >
        <DialogTitle textAlign="center">Add Flight Service</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Ancillary Service"
                  name="ancillaryServices"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setNewFlightService(e.target.value)}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button color="secondary" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddNewServicesModal;

AddNewServicesModal.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func,
  onSubmit: propTypes.func,
};
