import React,{ useRef, useState, useEffect } from 'react'
import { View, PermissionsAndroid, ActivityIndicator, StyleSheet, Button,Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service';

export default function MapviewScreen({route}) {

    const mapViewRef = useRef()
    const custLoc = {
        latitude : parseFloat(route.params.gps.split(",")[0]),
        longitude : parseFloat(route.params.gps.split(",")[1])
    }
    const [currentLoc,setCurrentLoc] = useState(null)
    const [loading,setLoading] = useState(true)


    useEffect( () => {
        async function fetchLocation (){
            setLoading(true)
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition( position => {
                    setCurrentLoc({
                        latitude : position.coords.latitude,
                        longitude : position.coords.longitude
                    })
                    setLoading(false)
                },
                (error) => {
                    setLoading(false)
                    console.log(error.code, error.message);
                    Alert.alert(
                        "Error!",
                        error.message+' Please try again later',
                        [
                            { text: "OK" }
                        ]
                    )
                },
                { timeout: 20000 }
                )
            }else{
                setLoading(false)
                console.log('Permission denied')
            }
        }
        fetchLocation()
    }, [])

    if(loading){
        return (
          <View style={styles.centerView}>
            <ActivityIndicator size="large"  />
          </View>
        )
    }

  return (
    <View style={{ flex: 1 }}>
        <MapView
            ref={mapViewRef}
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: custLoc.latitude,
                longitude: custLoc.longitude,
                latitudeDelta: 0.004757/3,
                longitudeDelta: 0.006866/3,
            }}

            showsUserLocation={true}
            onUserLocationChange={e =>
                setCurrentLoc({
                    latitude : e.nativeEvent.coordinate.latitude,
                    longitude : e.nativeEvent.coordinate.longitude
                })
            }
            onMapReady={() => setTimeout( () => {
                const coords = [custLoc,currentLoc]
                mapViewRef.current.fitToCoordinates( coords, {
                  edgePadding: {
                    bottom: 150,
                    right: 50,
                    top: 150,
                    left: 50,
                  },
                  animated: true,
                });
              }, 300 )}
        >
            <Marker
                title='biz_name'
                coordinate={{
                    latitude: custLoc.latitude,
                    longitude: custLoc.longitude
                }}>
            </Marker>
        </MapView>
        <View style={{position:'absolute',bottom:0}}>
          <Button title={'PIN'}  />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    centerView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})