import { View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.248141,
          longitude: 31.261665,
          latitudeDelta: 18.1922,
          longitudeDelta: 18.1421,
        }}
      >
        <Marker coordinate={{ latitude: 49.248141, longitude: 31.261665 }} />
      </MapView>
    </View>
  );
}
