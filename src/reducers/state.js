import {SET_BRANCHES, SET_DATE, SET_SELECTED, SET_SERVICE} from "../actions";


export default (state = {
    date : new Date(),
    branches:[],
    service:"",
    selected:null
},{type,payload}) => {
    switch(type){
        case SET_DATE:
            return Object.assign({},
                state,{date:payload})
        case SET_BRANCHES:
            return Object.assign({},
                state,{branches:payload})
        case SET_SELECTED:
            return Object.assign({},
                state,{selected:payload})

        case SET_SERVICE:

        default:
            return state;


    }
}