import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import MessageItem from "../../../components/MessageItem";
import MessageReact from "../../../components/MessageReact";
import { Card, Modal } from "@ui-kitten/components";
import InfoSender from "../../../components/InfoSender";
import ReplyMessage from "../../../components/ReplyMessage";
import AvatarCustomer from "../../../components/AvatarCustomer";

function Body({ messageData, dataSender, isGroup }) {
  const { user } = useSelector((state) => state.auth);

  const [dataModal, setDataModal] = useState({
    show: false,
    data: null,
  });

  console.log(dataSender);

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        data={messageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelf = item.IDSender === user.ID;
          if (item?.isRemove) return null;

          return (
            <InfoSender
              isGroup={isGroup}
              IDSender={item.IDSender}
              isSelf={isSelf}
              key={item.IDConversation}
              dataSender={isGroup ? item : dataSender}
            >
              <ReplyMessage messages={messageData} item={item} isSelf={isSelf}>
                <MessageReact
                  item={item}
                  isSelf={isSelf}
                  setDataModal={setDataModal}
                >
                  <MessageItem item={item} user={user} />
                </MessageReact>
              </ReplyMessage>
            </InfoSender>
          );
        }}
        inverted={true}
      />

      {/* model view reactions */}
      <Modal visible={dataModal.show}>
        <Card disabled={true}>
          <View>
            {dataModal?.data?.map((item) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <AvatarCustomer
                  source={{ uri: item.user }}
                  alt="user-avatar"
                  style={{ width: 50, height: 50 }}
                />
                <Text>{item.icon}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={{
              marginTop: 10,
              width: "100%",
              padding: 5,
              // bg agra blue .5
              backgroundColor: "rgba(0, 148, 255, 0.5)",
              borderRadius: 10,
            }}
            onPress={() =>
              setDataModal({
                show: false,
                data: null,
              })
            }
          >
            <Text
              style={{ color: "white", textAlign: "center", fontWeight: 600 }}
            >
              Đóng
            </Text>
          </TouchableOpacity>
        </Card>
      </Modal>
    </View>
  );
}

export default Body;
