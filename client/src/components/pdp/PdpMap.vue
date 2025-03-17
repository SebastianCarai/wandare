<template>
  <div class="vue-leaflet-map" :class="{full: isMapExpanded}">
    <div @click="expandMap" class="expand-map-button">
      <i class="fa-solid fa-expand"></i>
    </div>
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
    data(){
      return{
        isMapExpanded: false
      }
    },
    components: {LMap,LTileLayer,LMarker,LPopup, LControlZoom, ImageSlider},
    methods:{
      updateZoom(zoom){
        this.$emit('zoom-updated',zoom)
      },
      updateCenter(center){
        this.$emit('center-updated',center)
      },
      expandMap(){
        this.isMapExpanded = !this.isMapExpanded;
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
    position: relative;

    &.full{
      height:100vh;
      aspect-ratio: auto;
      width: 100%;
      position: fixed;
      right: 0;
      bottom: 0;
      z-index: 100;
      overflow: visible;
      border: none;
      margin: 0;
    }

    .expand-map-button{
      width: 40px;
      height: 40px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 10px;
      bottom: 16px;
      z-index: 100;
      background-color: white;
      border: 2px solid rgba(0,0,0,0.2);
      border-radius: 4px;
    }
    
    & *{
        z-index: 5;
    }
}
</style>