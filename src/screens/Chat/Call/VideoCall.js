import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { MediaStream, RTCIceCandidate, RTCPeerConnection, RTCSessionDescription, RTCView, mediaDevices } from 'react-native-webrtc';
import { useSelector } from 'react-redux';
import socket from '../../../services/socket';

const styles = StyleSheet.create({
  rtcView: {
    width: '100%', //dimensions.width,
    height: '50%', //dimensions.height / 2,
    backgroundColor: 'gray',
  },
});

const SIGNALING_CHANNEL = 'webRTC-signaling';

const VideoCall = ({ route }) => {
  const { fullname, id, image, callOut, socketIDCaller, socketIDCallee } = route.params;
  console.log('params: ', route.params);
  const navigation = useNavigation();

  // settings
  const [isFront, setIsFront] = useState(true);

  const socketIdCallerRef = useRef(socketIDCaller);
  const socketIdCalleeRef = useRef(socketIDCallee);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const pcRef = useRef(new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  }));

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
      callType: "VIDEO_PERSONAL",
    };

    socket.emit("pre-offer-single", data);
    console.log("sent video call out offer");
  }

  const startLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({ 
      audio: true,
      video: {
        facingMode: isFront ? 'user' : 'environment',
      },
    });
    setLocalStream(stream);
    stream.getTracks().forEach(track => {
      pcRef.current.addTrack(track, stream);
    });
  };

  const initiateCall = async () => {
    const offer = await pcRef.current.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true});
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
      if (data.preOfferAnswer === "CALL_REJECTED") navigation.navigate("Home");

      if (data.preOfferAnswer === "CALL_ACCEPTED") {
        socketIdCalleeRef.current = data.socketIDCallee;
        socketIdCallerRef.current = data.socketIDCaller;
        initiateCall();
      }
    });

    socket.on("pre-offer-single", (data) => {
      console.log("pre-offer-single", data);
    });

    return () => {
      socket.off("pre-offer-single-answer");
      socket.off("pre-offer-single");
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
          console.log('got ice-candidate', user.phone, message.candidate);
          const candidate = new RTCIceCandidate(message.candidate);
          console.log('adding candidate', candidate);
          await pcRef.current.addIceCandidate(candidate);
          console.log('added candidate', candidate);
        } catch (e) {
          console.error(e);
        }
      }
    });

    // Clean up on component unmount
    return () => {
      pcRef.current?.close();
      socket.disconnect();
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
    };
  }, []);

  useMemo(() => {
    if (!callOut && socketIDCallee && socketIDCaller) {
      startLocalStream();
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Start Video Call" onPress={startVideoCall} />
      {localStream && <RTCView objectFit='cover' streamURL={localStream.toURL()} style={styles.rtcView} />}
      {remoteStream && <RTCView objectFit='cover' streamURL={remoteStream.toURL()} style={styles.rtcView} />}
    </View>
  );
};   




export default VideoCall;