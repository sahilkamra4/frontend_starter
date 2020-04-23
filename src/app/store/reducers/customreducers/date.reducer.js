import { actions } from "react-table"
import { DISPLAY_EDIT_DATE } from "app/store/actions/customactions/date.actions"

const initialState={
    open:false
}

const displayDate=(state=initialState,action)=>{

    switch(action.type){
        case DISPLAY_EDIT_DATE:
            return{
                ...initialState,
                open:true
            }
        default:
            return {
                ...initialState
            }
    }
    
}

export default displayDate