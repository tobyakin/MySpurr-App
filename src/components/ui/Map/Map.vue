<template>
  <div>
    <l-map :useGlobalLeaflet="false" :zoom="zoom">
      <l-geo-json :geojson="geojson" :options="geojsonOptions" />
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker :lat-lng="markerLatLng">
        <l-popup>Marker Popup</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import {
  LRectangle,
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
} from "@vue-leaflet/vue-leaflet";

import "leaflet/dist/leaflet.css";

export default {
  data() {
    return {
      zoom: 15,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      iconWidth: 25,
      iconHeight: 40,
      attribution: "© OpenStreetMap contributors",
    };
  },
};
</script>
<style>
.leaflet-container {
  height: 400px !important;
}

.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
  @apply !w-full !rounded !h-[200px];
}
.leaflet-control {
  @apply !z-10;
}
.leaflet-touch .leaflet-bar a {
  @apply !z-10 !w-[20px] !h-[20px] leading-3 p-1 text-[12px];
}
.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  @apply border-[1px];
}
</style>
