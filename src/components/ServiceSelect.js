import {useEffect, useState} from "react";
import Repository from "../Repository";
import Select from 'react-select';
import {SET_SERVICE} from "../actions";
import {connect} from "react-redux";


const ServiceSelect = ({dispatchSetService}) => {

    const [services, setServices] = useState([])
    useEffect(
        () => {
            var repository = new Repository()
            repository.fetchServices().then(allServices => setServices(allServices))
        },
        []
    )

    const onChange = (result, action) => {

        const {value, label} = result
        dispatchSetService(value)
    }

    return <div style={{
        zIndex: 1000
    }}>
        <Select
            onChange={onChange}
            className="basic-single"
            classNamePrefix="select"
            defaultValue={"Select service"}
            isSearchable
            name="color"
            options={services.map(value => ({
                value,
                label: value.name
            }))}
        />

    </div>
}

const mapDispatchToProps = (dispatch) => ({
    dispatchSetService: (service) => dispatch({
        type: SET_SERVICE,
        payload: service
    })
})

export default connect(null, mapDispatchToProps)(ServiceSelect)