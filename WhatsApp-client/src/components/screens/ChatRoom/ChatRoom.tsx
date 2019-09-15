import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { SafeAreaView } from "react-native-safe-area-view";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import TopNavBar from "../../headers/TopNavBar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import styles from "./ChatRoom.styles";

const ChatRoom = ({ id }) => {
  const getMessagesQuery = gql`
    query getMessages($chatId: ID!) {
      chat(chatId: $chatId) {
        id
        name
        picture
        lastMessage {
          id
          content
          createdAt
        }
        messages {
          id
          content
          createdAt
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getMessagesQuery, {
    variables: { chatId: id }
  });

  if (!!loading)
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  console.log("ERROR", error);
  console.log("DATA", data);

  return (
    <ImageBackground
      source={require("../../../../assets/chat-bg.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.wrapper}>
        <TopNavBar
          renderLeft={() => (
            <View style={styles.navLeftContent}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  style={styles.icon}
                  color="white"
                />
              </TouchableOpacity>
              <View style={styles.image}>
                <Image
                  source={{ uri: data.chat.picture }}
                  style={styles.thumbnail}
                />
              </View>
              <View style={styles.navTitleContainer}>
                <TouchableOpacity>
                  <Text style={styles.navTitle}>{data.chat.name}</Text>
                </TouchableOpacity>
                <Text style={styles.navLastSeen}>Last Seen</Text>
              </View>
            </View>
          )}
          renderRight={() => (
            <View style={styles.navRightContent}>
              <FontAwesome
                name="video-camera"
                size={24}
                style={styles.icon}
                color="white"
              />
              <MaterialIcons
                name="call"
                size={24}
                style={styles.icon}
                color="white"
              />
              <Entypo
                name="dots-three-vertical"
                size={24}
                color="white"
                style={styles.icon}
              />
            </View>
          )}
        />
      </View>
      {!!data.messages && <MessageList />}
      <MessageInput />
    </ImageBackground>
  );
};

export default ChatRoom;
