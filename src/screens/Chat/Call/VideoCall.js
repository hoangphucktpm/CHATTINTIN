import {
  MaterialCommunityIcons
} from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MediaStream, RTCIceCandidate, RTCPeerConnection, RTCSessionDescription, RTCView, mediaDevices } from 'react-native-webrtc';
import { useSelector } from 'react-redux';
import socket from '../../../services/socket';
import styles from './StyleVideoCall';

const SIGNALING_CHANNEL = 'webRTC-signaling';

const CALL_RINGING_STATE = "RINGING";
const CALL_CONNECTED = "CONNECTED";


const VideoCall = ({ route }) => {
  const { fullname, id, image, callOut, socketIDCaller, socketIDCallee, callType } = route.params;
  console.log('params: ', route.params);
  const navigation = useNavigation();

  // settings
  const [isFront, setIsFront] = useState(true);

  const socketIdCallerRef = useRef(socketIDCaller);
  const socketIdCalleeRef = useRef(socketIDCallee);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [state, setState] = useState(CALL_RINGING_STATE);
  const [countTime, setCountTime] = useState(0);

  const localStreamRef = useRef(null);

  const pcRef = useRef(new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  }));

  useEffect(() => {
    let interval ;
    if (state === CALL_CONNECTED) {
      let interval = setInterval(() => setCountTime(c => c+1), 1000);
    } else {
      return;
    }

    return () => {
      clearInterval(interval);
    }
  }, [state])

  useEffect(() => {
    setTimeout(() => {
      startVideoCall();
    }, 3000);
  }, []);

  //  Establishing a webRTC call
  const user = useSelector((state) => state.auth.user);

  const signalingFunc = (type, metadata) => {
    const socketId = callOut ? socketIdCalleeRef.current : socketIdCallerRef.current;
    const data = {
      connectedUserSocketId: socketId,
      type,
      ...metadata,
    };

    console.log('sent signaling data', data);
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
  }

  const startLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({ 
      audio: true,
      video: callType === "VIDEO_PERSONAL" ? {
        facingMode: isFront ? 'user' : 'environment',
      } : false,
    });
    setLocalStream(stream);
    localStreamRef.current = stream;
    stream.getTracks().forEach(track => {
      pcRef.current.addTrack(track, stream);
    });
  };

  const initiateCall = async () => {
    const offer = await pcRef.current.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: callType === "VIDEO_PERSONAL" });
    console.log('initited call with offer', offer);
    await pcRef.current.setLocalDescription(offer);
    signalingFunc('offer', { offer });
  };
  
  const startVideoCall = () => {
    startLocalStream();
    sendSignalVideoCall();
  }

  useMemo(() => {
    if (socketIDCaller && socketIDCaller != "") {
      socketIdCallerRef.current  = socketIDCaller;
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
        // Alert.alert("Thông báo", "Người nhận không trực tuyến");
        // endCall();
        // setTimeout(() => {
        //   if (navigation.canGoBack()) {
        //     navigation.goBack();
        //   } else {
        //     navigation.navigate("HOME");
        //   }
        // }, 1000);
      }
    });

    socket.on("pre-offer-single", (data) => {
      console.log("pre-offer-single", data);
    });

    return () => {
      socket.off("pre-offer-single-answer");
      // socket.off("pre-offer-single");
    };
  }, []);

  useEffect(() => {
    // Handle ICE candidates
    pcRef.current.onicecandidate = (event) => {
      console.log('event on candidate event');
      if (event.candidate) {
        signalingFunc("ice-candidate", { candidate: event.candidate });
      }
    };

    // Handle remote stream
    pcRef.current.ontrack = (event) => {
      console.log('ontrack', event);
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
        console.log("Set remote stream");
        
        setState(CALL_CONNECTED);
      }
    };

    // Handle signaling data
    socket.on(SIGNALING_CHANNEL, async (message) => {
      if (message.type === 'offer') {
        try {
          console.log('got offer', message.offer);
          const remoteDesc = new RTCSessionDescription(message.offer);
          console.log('remote description: ', remoteDesc);
          await pcRef.current.setRemoteDescription(remoteDesc);
  
          const answer = await pcRef.current.createAnswer();
          console.log('answering: ', answer);
          await pcRef.current.setLocalDescription(answer);
          signalingFunc('answer', { answer });
        } catch (e) {
          console.error(e);
        }
      }
      
      if (message.type === 'answer') {
        console.log('got answer', message.answer);
        try {
          const desc = new RTCSessionDescription(message.answer);
          console.log('adding remote description', desc);
          await pcRef.current.setRemoteDescription(desc);
          console.log('added remote description');
        } catch (e) {
          console.error(e);
        }
      } 
      
      if (message.type === 'ice-candidate') {
        try {
          console.log('got ice-candidate', user.phone);
          const candidate = new RTCIceCandidate(message.candidate);
          console.log('adding candidate');
          await pcRef.current.addIceCandidate(candidate);
          console.log('added candidate');
        } catch (e) {
          console.error(e);
        }
      }
    });

    // Clean up on component unmount
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
    endCall();
  }

  const endCall = () => {
    try {
      // pcRef.current.close();
      // Close peer connection
      // Stop local stream tracks
      // localStreamRef.current?.getTracks().forEach(track => track.stop());
      // Clear local stream
      setLocalStream(null);
      // Clear remote stream
      setRemoteStream(new MediaStream());
  
      mediaDevices.getUserMedia({ audio: true }) // Requesting only audio track
          .then(stream => {
              // Stream obtained successfully, stop all tracks
              stream.getTracks()?.forEach(track => track.stop());
          })
          .catch(error => {
              console.error('Error turning off camera and microphone:', error);
          });
    } catch (e) {
      console.error('end call failed', e);
    }
  };

  useMemo(() => {
    if (!callOut && socketIDCallee && socketIDCaller) {
      startLocalStream();
    }
  }, []);

  return (
    <View style={{flex: 2}}>
      <View style={{ flex: 1 }}>
        {/* <Button title="Start Call" onPress={startVideoCall} /> */}
        {localStream && <RTCView objectFit='cover' streamURL={localStream.toURL()} style={callType === "VIDEO_PERSONAL" ? styles.rtcView : styles.rtcViewCall} />}
        {(callType !== "VIDEO_PERSONAL") &&    <View style={styles.container}>
        <View style={styles.callerInfo}>
          <Image
            style={styles.avatar}
            source={{uri:  callOut
              ? route.params?.image
              : route.params?.urlavatar || "https://i.pravatar.cc/100",}}
          />
          <Text style={styles.callerName}>{fullname}</Text>
          <Text style={styles.countTime}>
            {state === CALL_RINGING_STATE ? "Đang kết nối..." : "Đã kết nối"}
          </Text>

          <Text>{state === CALL_CONNECTED ? `${`0${Math.floor(countTime/60)}`.slice(-2)}:${`0${Math.floor(countTime%60)}`.slice(-2)}` : '...'}</Text>
        </View>
      </View>}
        {remoteStream && <RTCView objectFit='cover' streamURL={remoteStream.toURL()} style={callType === "VIDEO_PERSONAL" ? styles.rtcView : styles.rtcViewCall} />}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonend} onPress={hanldeEndCall}>
            <MaterialCommunityIcons
              name="phone-hangup"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>
            Kết thúc
          </Text>
        </View>
      </View>
    </View>
  );
};   




export default VideoCall;