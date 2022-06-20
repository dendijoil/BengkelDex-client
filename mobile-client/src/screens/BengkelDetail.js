import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function BengkelDetail(id) {
  console.log(id)
  const [bengkel, setBengkel] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        
      } catch (error) {
        console.log(error)
      }

    })
  }, [])
  return (
    <View>
      <Text>Bengkel Detail</Text>
    </View>
  )
}