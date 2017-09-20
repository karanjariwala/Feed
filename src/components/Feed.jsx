/*global FlockDupe:true*/
/*eslint no-undef: "error"*/

import React from 'react';

import Post from './Post.jsx'

// import FlockDupe from '../flockdupe.js'

class Feed extends React.Component{
  state={
    posts:[],
    users:[],
    sortBy:'Time'
  };
  componentDidMount(){

    if(!localStorage.getItem('posts')){
      localStorage.setItem('posts',JSON.stringify([]))
    }
    if(!localStorage.getItem('users')){
      localStorage.setItem('users',JSON.stringify([]))
    }

    if(JSON.parse(localStorage.getItem('posts')).length>0){

      const posts=JSON.parse(localStorage.getItem('posts'))
        console.log('here',posts)
      this.setState({posts})
  }
    if(JSON.parse(localStorage.getItem('users')).length>0){
      const users=JSON.parse(localStorage.getItem('users'))
        console.log('here',users)
      this.setState({users})
    }
    else{
      const users=FlockDupe.getUsers();
      localStorage.setItem('users',JSON.stringify(users))

      this.setState({users})
    }

     window.addEventListener('post',(e)=>{
       if(e.detail){
       let posts=JSON.parse(localStorage.getItem('posts'))
         console.log('here',posts)
         let edited=false;
         if(posts.length>0&&e.detail){
           for(let i=0;i<posts.length;i++){
             if(posts[i].id===e.detail.id)
             {
               edited=true;
               break;
             }
           }
         }
      let post={...e.detail, edited, like:0}
       posts=[...posts,post]
       localStorage.setItem('posts',JSON.stringify(posts))
       this.setState({posts})
     }
     })

  }

  handleToggle=()=>((this.state.sortBy==='Time')?this.setState({sortBy:'Like'}):this.setState({sortBy:'Time'}));


  handleClick=(type,id,userId)=>{
    const newPosts=this.state.posts.map((post)=>{
      console.log(post)
      if(post.id==id&&post.userId===userId){
        if(type==='disLike'&&post.like>0){
        return {...post,like:post.like-1}
      }
      if(type==='like'){
      return {...post,like:post.like+1}
    }
  }
    return {...post}
    })
    localStorage.removeItem('posts');
    localStorage.setItem('posts',JSON.stringify(newPosts))
    this.setState({posts:newPosts})

  }

getDateTime=(lastEdited)=>{
  const date= new Date(lastEdited);
  return `Date: ${date.getDate()}/${date.getMonth()}/${date.getYear()}- Time: ${date.getHours()}Hr,${date.getMinutes()}Mins, ${date.getSeconds()} Secs`
}
getUser=(id)=>this.state.users.filter((user)=>user.id===id)[0]

renderPost=()=>{

  console.log(this.state.users, this.state.posts)
  let posts= this.state.posts;
  if(this.state.posts.length>0){
  if(this.state.sortBy==='Time'){
  posts.sort((a,b)=>new Date(a.lastEdited) - new Date(b.lastEdited))}
  else{posts.sort((a,b)=>b.like-a.like)}
}
  return ( <ul>
      {posts.length>0? posts.map((post, i)=><Post
        key={i}
        id={post.id}
        userName={this.getUser(post.userId).name}
        userImg={this.getUser(post.userId).profileUrl}
        text={post.text}
        lastEdited={this.getDateTime(post.lastEdited)}
        edited={post.edited}
        like={post.like}
        handleClick={this.handleClick}
        userId={post.userId}
        />

    ): (<p>...Loading</p>)}
  </ul>
  )
}


  render(){
    return (
      <div>
        <button style={{width:'500px', height:'50px' }} onClick={this.handleToggle}>last edited</button>
        <button  style={{width:'500px', height:'50px' }} onClick={this.handleToggle}>Likes</button>
          <br/>
        <p>sorting by {this.state.sortBy}</p>
        <hr/>
      {this.renderPost()}
    </div>
    )
  }

}

export default Feed
