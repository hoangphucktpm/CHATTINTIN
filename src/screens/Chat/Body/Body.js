// import { ScrollView, Text, View } from 'react-native';
// import React, { Component } from 'react';
// import styles from './StyleBody';
// import MessageItem from './MessageItem';
// import MyMessagaItem from './MyMessagaItem';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import ScrollToBottom  from 'react-scroll-to-bottom';
// function Body ({id,owner}) {
//   const roomState = useSelector(state => state.room);
//   const userState = useSelector(state => state.user);
//   const dispatch = useDispatch();
//   var count = 0;
//     return (
//       <ScrollView  style={styles.container}>
//         {
          
//           roomState.lstChat.map((e)=>{
//             count++;
//             const isMyMessage = e.user._id === userState.user._id ? true : false;
//             const isOwner =  e.user._id === owner ? true : false;
//             let emoji ; 
//             if( e.reacts != null){
//               e.reacts.map((x)=>{
//                 emoji = x.emoji;
//               })
//             }
//             if(isMyMessage){
//               return <MyMessagaItem 
//               key={count}
//               avatar={e.user.avatar}
//               name={e.user.email}
//               time={e.createdAt}
//               message={e.content}
//               type={e.type} 
//               owner = {isOwner}
//               _id = {e._id}
//               emoji={emoji}
//               />
//             }
//             else{
//               return <MessageItem 
//               key={count}
//               avatar={e.user.avatar}
//               name={e.user.email}
//               time={e.createdAt}
//               message={e.content}
//               type={e.type}
//               owner = {isOwner}
//               _id = {e._id}
//               emoji={emoji}
//               />
//             }
//           })
//         }
//       </ScrollView>
//     )
//   }
// export default Body