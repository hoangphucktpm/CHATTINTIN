import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Text,
  Platform,
} from "react-native";
import {
  MaterialIcons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setMessages } from "../../../redux/chatSlice";
import PropTypes from "prop-types";
import useSpeechRecognition from "../../../redux/hook";
import axios from "axios";
import AudioRecord from "react-native-audio-record"; // Import AudioRecord
// import RNFS from 'react-native-fs'; // Import RNFS
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import styles from "./StyleFooter";
import socket from "../../../services/socket";

function FooterChat({ ID }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const chatData = useSelector((state) => state.room);
  const { conversation } = useSelector((state) => state.conversation);

  if (!conversation.length) return;
  const IDConversation = conversation.find(
    (convers) => convers.IDReceiver === ID
  )?.IDConversation;

  const { transcript, startRecording, stopRecording, isRecording } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  const user = useSelector((state) => state.auth.user);

  const sendMessageSocket = async () => {
    if (!text) return;
    const data = {
      IDSender: user.ID,
      textMessage: text,
      fromSelf: true,
      IDConversation,
    };

    socket.emit("send_message", data);
    setText("");
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
      });

      if (!result.canceled) {
        const image = result.assets.flatMap((img) => img.base64);
        const data = {
          IDSender: user.ID,
          image,
          fromSelf: true,
          IDConversation,
        };
        socket.emit("send_message", data);

        // await uploadImage(formData);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image");
    }
  };
  const handleUploadVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
      });

      if (!result.canceled) {
        const video = await Promise.all(
          result.assets.map(async (asset) => {
            const fileUri = asset.uri;
            const base64String = await FileSystem.readAsStringAsync(fileUri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            return base64String;
          })
        );

        const data = {
          IDSender: user.ID,
          video,
          fromSelf: true,
          IDConversation,
        };

        socket.emit("send_message", data);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Error picking image");
    }
  };

  const stop = async () => {
    const audioFile = await AudioRecord.stop();
    console.log("audioFile", audioFile);

    // Save the audio file to the device's storage
    const destPath = RNFS.DocumentDirectoryPath + "/test.wav";
    RNFS.moveFile(audioFile, destPath)
      .then(() => console.log("Audio file saved successfully"))
      .catch((err) => console.log("Error saving audio file: ", err));
  };

  const handlePressIcon = () => {
    setShowIcon(true);
  };

  const handlePickDoc = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });
    console.log(result);
    if (result.type === "success") {
      // socket.emit("send-message", {
      //   IDConversation: user.IDConversation,
      //   content: result.uri,
      //   type: "document",
      // });
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={[styles.container]}>
        <View style={styles.foorter_left}>
          <MaterialIcons
            name="insert-emoticon"
            size={24}
            color="#0091ff"
            onPress={handlePressIcon}
          />

          <TextInput
            value={text}
            onChangeText={(x) => setText(x)}
            style={styles.input_Message}
            placeholder="Nhập tin nhắn..."
            onPressIn={() => setShowIcon(false)}
          />
        </View>
        <View style={styles.footer_Right}>
          <TouchableOpacity
            // onPress={isRecording ? stopRecording : startRecording}
            onPress={handlePickDoc}
          >
            <MaterialIcons
              name="video-library"
              // name={isRecording ? "keyboard-voice" : "keyboard-voice"}
              size={24}
              color="#0091ff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <SimpleLineIcons name="picture" size={24} color="#0091ff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessageSocket}>
            <FontAwesome name="send" size={24} color="#0091ff" />
          </TouchableOpacity>
        </View>
        {transcript && <Text>{transcript}</Text>}
      </View>
      {showIcon ? (
        <View style={{ height: 300 }}>
          <EmojiSelector
            category={Categories.symbols}
            onEmojiSelected={(emoji) => setText((prev) => prev + emoji)}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

FooterChat.propTypes = {
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
};

export default FooterChat;
