import * as customActions from 'app/store/actions/customactions'
// import { UPLOAD_IMAGE } from 'app/store/actions/customactions'

const initialState={
    file:"",
    status:"",
    tweet:[{
        files:"",
        status:"",
        tweet_thread:1
    }]
}

const upload =(state=initialState,action)=>{
    switch(action.type){
        case customActions.SET_IMAGE:
            return{
                file:action.payload,
                // ...initialState
            }
        case customActions.ADD_SUBTWEET:

            var currentState={...state}
            currentState.tweet.append({
                files:"",
                status:"",
                tweet_thread:action.tweet_num
            
            })

            return {
                
                

            }
            default: {
                return state;
            }
    }

}
export default upload