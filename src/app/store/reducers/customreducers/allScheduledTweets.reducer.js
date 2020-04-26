import { SET_SCHEDULED_TWEETS} from "app/store/actions/customactions/allScheduledTweets.actions"

const initialState=[0]



const scheduledTweets =(state=initialState,action)=>{

    switch(action.type){
    case SET_SCHEDULED_TWEETS:
        console.log("Reached scheduled tweets")
        console.log(action.value)

        // var newState=[...action.value] || [0]
        var newState=[...action.value] 
        console.log(newState)
        if(newState){
            // newState=[0]
        }
        else{
            newState=initialState
        }


        return newState
    default:
        return state
    }
    
        

}



export default scheduledTweets