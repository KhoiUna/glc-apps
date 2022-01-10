import Grid from "@material-ui/core/Grid";
import Popup from "../components/Popup/Popup";
import { makeStyles } from "@material-ui/core/styles";
import FormatTime from "../helpers/FormatTime";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Container,
  Paper,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useEffect, useState } from "react";
import { origin } from "../config/config";
import Layout from "../containers/layout";
import Script from "next/script";
import SubmissionUtil from "../utils/SubmissionUtil";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Reserve() {
  const classes = useStyles();

  const [options, setOptions] = useState([]);
  useEffect(() => {
    SubmissionUtil.fetchStudentNames()
      .then((r) => {
        setOptions(
          r.map((item) => ({
            label: item.full_name,
            studentId: item.id,
          }))
        );
      })
      .catch((err) => {
        console.error("Error getting student names");
      });
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const handleDateChange = (date) => {
    setSelectedDate(new Date(date));
  };

  const [timeSlot, setTimeSlot] = useState("");
  const handleTimeSlotChange = ({ target }) => {
    setTimeSlot(target.value);
  };

  const [data, setData] = useState({
    fullName: "",
    numberOfPeople: "",
  });

  const [warn, setWarn] = useState("");
  const [success, setSuccess] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("submit");
  const handleChange = ({ target }) => {
    setWarn("");
    setSuccess(null);
    setSubmitStatus("submit");

    let { name, value } = target;
    value = name === "numberOfPeople" ? value * 1 : value;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [popUp, setPopUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  let dataObj = {
    ...data,
    selectedDate: new Date(selectedDate.toUTCString()),
    timeSlot,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!submitting) {
        setSubmitting(true);
        setSubmitStatus("submitting");

        const res = await fetch(`${origin}/api/reserve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(dataObj),
        });

        if (res.ok === true) {
          setData({
            fullName: "",
            numberOfPeople: "",
          });
          setTimeSlot("");
          setSelectedDate(new Date(Date.now()));

          setSubmitting(false);
          setSuccess(true);
          setSubmitStatus("success");
          setPopUp(true);
        } else {
          setWarn(await res.text());
          setSubmitting(false);
          setSuccess(false);
          setSubmitStatus("fail");
        }
      }
    } catch (e) {
      console.error("Error posting data...");
      setSubmitting(false);
      setSuccess(false);
    }
  };

  const [value, setValue] = useState(options[0]);

  return (
    <Layout componentName="Reserve">
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Container className="form-container">
          <Paper elevation={10}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <h2 className="reserve-notice">PLEASE FILL IN ALL FIELDS</h2>
              <br />

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  freeSolo
                  id="fullName"
                  value={value}
                  onChange={(event, newValue) => setValue(newValue)}
                  inputValue={data.fullName}
                  onInputChange={(event, newInputValue) =>
                    setData((prev) => ({ ...prev, fullName: newInputValue }))
                  }
                  options={options}
                  getOptionLabel={(option) => option.label}
                  style={{ width: "14rem" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="fullName"
                      label="Full name"
                      variant="filled"
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="number-of-people"
                  name="numberOfPeople"
                  label="Number of people"
                  fullWidth
                  autoComplete="off"
                  type="number"
                  variant="filled"
                  placeholder="0"
                  value={dataObj.numberOfPeople}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  variant="filled"
                  className={classes.formControl}
                  required
                >
                  <InputLabel id="time-slot-label">Time slot</InputLabel>
                  <Select
                    labelId="time-slot-label"
                    id="demo-simple-select-outlined"
                    value={timeSlot}
                    onChange={handleTimeSlotChange}
                    label="Time slot"
                    className={classes.selectEmpty}
                  >
                    {[...Array(24).keys()].map((time, index) => (
                      <MenuItem value={time} key={index}>
                        {FormatTime.timeSlot(time)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {warn && (
                <Grid item xs={12} sm={6}>
                  <p style={{ fontWeight: "bold", color: "red" }}>
                    <i>{warn}</i>
                  </p>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className="submit-button"
                  type="submit"
                  style={
                    success
                      ? { backgroundColor: "green" }
                      : success === false
                      ? { backgroundColor: "#ff0000" }
                      : null
                  }
                >
                  {submitStatus.toUpperCase() + " "}
                  {submitting && (
                    <CircularProgress
                      style={{
                        width: "1.7rem",
                        height: "1.7rem",
                        margin: "auto 0 auto 0.5rem",
                        color: "#fff",
                      }}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </form>

      {popUp && (
        <Popup
          fromForm="reserve"
          firstName={localStorage.getItem("firstName")}
        />
      )}

      <Script
        strategy="beforeInteractive"
        src="https://unpkg.com/@gobistories/gobi-web-integration@^6.11.1"
      />
    </Layout>
  );
}
