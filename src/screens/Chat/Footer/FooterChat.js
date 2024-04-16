import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  MaterialIcons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";
import useSpeechRecognition from "../../../redux/hook";
import AudioRecord from "react-native-audio-record";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import styles from "./StyleFooter";
import socket from "../../../services/socket";
import { Buffer } from "buffer";
const CHUNK_SIZE = 1024 * 1024;

function FooterChat({ ID }) {
  const [text, setText] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const { conversation } = useSelector((state) => state.conversation);
  console.log(conversation);

  // if (!conversation.length) return;
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

  // send image
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
        base64: true,
      });

      if (!result.canceled) {
        const image = result.assets.flatMap((img) =>
          Buffer.from(img.base64, "base64")
        );

        const data = {
          IDSender: user.ID,
          image,
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

  // send video
  const handleUploadVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: true,
        quality: 1,
        base64: true,
      });

      let videos = [];
      if (!result.canceled) {
        for (const asset of result.assets) {
          const fileUri = asset.uri;
          const base64String = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const videoData = Buffer.from(base64String, "base64");
          videos.push(videoData);
        }
      } else {
        console.log("Video selection cancelled");
      }
      const data = {
        IDSender: user.ID,
        video: videos,
        IDConversation,
      };
      socket.emit("send_message", data);
    } catch (error) {
      console.error("Error picking Video:", error);
      alert("Error picking Video");
    }
  };

  // send document
  const handlePickDoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        type: "application/*",
      });

      const fileList = [];
      if (!result.canceled) {
        for (const asset of result.assets) {
          const fileSize = asset.size;
          let position = 0;

          const chunkSize = Math.min(CHUNK_SIZE, fileSize - position);
          const chunk = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
            length: chunkSize,
            position,
          });

          fileList.push({
            mimeType: asset.type,
            content: Buffer.from(chunk, "base64"),
            fileName: asset.name,
          });
        }
      } else {
        console.log("Document selection cancelled");
      }
      const data = {
        IDSender: user.ID,
        fileList,
        IDConversation,
      };

      // console.log(data.fileList.length)
      socket.emit("send_message", data);
    } catch (error) {
      console.error("Error picking document:", error);
      alert("Error picking document");
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
            onPressIn={() => setShowIcon(false)}
          />
        </View>
        <View style={styles.footer_Right}>
          <TouchableOpacity onPress={handlePickDoc}>
            <SimpleLineIcons name="link" size={24} color="#0091ff" />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={isRecording ? stopRecording : startRecording}
            onPress={handleUploadVideo}
          >
            <MaterialIcons name="video-library" size={24} color="#0091ff" />
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
