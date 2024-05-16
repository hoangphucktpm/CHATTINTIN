import {
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCView,
  mediaDevices,
} from "react-native-webrtc";
import { useSelector } from "react-redux";
import socket from "../../../services/socket";
import styles from "./StyleVideoCall";

const SIGNALING_CHANNEL = "webRTC-signaling";
const CALL_RINGING_STATE = "RINGING";
const CALL_CONNECTED = "CONNECTED";

const VideoCall = ({ route }) => {
  const {
    fullname,
    id,
    image,
    callOut,
    socketIDCaller,
    socketIDCallee,
    callType,
  } = route.params;

  const navigation = useNavigation();

  // settings
  const [isFront, setIsFront] = useState(true);
  const socketIdCallerRef = useRef(socketIDCaller);
  const socketIdCalleeRef = useRef(socketIDCallee);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [state, setState] = useState(CALL_RINGING_STATE);
  const [countTime, setCountTime] = useState(0);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const isCameraPaused = !localStream?.getVideoTracks()[0]?.enabled;
  const [isMicMuted, setIsMicMuted] = useState(false);

  const localStreamRef = useRef(null);

  const pcRef = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    })
  );

  useEffect(() => {
    let interval;
    if (state === CALL_CONNECTED) {
      interval = setInterval(() => setCountTime((c) => c + 1), 1000);
    } else {
      return;
    }
    return () => {
      clearInterval(interval);
    };
  }, [state]);


  useEffect(() => {
    setTimeout(() => {
      startVideoCall();
    }, 3000);
  }, []);

  //  Establishing a webRTC call
  const user = useSelector((state) => state.auth.user);

  const signalingFunc = (type, metadata) => {
    const socketId = callOut
      ? socketIdCalleeRef.current
      : socketIdCallerRef.current;
    const data = {
      connectedUserSocketId: socketId,
      type,
      ...metadata,
    };

    socket.emit(SIGNALING_CHANNEL, data);
  };

  const sendSignalVideoCall = async () => {
    const data = {
      IDCaller: user.phone,
      IDCallee: id,
      callType: callType,
    };

    socket.emit("pre-offer-single", data);
    console.log("sent video call out offer");
  };

  const startLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video:
        callType === "VIDEO_PERSONAL"
          ? {
              facingMode: isFront ? "user" : "environment",
            }
          : false,
    });
    setLocalStream(stream);
    localStreamRef.current = stream;
    stream.getTracks().forEach((track) => {
      pcRef.current.addTrack(track, stream);
    });
  };

  const initiateCall = async () => {
    const offer = await pcRef.current.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: callType === "VIDEO_PERSONAL",
    });
    await pcRef.current.setLocalDescription(offer);
    signalingFunc("offer", { offer });
  };

  const startVideoCall = () => {
    startLocalStream();
    sendSignalVideoCall();
  };

  useMemo(() => {
    if (socketIDCaller && socketIDCaller != "") {
      socketIdCallerRef.current = socketIDCaller;
    }

    if (socketIDCallee && socketIDCallee != "") {
      socketIdCalleeRef.current = socketIDCallee;
    }
  }, [socketIDCaller, socketIDCallee]);

  useEffect(() => {
    socket.on("pre-offer-single-answer", (data) => {
      if (data.preOfferAnswer === "CALL_REJECTED") {
        if (state !== CALL_CONNECTED) {
          navigation.navigate("Home");
        }
      }

      if (data.preOfferAnswer === "CALL_ACCEPTED") {
        socketIdCalleeRef.current = data.socketIDCallee;
        socketIdCallerRef.current = data.socketIDCaller;
        initiateCall();
      }

      if (data.preOfferAnswer === "CALLEE_NOT_FOUND") {
        if (state !== CALL_CONNECTED) {
          navigation.navigate("Home");
        }

      }
    });

    socket.on("pre-offer-single", (data) => {
      if (data.callType === "VIDEO_PERSONAL") {
        if (state === CALL_RINGING_STATE) {
          socketIdCalleeRef.current = data.IDCaller;
          socketIdCallerRef.current = data.IDCallee;
          setState(CALL_CONNECTED);
          startLocalStream();
          initiateCall();
        }
      }

    });

    return () => {
      socket.off("pre-offer-single-answer");
      socket.off("pre-offer-single");

      endCall();
      
    };
  }, []);

  useEffect(() => {
    // Handle ICE candidates
    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        signalingFunc("ice-candidate", { candidate: event.candidate });
      }
    };

    // Handle remote stream
    pcRef.current.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
        setState(CALL_CONNECTED);
      }
    };

    // Handle signaling data
    socket.on(SIGNALING_CHANNEL, async (message) => {
      if (message.type === "offer") {
        try {
          const remoteDesc = new RTCSessionDescription(message.offer);
          await pcRef.current?.setRemoteDescription(remoteDesc);

          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          signalingFunc("answer", { answer });
        } catch (e) {
          console.error(e);
        }
      }

      if (message.type === "answer") {
        try {
          const desc = new RTCSessionDescription(message.answer);
          await pcRef.current?.setRemoteDescription(desc);
        } catch (e) {
          console.error(e);
        }
      }

      if (message.type === "ice-candidate") {
        try {
          const candidate = new RTCIceCandidate(message.candidate);
          // Kiểm tra pcRef.current trước khi gọi addIceCandidate()
          if (pcRef.current) {
            // Kiểm tra PeerConnectionObserver trước khi gọi getPeerConnection()
            if (pcRef.current.getPeerConnection()) {
              await pcRef.current
                .getPeerConnection()
                .addIceCandidate(candidate);
            } else {
              console.error("PeerConnectionObserver is not available.");
            }
          } else {
            console.error("Peer connection is not available.");
          }
        } catch (e) {
          console.error(e);
        }
      }
    });

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      endCall();
    };
  }, []);

  const hanldeEndCall = () => {
    if (state === CALL_CONNECTED) {
      socket.emit("pre-offer-single-answer", {
        ...route.params.data,
        preOfferAnswer: "CALL_REJECTED",
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }

    setTimeout(() => {
      navigation.navigate("Home");
    }, 1000);
    Alert.alert("Thông báo", "Cuộc gọi đã kết thúc");
    endCall();
  };

  const endCall = () => {
    try {
      pcRef.current?.close();
      pcRef.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      setLocalStream(null);
      setRemoteStream(new MediaStream());

      mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks()?.forEach((track) => track.stop());
        })
        .catch((error) => {
          console.error("Error turning off camera and microphone:", error);
        });
    } catch (e) {
      console.error("end call failed", e);
    }
  };

  useMemo(() => {
    if (!callOut && socketIDCallee && socketIDCaller) {
      startLocalStream();
    }
  }, []);

  const flipCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track._switchCamera();
      });
      setIsFront((prev) => !prev);
    } else {
      console.log("No stream");
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraMuted((prevMuted) => !prevMuted);
      console.log("No stream");
    }
  };

  const toggleMic = () => {
    if (localStream) {
      try {
        localStream.getAudioTracks().forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsMicMuted((prevMuted) => !prevMuted); // Đảo ngược trạng thái của microphone
      } catch (error) {
        console.error("Error toggling microphone:", error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị một thông báo
        Alert.alert("Lỗi", "Không thể thay đổi trạng thái microphone.");
      }
    } else {
      console.log("No stream");
    }
  };

  const add = () => {
    Alert.alert("Thông báo", "Chức năng đang phát triển");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {localStream && (
          <RTCView
            objectFit="cover"
            streamURL={localStream.toURL()}
            style={[
              callType === "VIDEO_PERSONAL"
                ? styles.rtcView
                : styles.rtcViewCall,
              isCameraPaused && styles.cameraPaused,
            ]}
          />
        )}
        {callType !== "VIDEO_PERSONAL" && (
          <View style={styles.container}>
            <View style={styles.callerInfo}>
              <Image
                style={styles.avatar}
                source={{
                  uri: callOut
                    ? route.params?.image
                    : route.params?.urlavatar || "https://i.pravatar.cc/100",
                }}
              />
              <Text style={styles.callerName}>{fullname}</Text>
              <Text style={styles.countTime}>
                {state === CALL_RINGING_STATE
                  ? "Đang kết nối..."
                  : "Đã kết nối"}
              </Text>
              <Text>
                {state === CALL_CONNECTED
                  ? `${`0${Math.floor(countTime / 60)}`.slice(
                      -2
                    )}:${`0${Math.floor(countTime % 60)}`.slice(-2)}`
                  : "..."}
              </Text>
            </View>
          </View>
        )}
        {remoteStream && (
          <RTCView
            objectFit="cover"
            streamURL={remoteStream.toURL()}
            style={
              callType === "VIDEO_PERSONAL"
                ? styles.rtcView
                : styles.rtcViewCall
            }
          />
        )}
      </View>
      <View
        style={{
          ...styles.buttonContainer,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#f2f2f2",
          position: "absolute", 
          bottom: 0,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#4CAF50" }}
          onPress={flipCamera}
        >
          <MaterialCommunityIcons
            name="camera-switch"
            size={25}
            color="white"
          />
          <Text style={{ ...styles.iconLabel, color: "white" }}>Đổi cam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: isCameraMuted ? "#f44336" : "#4CAF50",
          }}
          onPress={toggleCamera}
        >
          <MaterialCommunityIcons
            name={isCameraMuted ? "camera-off" : "camera"}
            size={25}
            color="white"
          />
          <Text style={{ ...styles.iconLabel, color: "white" }}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: isMicMuted ? "#f44336" : "#4CAF50",
          }}
          onPress={toggleMic}
        >
          <FontAwesome
            name={isMicMuted ? "microphone-slash" : "microphone"}
            size={25}
            color="white"
          />
          <Text style={{ ...styles.iconLabel, color: "white" }}>Mic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#f44336" }}
          onPress={hanldeEndCall}
        >
          <MaterialCommunityIcons name="phone-hangup" size={25} color="white" />
          <Text style={{ ...styles.iconLabel, color: "white" }}>Kết thúc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#4CAF50" }}
          onPress={add}
        >
          <Entypo name="dots-three-horizontal" size={25} color="white" />
          <Text style={{ ...styles.iconLabel, color: "white" }}>Thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default VideoCall;
