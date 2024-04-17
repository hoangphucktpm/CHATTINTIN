import React, { useState } from "react";
import { FlatList, Linking, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { A } from "@expo/html-elements";
import { Avatar, Card, Modal } from "@ui-kitten/components";
import InfoSender from "../../../components/InfoSender";
import ImageMessage from "../../../components/ImageMessage";
import MessageItem from "../../../components/MessageItem";
import MessageReact from "../../../components/MessageReact";
import VideoMessage from "../../../components/VideoMessage";

function Body({ messageData, dataSender, isGroup }) {
  const { user } = useSelector((state) => state.auth);

  const [dataModal, setDataModal] = useState({ show: false, data: null });

  const getItemAlignment = (item) =>
    item.IDSender === user.ID ? "flex-end" : "flex-start";

  const getItemBackgroundColor = (item) =>
    item.IDSender === user.ID ? "#0094FF" : "#fff";

  const getItemTextColor = (item) =>
    item.IDSender === user.ID ? "white" : "black";

  const handleDownload = (url) => Linking.openURL(url);

  const handleShowFullImage = (url) =>
    dispatch(setViewFullImage({ show: true, data: url }));

  const renderMessageContent = (item, isSelf) => {
    const alignment = getItemAlignment(item);
    const backgroundColor = getItemBackgroundColor(item);

    if (item?.isRemove) return null;
    if (item.isRecall)
      return (
        <RecallMessage
          item={item}
          alignment={alignment}
          backgroundColor={backgroundColor}
        />
      );

    switch (item?.type) {
      case "image":
        return (
          <ImageMessageContent
            item={item}
            alignment={alignment}
            backgroundColor={backgroundColor}
            isSelf={isSelf}
          />
        );
      case "video":
        return (
          <VideoMessageContent
            item={item}
            alignment={alignment}
            backgroundColor={backgroundColor}
            isSelf={isSelf}
          />
        );
      case "file":
        return <FileMessageContent alignment={alignment} />;
      case "link":
        return (
          <LinkMessageContent
            item={item}
            alignment={alignment}
            backgroundColor={backgroundColor}
            isSelf={isSelf}
          />
        );
      default:
        return (
          <DefaultMessageContent
            item={item}
            alignment={alignment}
            backgroundColor={backgroundColor}
            isSelf={isSelf}
          />
        );
    }
  };

  const RecallMessage = ({ item, alignment, backgroundColor }) => (
    <InfoSender
      isGroup={isGroup}
      IDSender={item.IDSender}
      isSelf={item.IDSender === user.ID}
    >
      <View
        style={{
          alignSelf: alignment,
          backgroundColor,
          borderRadius: 8,
          marginBottom: 5,
          maxWidth: "70%",
        }}
      >
        <Text style={{ fontStyle: "italic", color: getItemTextColor(item) }}>
          Tin nhắn đã bị thu hồi
        </Text>
      </View>
    </InfoSender>
  );

  const ImageMessageContent = ({
    item,
    alignment,
    backgroundColor,
    isSelf,
  }) => (
    <InfoSender isGroup={isGroup} IDSender={item.IDSender} isSelf={isSelf}>
      <MessageReact item={item} isSelf={isSelf} setDataModal={setDataModal}>
        <TouchableOpacity
          onPress={() => handleShowFullImage(item.content)}
          style={{
            alignSelf: alignment,
            backgroundColor,
            borderRadius: 8,
            marginBottom: 5,
            maxWidth: "70%",
          }}
        >
          <ImageMessage url={item.content} />
        </TouchableOpacity>
      </MessageReact>
    </InfoSender>
  );

  const VideoMessageContent = ({
    item,
    alignment,
    backgroundColor,
    isSelf,
  }) => (
    <InfoSender
      isGroup={isGroup}
      dataSender={dataSender}
      IDSender={item.IDSender}
      isSelf={isSelf}
    >
      <MessageReact item={item} isSelf={isSelf} setDataModal={setDataModal}>
        <View
          style={{
            alignSelf: alignment,
            backgroundColor,
            borderRadius: 8,
            marginBottom: 5,
            maxWidth: "70%",
          }}
        >
          <VideoMessage uri={item.content} />
        </View>
      </MessageReact>
    </InfoSender>
  );

  const FileMessageContent = ({ alignment }) => (
    <InfoSender
      isGroup={isGroup}
      dataSender={dataSender}
      IDSender={item.IDSender}
      isSelf={isSelf}
    >
      <InfoSender isGroup={isGroup} IDSender={item.IDSender} isSelf={isSelf} />
    </InfoSender>
  );

  const LinkMessageContent = ({ item, alignment, backgroundColor, isSelf }) => (
    <InfoSender
      isGroup={isGroup}
      IDSender={item.IDSender}
      isSelf={isSelf}
      dataSender={dataSender}
    >
      <MessageReact item={item} isSelf={isSelf} setDataModal={setDataModal}>
        <View
          style={{
            alignSelf: alignment,
            backgroundColor,
            borderRadius: 8,
            marginBottom: 5,
            maxWidth: "70%",
            padding: 5,
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
    </InfoSender>
  );

  const DefaultMessageContent = ({
    item,
    alignment,
    backgroundColor,
    isSelf,
  }) => (
    <InfoSender
      isGroup={isGroup}
      IDSender={item.IDSender}
      isSelf={isSelf}
      dataSender={dataSender}
    >
      <MessageReact item={item} isSelf={isSelf} setDataModal={setDataModal}>
        <View
          style={{
            alignSelf: alignment,
            backgroundColor,
            borderRadius: 8,
            marginBottom: 5,
            maxWidth: "70%",
          }}
        >
          <MessageItem item={item} user={user} />
        </View>
      </MessageReact>
    </InfoSender>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messageData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          renderMessageContent(item, item.IDSender === user.ID)
        }
        inverted={true}
      />
      <Modal visible={dataModal.show}>
        <Card disabled={true}>
          <View>
            {dataModal?.data?.map((item) => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
              backgroundColor: "rgba(0, 148, 255, 0.5)",
              borderRadius: 10,
            }}
            onPress={() => setDataModal({ show: false, data: null })}
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
