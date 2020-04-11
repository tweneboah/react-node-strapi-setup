import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: "#f5f6fa",
    marginTop: "-200px",
  },
}));
const RegistrationForm = () => {
  const classes = useStyles();
  return (
    <div>
      <form>
        <Grid
          className={classes.root}
          container
          direction="column"
          alignItems="center"
          justify="center">
          <Grid item>
            <h1>register</h1>
          </Grid>

          <Grid item>
            <TextField id="standard-basic" label="username" />
          </Grid>
          <Grid item>
            <TextField type="email" id="standard-basic" label="email" />
          </Grid>
          <Grid item>
            <TextField type="password" id="standard-basic" label="Password" />
          </Grid>
          <Grid item>
            <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RegistrationForm;
