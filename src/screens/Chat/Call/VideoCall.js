import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';

// import { RTCView, mediaDevices } from 'react-native-webrtc';

const styles = StyleSheet.create({
  rtcView: {
    width: '100%', //dimensions.width,
    height: '100%', //dimensions.height / 2,
    backgroundColor: 'black',
  },
});

const VideoCall = () => {
  // const [stream, setStream] = useState(null);
  // const start = async () => {
  //   if (!stream) {
  //     let s;
  //     try {
  //       s = await mediaDevices.getUserMedia({ video: true });
  //       console.log('stream started');
  //       setStream(s);
  //     } catch(e) {
  //       console.error(e);
  //     }
  //   } else {
  //     console.log('not start stream');
  //   }
  // };
  return (
    <>
      <SafeAreaView>
      <View>
          <Button
            title = "Start"
            onPress = {start} />
        </View>
      {
        stream &&
        <RTCView
          key={1}
          zOrder={2}
          objectFit="cover"
          style={{ ...styles.rtcView }}
          streamURL={stream.toURL()}
        />
      }
      </SafeAreaView>
    </>
  );
};   




export default VideoCall;