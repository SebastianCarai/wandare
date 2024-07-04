<template>
  <div class="vue-leaflet-map" >
    <LMap v-if="stages.length > 0"
        @update:zoom="updateZoom" 
        @update:center="updateCenter"
        :center="center ? center : [stages[0].marker.lat, stages[0].marker.long]" 
        :use-global-leaflet="false"
        :zoom="zoom ? zoom : 12"
    >
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        >
        </LTileLayer>
        <l-marker 
            v-for="(stage, index) in stages" :key="index" 
            :lat-lng="[stage.marker.lat, stage.marker.long]"
        >
        <LPopup style="width:278px">
          <h2 class="post-title">{{stage.name}}</h2>
          <ImageSlider :images="stage.imagesUrl"/>
          <p class="description">{{stage.description}}</p>
        </LPopup>
        </l-marker>
    </LMap>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer,LMarker,LPopup,LControlZoom } from "@vue-leaflet/vue-leaflet";
import ImageSlider from '../core_components/ImageSlider.vue';

export default {
    props:{
        stages: Array,
        center : Array,
        zoom : Number
    },
    components: {LMap,LTileLayer,LMarker,LPopup, LControlZoom, ImageSlider},
    methods:{
      updateZoom(zoom){
        this.$emit('zoom-updated',zoom)
      },
      updateCenter(center){
        this.$emit('center-updated',center)
      }
    }
};
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.vue-leaflet-map{
    height:100%; 
    aspect-ratio: 1/1; 
    margin-top:16px; 
    margin-bottom:16px; 
    border-radius: 20px; 
    overflow: hidden; 
    border: 2px solid $black_60;
    
    & *{
        z-index: 0;
    }
}

h2{

}
</style>