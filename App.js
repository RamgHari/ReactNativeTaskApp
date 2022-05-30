import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

export default function App() {
  return (
    <MapView
    style={{ flex: 1}}
    provider={PROVIDER_GOOGLE}
    mapType='standard'
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    showsMyLocationButton={true}
    showsCompass={true}
>
   <Marker
       coordinate={{ latitude: 33.7872131, longitude: -84.381931 }}
       title='Flatiron School Atlanta'
       description='This is where the magic happens!'
    >
    </Marker>
  </MapView>
  )
}