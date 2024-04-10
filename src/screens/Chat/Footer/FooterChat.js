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

import styles from "./StyleFooter";

function FooterChat() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const chatData = useSelector((state) => state.room);
  const { transcript, startRecording, stopRecording, isRecording } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setText(transcript);
    }
  }, [transcript]);

  const sendMessageSocket = () => {
    console.log(text);
    const data = {
      content: text,
      fromSelf: true,
    };
    setText("");
    dispatch(setMessages(data));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      let localUri = result.uri;
      let formData = new FormData();
      let uriParts = localUri.split(".");
      const path = localUri.split("/");
      let fileType = uriParts[uriParts.length - 1];
      let nameFile = path[path.length - 1];
      const _image = {
        uri:
          Platform.OS === "android"
            ? localUri
            : localUri.replace("file://", ""),
        type: `image/${fileType}`,
        name: nameFile,
      };
      formData.append("file", _image);
      axios
        .post(urlUploadFile, formData, {
          headers: {
            authorization: token,
            "Content-type": "multipart/form-data",
          },
        })
        .then((res) => {})
        .catch((err) => {
          alert("Error Upload file");
        });
    } else if (result.cancelled) {
      console.log(result);
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
          />
        </View>
        <View style={styles.footer_Right}>
          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
          >
            <MaterialIcons
              name={isRecording ? "keyboard-voice" : "keyboard-voice"}
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
