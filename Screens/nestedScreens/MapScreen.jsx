import { View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
}
