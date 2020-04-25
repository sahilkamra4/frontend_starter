export const SET_SCHEDULED_TWEETS='SET_SCHEDULED_TWEETS'
// export const GET_SCHEDULED_TWEETS='GET_SCHEDULED_TWEETS'



export function setScheduledTweets(data){

return {
    type:'SET_SCHEDULED_TWEETS',
    value:data
}

}

// export function getScheduledTweets(){
//     return {
//         type:'GET_SCHEDULED_TWEETS'
//     }
// }