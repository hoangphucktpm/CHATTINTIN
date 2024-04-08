import { ScrollView, Text, View } from 'react-native';
import React, { Component } from 'react';
import styles from './StyleBody';
import MessageItem from './MessageItem';
import MyMessagaItem from './MyMessagaItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ScrollToBottom  from 'react-scroll-to-bottom';



function Body ({id,owner}) {
    const chatData = useSelector(state => state.chat);
//   const userState = useSelector(state => state.user);
//   const dispatch = useDispatch();
//   var count = 0;

const {user} = useSelector(state => state.auth);

console.log('chatData', chatData);

    return (
      <ScrollView  style={styles.container}>
  
          {
          chatData.chatList.map((e, i)=>{
           
            if(e.fromSelf){
              return <View key={i}>
                <Text>{e.content}</Text>
              </View>
            }
            else{
              return <MessageItem 
              key={count}
              avatar={faker.image.avatar()}
              name={faker.person.firstName()}
              time={faker.date.recent()}
              message={e.content}
              //type={e.type} 
             // owner = {isOwner}
              //_id = {e._id}
              //emoji={emoji}
              />
            }
          })
        } 
      </ScrollView>
    )
  }
export default Body;