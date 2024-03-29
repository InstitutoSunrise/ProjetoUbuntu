import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, StatusBar } from 'react-native';
import { GiftedChat, Bubble, Send, scrollToBottom, scrollToBottomComponent } from 'react-native-gifted-chat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Backbuttom from '../../components/Backbutton'

import { getDatabase, get, ref, onValue, off, update } from 'firebase/database';
import { getAuth } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import db from '../../config/configFirebase';

export default function Mensagem({ navigation, route }) {

  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();

      setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${route.params.chatRoomId}`);
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages, route.params.chatRoomId]);

  const renderMessages = useCallback(
    msgs => {
      return msgs
        ? msgs.reverse().map((msg, index) => ({
          ...msg,
          _id: index,
          user: {
            _id:
              msg.sender === user.uid
                ? user.uid
                : route.params.userName,
            avatar:
              msg.sender === user.uid
                ? user.photoURL
                : route.params.avatar,
            name:
              msg.sender === user.uid
                ? user.uid
                : route.params.userName,
          },
        }))
        : [];
    },
    [
      user.photoURL,
      user.uid,
      route.params.avatar,
      route.params.userName,
    ],
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();

    const snapshot = await get(
      ref(database, `chatrooms/${route.params.chatRoomId}`),
    );

    return snapshot.val();
  }, [route.params.chatRoomId]);

  const onSend = useCallback(
    async (msg = []) => {
      let date = new Date();
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();

      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${route.params.chatRoomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: user.uid,
            createdAt: date,
          },
        ],
      });

      setMessages(prevMessages => GiftedChat.append(prevMessages, msg));
    },
    [fetchMessages, user.uid, route.params.chatRoomId],
  );

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#38B6FF',
            padding: 10,
            maxWidth: '55%'
          }
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 14,
          }
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginVertical: 0, marginHorizontal: 0 }}
            size={45}
            color="#0c4a86" />
        </View>
      </Send>
    );
  }

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome
        name="angle-double-down"
        size={24}
        color="#333" />
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.uid,
        }}
        renderBubble={renderBubble}
        placeholder="Digite Uma Mensagem"
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom={true}
        scrollToBottomComponent={scrollToBottomComponent}
      >
      </GiftedChat>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },
});