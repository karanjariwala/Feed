/*global props:true*/
/*eslint no-undef: "error"*/

import React from 'react';

const Post =({id,userName, userImg, text, lastEdited, edited, like, handleClick, userId})=>(
  <li>
    <b>{userName}</b>
    <img  height="20px" src={userImg} alt='img'/>
    <p>{text}</p>
    <p>{lastEdited}</p>
    <p><b>{edited?'edited':'New'}</b></p>

      <button onClick={()=>handleClick('like', id, userId)}>Like {like}</button>
        <button onClick={()=>handleClick('disLike', id, userId)}>Dis-like</button>
        <br/>
      <hr/>
        <br/>
  </li>
)

export default Post
