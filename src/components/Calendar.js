import Calendar from 'react-calendar';
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';
import {connect} from "react-redux";
import {SET_DATE} from "../actions";


const AppCalendar = ({date,dispatchSetDate}) => {

    return (
        <div>
            <Calendar onChange={dispatchSetDate} value={date} />
        </div>
    );
}

const mapStateToProps = ({state:{date}}) => ({date})
const mapDispatchToProps = (dispatch) => ({
    dispatchSetDate : (date) => dispatch({
        type:SET_DATE,
        payload:date
    })
})


export default connect(mapStateToProps,mapDispatchToProps)(AppCalendar)