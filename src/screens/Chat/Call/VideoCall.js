import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
} from 'react-native';

import { RTCView, mediaDevices } from 'react-native-webrtc';

const VideoCall = () => {
  const [stream, setStream] = useState(null);
  const start = async () => {
    if (!stream) {
      let s;
      try {
        s = await mediaDevices.getUserMedia({ video: true });
        setStream(s);
      } catch(e) {
        console.error(e);
      }
    }
  };
  return (
    <>
      <SafeAreaView>
      {
        stream &&
          <RTCView
            streamURL={stream.toURL()}
					/>
      }
      <View>
          <Button
            title = "Start"
            onPress = {start} />
        </View>
      </SafeAreaView>
    </>
  );
};   




export default VideoCall;