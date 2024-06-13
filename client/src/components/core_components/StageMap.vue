<template>
  <div style="height:100%; aspect-ratio: 1/1; margin-top:16px; margin-bottom:16px; border-radius: 20px; overflow: hidden">
    <LMap @update:zoom="updateZoom" ref="map" :zoom="zoom" :center="[coordinates.lat, coordinates.long]" :use-global-leaflet="false">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      >
      </LTileLayer>
      <l-marker :lat-lng="[coordinates.lat, coordinates.long]">
      </l-marker>
    </LMap>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer,LMarker,LPopup,LControlZoom } from "@vue-leaflet/vue-leaflet";

export default {
    props:{
        coordinates: Object
    },
    components: {LMap,LTileLayer,LMarker,LPopup, LControlZoom},
    data() {
        return {
            zoom: 13,
        };
    },
    methods:{
      updateZoom(zoom){
        this.zoom = zoom;
        this.$emit('zoom-updated',zoom)
      }
    }
};
</script>

<style></style>