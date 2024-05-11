import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';


export default function VideoCall() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
   
    });

   
  const startCall = () => {
  };

  return (
    <View>
    
      <Button title="Start Call" onPress={startCall} />
    </View>
  );
}