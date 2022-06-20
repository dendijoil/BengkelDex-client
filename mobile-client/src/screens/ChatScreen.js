import * as TalkRn from '@talkjs/expo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { URL } from '../constant/listurl';

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export default function ChatScreen({ route }) {

  const [sender, setSender] = useState({});
  const [reciver, setReciver] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let condition;
        const data = await getData("customer")
        if(data.payload.role === "customer"){
          condition = 'workshops'
        } else {
          condition = 'customers'
        }
        if(!data){
          console.log('fetch wkshp');
          const workshop = await getData("workshop")
          setSender(workshop)
        }

        const {data: reciv} = await axios({
          method: "get",
          url: `${URL}/${condition}/${route.params.id}`,
        })

        setReciver(reciv)
        setSender(data.payload)

      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  
  // console.log(sender, 'sendersssssss');
  // console.log(reciver.TalkJSID, 'reciversssssss');
  if (!sender.TalkJSID) {
    return <Text>Loading..</Text>
  }
  if (!reciver.TalkJSID) {
    return <Text>Loading reciver</Text>
  }


  const me = {
    id: '11111111111',
    name: sender.name,
    email: 'alice@example.com',
    photoUrl: 'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg',
    welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };

  const other = {
    id: '222222222',
    name: reciver.name,
    email: 'Sebastian@example.com',
    photoUrl: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    welcomeMessage: `Hallo ${sender.name}! Selamat datang di ${reciver.name} :) . Ada yang bisa di bantu ?`,
    role: 'default',
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    <TalkRn.Session appId='t3Kyi1jS' me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
  );

}