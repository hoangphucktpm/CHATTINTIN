import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "../../../components/MessageItem";
import ImageMessage, {
  ViewImageFullScreen,
} from "../../../components/ImageMessage";
import VideoMessage from "../../../components/VideoMessage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  setPopup,
  setViewFullImage,
  updateMessages,
} from "../../../redux/chatSlice";
import { A } from "@expo/html-elements";
import { format } from "date-fns";
import MessageReact from "../../../components/MessageReact";
import { Avatar, Button, Card, Modal } from "@ui-kitten/components";
function Body({ messageData }) {
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
            );

          if (item?.type === "image")
            return (
              <MessageReact
                item={item}
                isSelf={isSelf}
                key={item.IDConversation}
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
            );
          if (item?.type === "video")
            return (
              <MessageReact
                item={item}
                isSelf={isSelf}
                key={item.IDConversation}
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
            );

          if (item?.type === "file")
            return (
              <MessageReact
                item={item}
                isSelf={isSelf}
                key={item.IDConversation}
                setDataModal={setDataModal}
              >
                <TouchableOpacity
                  onPress={() => handleDownload(item.content)}
                  style={{
                    margin: 10,
                    alignSelf: getItemAlignment(item),
                    backgroundColor: getItemBackgroundColor(item),
                    borderRadius: 8,
                    marginBottom: 5,
                    maxWidth: "70%",
                    padding: 5,
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="document"
                    size={50}
                    color={getItemTextColor(item)}
                  />
                  <Text style={{ color: getItemTextColor(item) }}>
                    {item.fileName}
                  </Text>
                  <Text style={{ color: getItemTextColor(item) }}>
                    Tải xuống
                  </Text>
                  <SimpleLineIcons
                    name="cloud-download"
                    size={24}
                    color={getItemTextColor(item)}
                  />
                </TouchableOpacity>
              </MessageReact>
            );

          if (item?.type === "link")
            return (
              <MessageReact
                item={item}
                isSelf={isSelf}
                key={item.IDConversation}
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
            );

          return (
            <MessageReact
              item={item}
              isSelf={isSelf}
              key={item.IDConversation}
              setDataModal={setDataModal}
            >
              <MessageItem item={item} user={user} />
            </MessageReact>
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

// import React, { memo } from "react";
// import { View, FlatList } from "react-native";
// import MessageItem from "../../../components/MessageItem";
// import ImageMessage, {
//   ViewImageFullScreen,
// } from "../../../components/ImageMessage";
// import VideoMessage from "../../../components/VideoMessage";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import { A } from "@expo/html-elements";
// import { format } from "date-fns";
// import { useDispatch, useSelector } from "react-redux";

// const renderItem = ({ item, user }) => {
//   if (item.isRemove || item.isRecall) return null;

//   const getItemAlignment =
//     item.IDSender === user.ID ? "flex-end" : "flex-start";
//   const getItemBackgroundColor = item.IDSender === user.ID ? "#0094FF" : "#fff";
//   const getItemTextColor = item.IDSender === user.ID ? "white" : "black";

//   const handleDownload = (url) => Linking.openURL(url);
//   const handleLongPress = (item) => {
//     if (item.IDSender !== user.ID) return;
//     dispatch(setPopup({ show: true, data: item }));
//   };
//   const handleShowFullImage = (url) =>
//     dispatch(setViewFullImage({ show: true, data: url }));

//   return (
//     <View
//       style={{
//         margin: 10,
//         alignSelf: getItemAlignment,
//         backgroundColor: getItemBackgroundColor,
//         borderRadius: 8,
//         marginBottom: 5,
//         maxWidth: "70%",
//       }}
//     >
//       {item.type === "image" && (
//         <TouchableOpacity
//           onPress={() => handleShowFullImage(item.content)}
//           onLongPress={() => handleLongPress(item)}
//         >
//           <ImageMessage url={item.content} />
//         </TouchableOpacity>
//       )}
//       {item.type === "video" && (
//         <TouchableOpacity onLongPress={() => handleLongPress(item)}>
//           <VideoMessage uri={item.content} />
//         </TouchableOpacity>
//       )}
//       {item.type === "file" && (
//         <TouchableOpacity
//           onLongPress={() => handleLongPress(item)}
//           onPress={() => handleDownload(item.content)}
//         >
//           <Ionicons name="document" size={50} color={getItemTextColor} />
//           <Text style={{ color: getItemTextColor }}>{item.fileName}</Text>
//           <Text style={{ color: getItemTextColor }}>Tải xuống</Text>
//           <SimpleLineIcons
//             name="cloud-download"
//             size={24}
//             color={getItemTextColor}
//           />
//         </TouchableOpacity>
//       )}
//       {item.type === "link" && (
//         <View
//           style={{
//             margin: 10,
//             alignSelf: getItemAlignment,
//             backgroundColor: getItemBackgroundColor,
//             borderRadius: 8,
//             marginBottom: 5,
//             maxWidth: "70%",
//             display: "flex",
//             gap: 5,
//             padding: 5,
//             fontSize: 20,
//           }}
//         >
//           <A
//             onLongPress={() => handleLongPress(item)}
//             href={item.content}
//             style={{
//               color: getItemTextColor,
//               textDecorationLine: "underline",
//               fontStyle: "italic",
//             }}
//           >
//             {item.content}
//           </A>
//           <Text style={{ color: getItemTextColor }}>
//             {format(item.dateTime, "HH:mm:s")}
//           </Text>
//         </View>
//       )}
//       {item.type !== "image" &&
//         item.type !== "video" &&
//         item.type !== "file" &&
//         item.type !== "link" && <MessageItem item={item} user={user} />}
//     </View>
//   );
// };

// const Body = ({ isLoading, messageData }) => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={[...messageData, 1]}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={(item) => renderItem({ item, user })}
//         inverted={true}
//       />
//     </View>
//   );
// };

// export default memo(Body);
