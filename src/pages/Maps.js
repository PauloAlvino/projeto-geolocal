import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Maps({ users }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -14.2350,
        longitude: -51.9253,
        latitudeDelta: 30, 
        longitudeDelta: 30,
      }}
    >
      {users.map(user => (
        <Marker
          key={user.id}
          coordinate={{
            latitude: user.latitude,
            longitude: user.longitude,
          }}
          title={user.name}
          description={`${user.address.street}, ${user.address.number}`}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});