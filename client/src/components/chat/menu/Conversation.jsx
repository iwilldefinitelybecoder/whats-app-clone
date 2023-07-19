import React from "react";
import SortChats from "./SortChats";

const Conversation = ({ user, counts, setCounts,message, setMessage }) => {
  return(
    <>
    <SortChats user = {user} counts={counts} setCounts={setCounts} message={message} setMessage={setMessage} />
    </>
  )
}

export default Conversation;

