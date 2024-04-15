import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  OverflowMenu,
  Tab,
  TabBar,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const SourcesMessage = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigation = useNavigation();

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
      <Text style={{ color: "white", fontWeight: 600, fontSize: 20 }}>
        Ảnh, file, link đã gửi
      </Text>
    </TouchableOpacity>
  );
  const renderRightActions = () => (
    <TouchableOpacity>
      <Ionicons name="menu" size={20} color={"white"} />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <StatusBar backgroundColor="#0091FF" translucent />
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
            <Text style={{ color: "black", fontWeight: 600, fontSize: 15 }}>
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
            <Text style={{ color: "black", fontWeight: 600, fontSize: 15 }}>
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
            <Text style={{ color: "black", fontWeight: 600, fontSize: 15 }}>
              Theo thời gian
            </Text>
          </TouchableOpacity>
        </View>

        {/* tabs */}
        <TabBar
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          style={{ paddingVertical: 15 }}
        >
          <Tab title="ẢNH" />
          <Tab title="FILE" />
          <Tab title="LINK" />
        </TabBar>
      </View>
    </SafeAreaView>
  );
};

export default SourcesMessage;
