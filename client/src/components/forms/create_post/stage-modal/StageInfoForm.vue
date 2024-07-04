<template>
    <div>
        <!-- Top navbar for the Stage info form -->
        <div class="d-flex justify-content-between ">
            <div class="stage-creation-cta" style="cursor:pointer" @click="$emit('update-stage')">Back</div>
            <div class="stage-creation-cta" style="cursor:pointer" @click="createStage">Create Stage</div>
        </div>
        
        <!-- Vue autocomplete input -->
        <div class="input-wrapper stage-input-wrapper">        
            <label class="input-label" for="description">Insert place name</label>
            <div class="input-description">Insert place name and select the suggestion to create a pin on the Map</div>
            <VueGoogleAutocomplete
                ref="address"
                id="map"
                types="establishment"
                classname="form-control"
                placeholder="Type here..."
                v-on:placechanged="getAddressData"
                style="width:300px"
                v-model="stageInfo.address"
            >
            </VueGoogleAutocomplete>
        </div>

        <!-- Map that shows when place is selected -->
        <Map @zoom-updated="setZoom" v-if="isMapShow" :coordinates="stageInfo.marker"/>

        <!-- Image cropper -->
        <ImageCropper :maxImages="3" :isWhite="true" @images-cropped="getCroppedImages" />

        <!-- Stage description input -->
        <div class="input-wrapper stage-input-wrapper">        
            <label class="input-label" for="description">Insert stage description</label>
            <div class="input-description">Tell us more about the stage</div>
            <textarea 
                name="description" 
                class="stage-description-box" 
                placeholder="Type here..."
                rows="10"
                cols="30"
                v-model="stageInfo.description"
            >
            </textarea>
        </div>
        
    </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import ImageCropper from '../../../core_components/ImageCropper.vue';
import Map from '../../../core_components/StageMap.vue';

export default {
    components:{VueGoogleAutocomplete, Map, ImageCropper},
    data: function () {
        return {
        stageInfo:{
            address: '',
            description: '',
            marker:{},
            images:[]
        },
        isMapShow: false,
        };
    },
    methods: {
        // Get data from the Google Autocomplete Input
        // Create marker for the map by passing latitude, longitude, place_id
        // Show map
        getAddressData: async function (addressData, placeResultData, id) {

            const resultData = await placeResultData;
            this.stageInfo.address = resultData.name;

            this.stageInfo.marker = {
                'lat': await addressData.latitude,
                'long': await addressData.longitude,
                'placeID': resultData.place_id
            };

            console.log(this.stageInfo);

            this.isMapShow = true
        },
        // Get images from the image cropper when the images-cropped event is emitted from the ImageCropper component
        getCroppedImages(images){
            this.stageInfo.images = images;
            console.log(this.stageInfo);
        },
        // Update map zoom when the zoom-updated is emitted from the Map component
        setZoom(zoom){
            this.stageInfo.marker.zoom = zoom;
        },
        createStage(){
            this.$store.commit('chanegStageModalStatus');
            this.$emit('stage-created', this.stageInfo);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.input-wrapper div,label{
    color: $white !important;
}

.input-wrapper input,textarea{
    color: $black !important;
}

.stage-creation-cta{
    font-size: 20px;
    text-decoration: underline;
}

.stage-input-wrapper{
    margin-top: 24px;
}

.stage-description-box{
    width: 100%;
    padding: 16px;
    border-radius: 20px;
}
</style>