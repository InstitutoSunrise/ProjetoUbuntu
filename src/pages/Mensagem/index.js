import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, StatusBar} from 'react-native';
import { GiftedChat, Bubble, Send, scrollToBottom, scrollToBottomComponent} from 'react-native-gifted-chat';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Backbuttom from '../../components/Backbutton'

const Mensagem = () => {

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Oi, tudo bem?',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    
    const renderBubble = (props) => {
      return(
      <Bubble
        { ...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#38B6FF',
            padding:10,
            maxWidth: '55%'
          }
        }}
        textStyle={{
          right: {
            color:'#fff',
            fontSize: 14,
          }
        }}
      />
      );
    };

    const renderSend = (props) => {
      return(
        <Send {...props}>
          <View>
            <MaterialCommunityIcons 
            name="send-circle" 
            style={{marginVertical:5,marginHorizontal:5}}
            size={40} 
            color="#0c4a86"/>
          </View>
        </Send>
      );
    }

    const scrollToBottomComponent = () => {
      return(
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
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
            
        >
        </GiftedChat>
      </View>
        
    );
};

export default Mensagem;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center',
      },
    });