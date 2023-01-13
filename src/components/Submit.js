import {connect} from "react-redux";
import {Alert, Button, Snackbar} from "@mui/material";
import {useState} from "react";
import {BounceLoader} from "react-spinners";
import Repository from "../Repository";


const SubmitButton = ({state}) => {

    const [processing, setProcessing] = useState(false)
    const [done,setDone] = useState(false)

    const onClick = () => {
        setProcessing(true)
        const {selected} = state
        var repository = new Repository()
        repository.createAppointment(selected.branch).then(() => {
            setProcessing(false)
            setDone(true)

        }).catch(() => {
            setProcessing(false)
        })

    }

    const handleClose = () => setDone(false)

    return <div style={{
        display:"flex",
        padding: "4rem",
        flexDirection:"row",
        alignItems: "center",
        justifySelf:"center",
        alignSelf:"center",
        justifyContent:"center",
        height:"60px",

    }}>
        <Snackbar open={done} autoHideDuration={5000} onClose={handleClose}>
            <Alert  sx={{width:"100%"}} onClose={handleClose} severity="success" >
                Appointment is successfully created. Please check your e-mail for confirmation link.
            </Alert>
        </Snackbar>
        {
            processing ? <BounceLoader/> : <Button onClick={onClick} height
                                                   variant="contained">Submit</Button>

        }
    </div>
}

const mapStateToProps = ({state}) => ({state})

export default connect(mapStateToProps)(SubmitButton)