import React, { useMemo, useState } from "react";
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Layout, Tab, TabView, TopNavigation } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { A } from "@expo/html-elements";
import { useDispatch } from "react-redux";
import { setViewFullImage } from "../../../redux/chatSlice";
import { ViewImageFullScreen } from "../../../components/ImageFullView";

const SourcesMessage = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  const messages = route.params ?? [];

  const images = useMemo(
    () =>
      messages
        .filter(
          (msg) =>
            (msg.type === "image" || msg.type === "video") &&
            !msg.isRecall &&
            !msg.isRemove
        )
        .flatMap((msg) => msg.content),
    [messages]
  );

  const files = useMemo(
    () =>
      messages
        .filter((msg) => msg.type === "file" && !msg.isRecall && !msg.isRemove)
        .flatMap((msg) => msg.content),
    [messages]
  );

  const links = useMemo(
    () =>
      messages
        .filter((msg) => msg.type === "link" && !msg.isRecall && !msg.isRemove)
        .flatMap((msg) => msg.content),
    [messages]
  );

  const renderBackAction = () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Ionicons name="arrow-back" size={20} color={"white"} />
      <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>
        Ảnh, file, link đã gửi
      </Text>
    </TouchableOpacity>
  );

  const renderRightActions = () => (
    <TouchableOpacity>
      <Ionicons name="menu" size={20} color={"white"} />
    </TouchableOpacity>
  );

  const tabsData = [
    { title: "ẢNH", data: images, type: "image" },
    { title: "FILE", data: files, type: "file" },
    { title: "LINK", data: links, type: "link" },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <TopNavigation
          style={{ backgroundColor: "#0091ff" }}
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Ionicons name="search" size={25} color={"gray"} />
            <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>
              Tìm kiếm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Ionicons name="person-outline" size={25} color={"gray"} />
            <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>
              Người theo dõi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Ionicons name="time-outline" size={25} color={"gray"} />
            <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>
              Theo thời gian
            </Text>
          </TouchableOpacity>
        </View>

        {/* tabs */}
        <TabView selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
          {tabsData.map(({ title, data, type }) => (
            <Tab title={title} key={title} style={{ paddingVertical: 5 }}>
              <Layout style={{ padding: 10 }}>
                <FlatList
                  contentContainerStyle={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                  data={data}
                  renderItem={({ item }) => <Item item={item} type={type} />}
                  keyExtractor={(item, index) => `${title}_${index}`}
                />
              </Layout>
            </Tab>
          ))}
        </TabView>
      </View>
      <ViewImageFullScreen />
    </GestureHandlerRootView>
  );
};

const Item = ({ item, type }) => {
  const dispatch = useDispatch();
  const handleShowFullImage = (uri) => {
    dispatch(
      setViewFullImage({
        show: true,
        data: uri,
      })
    );
  };

  if (type === "image")
    return (
      <TouchableOpacity onPress={() => handleShowFullImage(item)}>
        <Image source={{ uri: item }} width={100} height={100} />
      </TouchableOpacity>
    );

  return (
    <A href={item} style={{ color: "blue" }}>
      {item}
    </A>
  );
};

export default SourcesMessage;
