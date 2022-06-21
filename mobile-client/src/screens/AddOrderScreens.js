import { VStack, ScrollView, Center, Box, CheckIcon, HStack, Image, Text, Input, Checkbox, Select } from "native-base"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions } from "react-native"
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { URL } from "../constant/listurl";
import axios from "axios";
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

export default function AddOrderScreens() {
  const isFocused = useIsFocused();
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [groupValues, setGroupValues] = useState([]);
  // const [workshop, setWorkshop] = useState({})
  // const [token, setToken] = useState({})

  console.log("masuk");
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
  }, [])


  const handleChange = (id) => {
    // if(!temp.includes(id)){
    //   temp.push(id)
    // } else {
    //   temp.filter(item => item !== id)
    // }
    // console.log(temp);
    console.log(id);
  }

  if (isLoading) {
    return <Text>Loading..</Text>
  }
  return (

    <SafeAreaView>
      <Text>Create Order Form</Text>
      <VStack>
        <Input placeholder="Username"></Input>
        <Text>Order date: {new Date().toISOString().slice(0, 10)}</Text>
        <HStack>
          <Text>
            Payment Type
          </Text>
          <Select minWidth="200" accessibilityLabel="Choose Payment Type" placeholder="Choose Payment Type" >
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
            <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
              {services.map((service, index) => {
                return (
                  <Checkbox value={service.id}>
                    {/* {service.name} */}
                    <HStack justifyContent={"space-between"}>
                      <Text>{service.name}</Text>
                      
                        <Text>{service.price}</Text>
                      
                    </HStack>
                  </Checkbox>
                  // <Box key={index} backgroundColor={"white"} rounded={'md'} p={1} pl={3}>
                  // </Box>
                )
              })}
            </Checkbox.Group>
          </VStack>
        </ScrollView>
      </VStack>

    </SafeAreaView>

  )
}