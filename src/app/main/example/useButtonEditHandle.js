import { useState } from 'react';


const useButtonEditHandle =(props)=>{


    const [editOpen,setEditOpen]=useState(false)
    const [editTweetIndex,setEditTweetIndex]=useState(0)


const randomFunc =()=>{
    console.log("Rando")
}

const openEditModal=(index)=>{
    setEditTweetIndex(index)
    console.log(editTweetIndex)
    setEditOpen(true)
}

const closeEditModal=()=>{
    setEditOpen(false)
}


    return {
        randomFunc,
        openEditModal,
        closeEditModal,
        editOpen,
        editTweetIndex
    }


}

export default useButtonEditHandle