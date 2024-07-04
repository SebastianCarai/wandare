<template>
    <div>
        <!-- Add stage input -->
        <div class="input-wrapper">      
            <label class="input-label" for="post-title">Stages</label>
            <div class="input-description">Time to add stages to you itinerary!</div>

            <StagesList :stages="stages" />

            <div class="add-stage-button" @click="$store.commit('chanegStageModalStatus')">
                <div class="">Add stage</div>
                <i class="fa-solid fa-square-plus"></i>
            </div>
        </div>

        <!-- Stage form modal -->
        <StageModal v-if="isStageModalOpen" @modal-changed="$store.commit('chanegStageModalStatus')" />

        
        <label class="input-label mt-5" for="post-title">The post map</label>
        <div class="input-description">Adjust the map zoom</div>
        <PdpMap @zoom-updated="updateMapZoom" @center-updated="updateMapCenter" :stages="stages" />
        
        <!-- Back and next form button -->
        <div class="d-flex justify-content-between">
            <div @click="$store.commit('decreaseFormStep')" class="form-btn">Previous</div>
            <div @click="$store.commit('nextFormStep'); setMapData()" class="form-btn">Next</div>
        </div>
    </div>
</template>

<script>
import PdpMap from '../../pdp/PdpMap.vue';
import StageModal from './stage-modal/StageFormModal.vue';
import StagesList from './stage-modal/StagesList.vue';

export default {
    components:{StageModal, StagesList, PdpMap},
    data(){
        return{
            zoom: 0,
            center: {}
        }
    },
    computed: {
        isStageModalOpen(){
            return this.$store.state.postCreation.isStageModalOpen;
        },
        stages(){
            return this.$store.state.postCreation['postForm'].stages;
        }
    },
    methods:{
        setMapData(){
            localStorage.setItem('mapData', JSON.stringify({
                'zoom' : this.zoom,
                'center' : [this.center.lat, this.center.lng]
            }))
            this.$store.commit('setMapData', { zoom: this.zoom, lat: this.center.lat, long: this.center.lng});
        },
        updateMapZoom(zoom){
            this.zoom = zoom
        },
        updateMapCenter(center){
            this.center = center;
            console.log(this.center);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.add-stage-button{
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border: 1px dashed $black_60;
    cursor: pointer;
    color: $black_60;
    font-family: 'Poppins';
    margin: 16px 0;
    i{
        font-size: 32px;
    }
}
</style>