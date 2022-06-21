import * as TalkRn from '@talkjs/expo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { URL } from '../constant/listurl';
import { useNavigation } from '@react-navigation/native';

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
}

export default function ChatList() {

  // console.log(navigate)
  const navigation = useNavigation()
  const [sender, setSender] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [reciver, setReciver] = useState({});
  // console.log(route.params.data);
  useEffect(() => {
    (async () => {
      try {
        const data = await getData("customer")
        if(!data){
          const workshop = await getData("workshop")
          setSender(workshop.payload)
          // console.log(sender, '<<>>');
        } else {
          setSender(data.payload)
        }
        setIsLoading(false)
        // setReciver(route.params.data)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  
  console.log(sender.TalkJSID, 'sendersssssss');
  // console.log(reciver.TalkJSID, 'reciversssssss');
  if (isLoading) {
    return <Text>Loading..</Text>
  }
  // if (!reciver.TalkJSID) {
  //   return <Text>Loading reciver</Text>
  // }


  const me = {
    id: sender.TalkJSID,
    name: sender.name,
    email: 'alice@example.com',
    photoUrl: sender.imgUrl,
    welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  };

  function navigateToChat(props) {
    console.log(props.others[0].id, "<<<<<<<")
    navigation.navigate("ChatScreen", { id: sender.id, data: {
      TalkJSID: props.others[0].id,
      name: props.others[0].name,
      imgUrl: props.others[0].photoUrl
    }})
  }

  return (
    <TalkRn.Session appId='t3Kyi1jS' me={me}>
      <TalkRn.ConversationList onSelectConversation={navigateToChat} />
    </TalkRn.Session>
  );

}