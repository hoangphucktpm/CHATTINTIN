import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { mediaDevices, RTCView } from 'react-native-webrtc';
import Peer from 'react-native-peerjs';


const peer = new Peer();

export default function VideoCall() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    peer.on('call', (call) => {
      call.answer(localStream);

      call.on('stream', (stream) => {
        setRemoteStream(stream);
      });
    });

    const startLocalStream = async () => {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setLocalStream(stream);
    };

    startLocalStream();
  }, []);

  const startCall = () => {
    const call = peer.call('other-peer-id', localStream);

    call.on('stream', (stream) => {
      setRemoteStream(stream);
    });
  };

  return (
    <View>
      {localStream && <RTCView stream={localStream} />}
      {remoteStream && <RTCView stream={remoteStream} />}
      <Button title="Start Call" onPress={startCall} />
    </View>
  );
}