import './App.css';
import {Grid} from "@mui/material";
import ServiceSelect from "./components/ServiceSelect";
import BranchesSelect from "./components/Branches";
import AppCalendar from "./components/Calendar";
import AvailableHours from "./components/AvailableHours";
import SubmitButton from "./components/Submit";

function App() {
    return (
        <div className="App">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h2>
                        Create an appointment
                    </h2>
                </Grid>
                <Grid item xs={3}>
                    Service
                </Grid>
                <Grid item xs={9}>
                    <ServiceSelect/>
                </Grid>
                <Grid item xs={3}>
                    Branches
                </Grid>
                <Grid item xs={9}>
                    <BranchesSelect/>
                </Grid>
                <Grid item xs={12}>
                    <div style={{
                        margin:"2rem",
                        display:"flex",
                        flexDirection:"row",
                        justifyContent:"center",
                        alignItems:"center",
                        justifyItems:"center"
                    }}><AppCalendar/></div>
                </Grid>
                <Grid item xs={12}>
                    <h3>Available Hours</h3>
                </Grid>
                <Grid item xs={12}>
                    <AvailableHours/>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <SubmitButton/>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>

        </div>
    );
}

export default App;
