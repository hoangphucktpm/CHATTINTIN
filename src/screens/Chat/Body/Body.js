import React, { useState } from "react";
import { FlatList, Linking, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "../../../components/MessageItem";
import VideoMessage from "../../../components/VideoMessage";
import { setViewFullImage } from "../../../redux/chatSlice";
import { A } from "@expo/html-elements";
import { format } from "date-fns";
import MessageReact from "../../../components/MessageReact";
import { Avatar, Card, Modal } from "@ui-kitten/components";
import InfoSender from "../../../components/InfoSender";
import ImageMessage from "../../../components/ImageMessage";
import ReplyMessage from "../../../components/ReplyMessage";
import { MaterialIcons } from "@expo/vector-icons";

function Body({ messageData, dataSender, isGroup }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [dataModal, setDataModal] = useState({
    show: false,
    data: null,
  });

  const getItemAlignment = (item) => {
    return item.IDSender === user.ID ? "flex-end" : "flex-start";
  };

  const getItemBackgroundColor = (item) => {
    return item.IDSender === user.ID ? "#0094FF" : "#fff";
  };

  const getItemTextColor = (item) => {
    return item.IDSender === user.ID ? "white" : "black";
  };

  const handleDownload = (url) => {
    Linking.openURL(url);
  };

  const handleShowFullImage = (url) => {
    dispatch(setViewFullImage({ show: true, data: url }));
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelf = item.IDSender === user.ID;
          if (item?.isRemove) return null;
          if (item.isRecall)
            return (
              <InfoSender
                isGroup={isGroup}
                IDSender={item.IDSender}
                isSelf={isSelf}
                key={item.IDConversation}
                dataSender={dataSender}
              >
                <View
                  style={{
                    // margin: 10,
                    alignSelf: getItemAlignment(item),
                    backgroundColor: getItemBackgroundColor(item),
                    borderRadius: 8,
                    marginBottom: 5,
                    maxWidth: "70%",
                    display: "flex",
                    gap: 5,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontStyle: "italic",
                      color: getItemTextColor(item),
                    }}
                  >
                    Tin nhắn đã bị thu hồi
                  </Text>
                </View>
              </InfoSender>
            );

          if (item.type === "image")
            return (
              <InfoSender
                isGroup={isGroup}
                IDSender={item.IDSender}
                isSelf={isSelf}
                key={item.IDConversation}
                dataSender={dataSender}
              >
                <ReplyMessage
                  messages={messageData}
                  item={item}
                  isSelf={isSelf}
                >
                  <MessageReact
                    item={item}
                    isSelf={isSelf}
                    setDataModal={setDataModal}
                  >
                    <TouchableOpacity
                      onPress={() => handleShowFullImage(item.content)}
                      style={{
                        margin: 10,
                        alignSelf: getItemAlignment(item),
                        backgroundColor: getItemBackgroundColor(item),
                        borderRadius: 8,
                        marginBottom: 5,
                        maxWidth: "70%",
                        display: "flex",
                        gap: 5,
                      }}
                    >
                      <ImageMessage url={item.content} />
                    </TouchableOpacity>
                  </MessageReact>
                </ReplyMessage>
              </InfoSender>
            );
          if (item?.type === "video")
            return (
              <InfoSender
                isGroup={isGroup}
                dataSender={dataSender}
                IDSender={item.IDSender}
                isSelf={isSelf}
                key={item.IDConversation}
              >
                <ReplyMessage
                  messages={messageData}
                  item={item}
                  isSelf={isSelf}
                >
                  <MessageReact
                    item={item}
                    isSelf={isSelf}
                    setDataModal={setDataModal}
                  >
                    <View
                      style={{
                        margin: 10,
                        alignSelf: getItemAlignment(item),
                        backgroundColor: getItemBackgroundColor(item),
                        borderRadius: 8,
                        marginBottom: 5,
                        maxWidth: "70%",
                      }}
                    >
                      <VideoMessage uri={item.content} />
                    </View>
                  </MessageReact>
                </ReplyMessage>
              </InfoSender>
            );

          if (item.type === "file") {
            return (
              <InfoSender
                isGroup={isGroup}
                dataSender={dataSender}
                IDSender={item.IDSender}
                isSelf={isSelf}
                key={item.IDConversation}
              >
                <ReplyMessage
                  messages={messageData}
                  item={item}
                  isSelf={isSelf}
                >
                  <MessageReact
                    item={item}
                    isSelf={isSelf}
                    setDataModal={setDataModal}
                  >
                    <View
                      style={{
                        margin: 10,
                        alignSelf: getItemAlignment(item),
                        backgroundColor: getItemBackgroundColor(item),
                        borderRadius: 8,
                        marginBottom: 5,
                        maxWidth: "70%",
                        display: "flex",
                        gap: 5,
                        padding: 5,
                        fontSize: 20,
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcons
                          name="download"
                          size={20}
                          color={item.IDSender === user.ID ? "white" : "black"}
                        />
                        <A
                          href={item.content}
                          style={{
                            color: getItemTextColor(item),
                            textDecorationLine: "none",
                            fontStyle: "italic",
                            fontWeight: 600,
                          }}
                        >
                          Download file
                        </A>
                      </View>
                      <Text style={{ color: getItemTextColor(item) }}>
                        {format(item.dateTime, "HH:mm:s")}
                      </Text>
                    </View>
                  </MessageReact>
                </ReplyMessage>
              </InfoSender>
            );
          }

          if (item.type === "link")
            return (
              <InfoSender
                isGroup={isGroup}
                IDSender={item.IDSender}
                isSelf={item.IDSender === user.ID}
                dataSender={dataSender}
                key={item.IDConversation}
              >
                <ReplyMessage
                  messages={messageData}
                  item={item}
                  isSelf={isSelf}
                >
                  <MessageReact
                    item={item}
                    isSelf={isSelf}
                    setDataModal={setDataModal}
                  >
                    <View
                      style={{
                        margin: 10,
                        alignSelf: getItemAlignment(item),
                        backgroundColor: getItemBackgroundColor(item),
                        borderRadius: 8,
                        marginBottom: 5,
                        maxWidth: "70%",
                        display: "flex",
                        gap: 5,
                        padding: 5,
                        fontSize: 20,
                      }}
                    >
                      <A
                        href={item.content}
                        style={{
                          color: getItemTextColor(item),
                          textDecorationLine: "underline",
                          fontStyle: "italic",
                        }}
                      >
                        {item.content}
                      </A>
                      <Text style={{ color: getItemTextColor(item) }}>
                        {format(item.dateTime, "HH:mm:s")}
                      </Text>
                    </View>
                  </MessageReact>
                </ReplyMessage>
              </InfoSender>
            );

          return (
            <InfoSender
              isGroup={isGroup}
              IDSender={item.IDSender}
              isSelf={isSelf}
              key={item.IDConversation}
              dataSender={dataSender}
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
                <Avatar
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
