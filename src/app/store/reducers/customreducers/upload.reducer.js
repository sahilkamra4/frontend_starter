import * as customActions from 'app/store/actions/customactions'
// import { UPLOAD_IMAGE } from 'app/store/actions/customactions'

const initialState={
    file:"",
    status:"",
    tweet:[{
        files:"",
        status:"",
        tweet_thread:0
    }]
}

const upload =(state=initialState,action)=>{

    console.log(state)
    console.log(action)

    switch(action.type){
        case customActions.SET_IMAGE:{
            return{
                file:action.payload,
                // ...initialState
            }
        }

        case customActions.SET_TWEET:{
            var currentState={...state}
            console.log(currentState)
            var value=action.value
            var thread_index=action.thread_index
            currentState.tweet[thread_index]={
                ...currentState.tweet[thread_index],
                status:value
            }
            var newState={
                ...currentState,
                tweet:currentState.tweet
            }
            
            return newState
        }

        case customActions.ADD_SUBTWEET:{

            var currentState={...state}
            var tweet_index=action.tweet_index
           console.log(state)
           console.log(initialState)
           console.log(action)
           console.log(tweet_index)
            tweet_index=tweet_index+1

            var newTweet={

                files:"ff",
                status:"",
                tweet_thread:tweet_index
            

            }
            var newTweetArr=[]
            console.log(currentState.tweet)
            console.log(typeof currentState.tweet)
            if(tweet_index-1 ==currentState.tweet.length){
                console.log(tweet_index)
                 newTweetArr=currentState.tweet.push(newTweet)
            }
            else{
                var fruits = ["Banana", "Orange", "Apple", "Mango"];
                fruits.splice(2, 0, "Lemon", "Kiwi");
                console.log(fruits)
                fruits.splice(tweet_index, 0, newTweet, "Kiwi");
                console.log(tweet_index)
                console.log(fruits)
                console.log(currentState.tweet)
                currentState.tweet.splice(tweet_index,0,newTweet)
                console.log(currentState.tweet)
            newTweetArr= currentState.tweet
            }
            console.log(newTweetArr)
           var newState=currentState
           newState.tweet=newTweetArr
            console.log(newState)
           // let newState=currentState.tweet.append(newTeet)
            return newState
        }
        default:{
                console.log("This is happening")
                return state;
        }
    }

}
export default upload