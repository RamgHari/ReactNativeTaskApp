import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}) {
    console.log('navigation', navigation)
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Map',{gps:'8.078355, 77.550668'})}>
        <Text>Check</Text>
    </TouchableOpacity>
  )
}