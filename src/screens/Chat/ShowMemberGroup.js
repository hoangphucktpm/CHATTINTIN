import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../apis/api";
import { Card, Modal } from "@ui-kitten/components";
import { setGroupDetails, setMemberGroups } from "../../redux/groupSlice";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import socket from "../../services/socket";
import AvatarCustomer from "../../components/AvatarCustomer";

function MemberGroup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const groupDetails = useSelector((state) => state.group.groupDetails);
  const user = useSelector((state) => state.auth.user);
  const members = useSelector((state) => state.group.members);

  const [memberSelected, setMemberSelected] = useState(null);
  const [isRemoveMember, setIsRemoveMember] = useState(false);

  const handlePresentModalPress = useCallback((member) => {
    if (member.ID === user.ID) return navigation.navigate("MyProfile");
    setMemberSelected(member);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const renderBackAction = () => {
    navigation.goBack();
  };

  const handleAppointment = async () => {
    try {
      await api.addCoOwnerToGroup({
        IDConversation: groupDetails.IDConversation,
        IDCoOwner: memberSelected.ID,
      });
      // Alert.alert("Success", "Appointed member as co-owner successfully!");
      socket.emit("load_member_of_group", {
        IDConversation: groupDetails.IDConversation,
      });
      handleCloseModal();
      const dataMembersUpdated = members.map((member) => {
        if (member.ID === memberSelected.ID) {
          return { ...member, isCoOwner: true };
        }
        return member;
      });
      dispatch(setMemberGroups(dataMembersUpdated));
      // navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Error appointing member as co-owner:");
    }
  };
  const handleUnAppointment = async () => {
    try {
      await api.removeCoOwnerFromGroup({
        IDConversation: groupDetails.IDConversation,
        IDCoOwner: memberSelected.ID,
      });
      // Alert.alert("Success", "Unappointed member as co-owner successfully!");
      socket.emit("load_member_of_group", {
        IDConversation: groupDetails.IDConversation,
      });
      handleCloseModal();
      const dataMembersUpdated = members.map((member) => {
        if (member.ID === memberSelected.ID) {
          return { ...member, isCoOwner: false };
        }
        return member;
      });
      dispatch(setMemberGroups(dataMembersUpdated));
      // navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Error unappointing member as co-owner:");
    }
  };

  // const handleBlockMember = () => {};
  const handleRemove = () => {
    if (!memberSelected || !groupDetails || !user) return;
    if (memberSelected.ID === groupDetails.rules.IDOwner) return;
    const data = {
      IDConversation: groupDetails.IDConversation,
      IDUser: user.ID,
      groupMembers: [memberSelected.ID],
    };
    // add alert confirm

    socket.emit("remove_member_from_group", data);
    socket.emit("load_member_of_group", {
      IDConversation: groupDetails.IDConversation,
    });
    const dataMembersUpdated = members.filter(
      (member) => member.ID !== memberSelected.ID
    );

    dispatch(setMemberGroups(dataMembersUpdated));
    dispatch(
      setGroupDetails({
        ...groupDetails,

        groupMembers: groupDetails.groupMembers.filter(
          (mem) => mem !== memberSelected.ID
        ),
      })
    );
    setIsRemoveMember(false);
    handleCloseModal();
    // navigation.goBack();
  };

  const renderItem = () => {
    const handleViewProfile = (item) => {
      navigation.navigate("FriendProfile", item);
    };
    return (
      <View>
        <Text>Thành viên ({members.length})</Text>
        <View style={styles.memberList}>
          {members.map((item, index) => (
            <TouchableOpacity
              onLongPress={() => handlePresentModalPress(item)}
              onPress={() => handleViewProfile(item)}
              key={index}
              style={styles.memberItem}
            >
              <AvatarCustomer
                source={{ uri: item.urlavatar }}
                alt={item.fullname}
                style={styles.avatar}
              />
              <Text style={styles.memberName}>{item.fullname}</Text>
              <Text style={styles.memberRole}>
                (
                {item.ID === groupDetails.rules.IDOwner
                  ? "Trưởng nhóm"
                  : item.isCoOwner
                  ? "Phó nhóm"
                  : "Thành viên"}
                )
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const allowOne = useMemo(() => {
    if (!memberSelected || !groupDetails || !user) return false;
    if (memberSelected.ID === groupDetails.rules.IDOwner) return false;
    let allow = false;
    if (groupDetails.rules.IDOwner === user.ID) {
      allow = true;
    }
    if (groupDetails.rules.listIDCoOwner.includes(user.ID)) {
      allow = true;
    }

    return allow;
  }, [memberSelected, groupDetails, user]);

  const allowTwo = useMemo(() => {
    if (!memberSelected || !groupDetails || !user) return false;
    let allow = true;
    if (groupDetails.rules.listIDCoOwner.includes(memberSelected.ID)) {
      allow = false;
    }

    if (groupDetails.rules.IDOwner === user.ID) {
      allow = true;
    }
    return allow;
  }, [memberSelected, groupDetails, user]);

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={renderBackAction}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Thành viên</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddMemberGroups")}
          >
            <AntDesign name="addusergroup" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>{renderItem()}</View>
        {memberSelected && (
          <BottomSheetModalProvider>
            <View style={styles.container}>
              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
              >
                <BottomSheetView style={styles.contentContainer}>
                  {/* button close */}
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    Thông tin thành viên
                  </Text>

                  {/* user info */}
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 5,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        position: "relative",
                      }}
                    >
                      <AvatarCustomer
                        alt={memberSelected.fullname}
                        source={{ uri: memberSelected.urlavatar }}
                      />
                      {memberSelected.ID === groupDetails.rules.IDOwner && (
                        <Ionicons
                          name="key-sharp"
                          size={24}
                          color="yellow"
                          style={{ position: "absolute", bottom: -8, left: 20 }}
                        />
                      )}
                      <Text style={{ fontSize: 18, fontWeight: 600 }}>
                        {memberSelected.fullname}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <TouchableOpacity>
                        <AntDesign name="phone" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <AntDesign name="message1" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FriendProfile", memberSelected)
                    }
                  >
                    <Text style={{ fontSize: 20 }}>Xem trang cá nhân</Text>
                  </TouchableOpacity>

                  {allowOne && (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                      }}
                    >
                      {groupDetails.rules.IDOwner === user.ID &&
                        (memberSelected.isCoOwner ? (
                          <TouchableOpacity onPress={handleUnAppointment}>
                            <Text style={{ fontSize: 20 }}>
                              Hủy bổ nhiệm làm phó nhóm
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={handleAppointment}>
                            <Text style={{ fontSize: 20 }}>
                              Bổ nhiệm làm phó nhóm
                            </Text>
                          </TouchableOpacity>
                        ))}
                      {/* <TouchableOpacity onPress={handleBlockMember}>
                          <Text style={{ fontSize: 20 }}>Chặn thành viên</Text>
                        </TouchableOpacity> */}
                      {allowTwo && (
                        <TouchableOpacity
                          onPress={() => setIsRemoveMember(true)}
                        >
                          <Text style={{ fontSize: 20, color: "red" }}>
                            Xóa khỏi nhóm
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          </BottomSheetModalProvider>
        )}
      </GestureHandlerRootView>

      <Modal visible={isRemoveMember}>
        <Card disabled={true}>
          <Text>
            Bạn có chắc chắn muốn xóa {memberSelected?.fullname} khỏi nhóm?
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: 20,
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10,
                width: "45%",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "orange",
              }}
              onPress={() => setIsRemoveMember(false)}
            >
              <Text
                style={{
                  color: "orange",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Quay lại
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                width: "45%",
                borderRadius: 10,
                backgroundColor: "red",
              }}
              onPress={handleRemove}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0091ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    padding: 10,
  },
  addButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: "white",
  },
  body: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  memberList: {
    marginTop: 10,
    flexDirection: "column",
    gap: 20,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  memberName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  memberRole: {
    fontSize: 15,
    color: "#333",
  },
  contentContainer: {
    flex: 1,
    gap: 20,
    padding: 30,
  },
});

export default MemberGroup;
