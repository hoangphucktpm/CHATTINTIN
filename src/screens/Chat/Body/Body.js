import { ScrollView, Text, View } from "react-native";
import React, { Component } from "react";
import styles from "./StyleBody";
import MessageItem from "./MessageItem";
import MyMessagaItem from "./MyMessagaItem";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { faker } from "@faker-js/faker";
import ChatWithLink from "../../../components/ChatWithLink";
import MessRecalled from "../../../components/MessRecalled";
import PinMess from "../../../components/PinMess";

function Body({ id, owner }) {
  const { messages } = useSelector((state) => state.chat);
  //   const userState = useSelector(state => state.user);
  //   const dispatch = useDispatch();
  //   var count = 0;

  const { user } = useSelector((state) => state.auth);

  return (
    <View style={{ flex: 1 }}>
      <PinMess />
      <ScrollView style={styles.container}>
        {messages.map((e, i) => {
          if (e.fromSelf) {
            return (
              <View key={i}>
                <Text>{e.content}</Text>
                <ChatWithLink
                  title={faker.word.adjective()}
                  desciption={faker.lorem.lines()}
                  image={faker.image.avatar()}
                  url={faker.airline.airline()}
                />
                <MessRecalled />
              </View>
            );
          } else {
            return (
              <MessageItem
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
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
export default Body;
