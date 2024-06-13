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

        <!-- Back and next form button -->
        <div class="d-flex justify-content-between">
            <div @click="$store.commit('decreaseFormStep')" class="form-btn">Previous</div>
            <div @click="$store.commit('nextFormStep')" class="form-btn">Next</div>
        </div>
        
    </div>
</template>

<script>
import StageModal from './stage-modal/StageFormModal.vue';
import StagesList from './stage-modal/StagesList.vue';

export default {
    components:{StageModal, StagesList},
    computed: {
        isStageModalOpen(){
            return this.$store.state.postCreation.isStageModalOpen;
        },
        stages(){
            return this.$store.state.postCreation['postForm'].stages;
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