import SelectableCards from "./SelectableCards";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import Repository from "../Repository";


const AvailableHours = ({state}) => {


    const [availableHours, setAvailableHours] = useState([])

    useEffect( () => {
        const {date} = state
        const {branches} = state

        var repo = new Repository()
        repo.fetchAvailableHoursBulk(branches,date)
            .then((value) => {
                var tmpAvailableHours = []
                Object.keys(value).forEach(key => {
                    const {free_hours} = value[key]
                    const branchName = branches.filter(branch => branch.id.toString() === key.toString())[0].name
                    free_hours.forEach(freeHour => {
                        var date = new Date(freeHour)
                        tmpAvailableHours.push({
                            branch: key,
                            hour: freeHour,
                            title: `${date.getHours()}:00`,
                            description: branchName
                        })
                    })

                })
                setAvailableHours(tmpAvailableHours)

            });

    }, [state.date,state.branches])

    return (
        <div>
            <SelectableCards title="Pick a team" cardContents={availableHours}/>
        </div>
    );

}

const mapStateToProps = ({state}) =>({state})

export default connect(mapStateToProps)(AvailableHours)