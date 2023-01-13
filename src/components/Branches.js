import Select from 'react-select';
import {useEffect, useState} from "react";
import Repository from "../Repository";
import {connect} from "react-redux";
import {SET_BRANCHES} from "../actions";


const BranchesSelect = ({dispatchSetBranches}) => {

    const [branches, setBranches] = useState([])
    useEffect(() => {
        var repository = new Repository()
        repository.fetchBranches().then(setBranches)

    }, [])
    const onChange = (result) => {
        const branches = result.map(({value}) => value)
        dispatchSetBranches(branches)
    }
    return <Select isMulti
                   options={branches.map(value => ({
                       value: value,
                       label: value.name
                   }))}
                   onChange={onChange}
                   name={"branches"}/>


}

const mapDispatchToProps = (dispatch) => ({
    dispatchSetBranches: (branches) => dispatch({
        type: SET_BRANCHES,
        payload: branches
    })
})

export default connect(null, mapDispatchToProps)(BranchesSelect)