import { VStack, ScrollView, Center, Box, CheckIcon, HStack, Image, Text, Input, Checkbox, Select, Button } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions } from "react-native"
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../constant/listurl";
import axios from "axios";
import LoadingMap from "../components/LoadingMap";
import { useIsFocused } from "@react-navigation/native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@workshop");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}

export default function AddOrderScreens({ navigation }) {
  const isFocused = useIsFocused();
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [checkedState, setCheckedState] = useState([])
  const [paymentType, setPaymentType] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const storage = await getData()
        const { data: response } = await axios({
          method: "GET",
          url: URL + `/workshops/services/${storage.payload.id}`,
        })
        setServices(response)
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [isFocused])

  let checked = []

  const handleChange = (index, id, e) => {
    if (checked.length === 0) {
      checked.push(id)
    } else if (!checked.includes(id)) {
      checked.push(id)
    } else if (checked.includes(id)) {
      checked = checked.filter(item => item !== id)
    }
    setCheckedState(checked)
    console.log(checkedState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = {
        services: checkedState,
        paymentType: paymentType,
        username: username,
      }
      const storage = await getData()
      console.log(input);
      const { data: response } = await axios({
        method: "POST",
        url: URL + `/orders/${storage.payload.id}`,
        headers: {
          access_token: storage.token
        },
        data: input
      })
      navigation.navigate("Home")
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <LoadingMap/>
  }
  return (

    <SafeAreaView>
      <Text>Create Order Form</Text>
      <VStack>
        <Input onChangeText={(e) => setUsername(e)}></Input>
        <Text>Order date: {new Date().toISOString().slice(0, 10)}</Text>
        <HStack>
          <Text>
            Payment Type
          </Text>
          <Select onValueChange={(e) => {
            setPaymentType(e)
          }} minWidth="200" accessibilityLabel="Choose Payment Type" placeholder="Choose Payment Type" >
            <Select.Item label="Cash" value="cash" />
            <Select.Item label="Balance" value="balance" />
          </Select>
        </HStack>
        <ScrollView maxW="300" h="80" _contentContainerStyle={{
          px: "20px",
          mb: "4",
          minW: "72"
        }} backgroundColor={'coolGray.300'}>
          <VStack space={3}>
            {services.map((service, index) => {
              return (
                <Checkbox key={index} value={service.id}
                  onChange={(e) => {
                    handleChange(index, service.id, e)
                  }}>
                  <HStack justifyContent={"space-between"}>
                    <Text>{service.name}</Text>
                    <Text>{service.price}</Text>
                  </HStack>
                </Checkbox>
              )
            })}
          </VStack>
        </ScrollView>
        <Button onPress={handleSubmit}>SUBMIT</Button>
      </VStack>

    </SafeAreaView>

  )
}