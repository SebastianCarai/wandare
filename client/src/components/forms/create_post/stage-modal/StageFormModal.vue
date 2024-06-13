<template>
    <div class="stage-modal-container">

        <!-- Top navbar with close modal icon -->
        <div class="d-flex justify-content-end" v-if="!isStageInfoFormShown">
            <img style="cursor:pointer" @click="$store.commit('chanegStageModalStatus')" src="../../../../assets/icons/burger-menu/close-icon-white.svg" alt="Close modal icon">
        </div>


        <!-- Stage type choise -->
        <div v-if="!isStageInfoFormShown">
            <h3 class="post-title modal-title mb-3">Choose stage type</h3>

            <div class="options-box">

                <div class="options-card" @click="updateStageInfo(true)">
                    <img src="../../../../assets/icons/stage-type/poi.svg" alt="Accomodation icon">
                    Point of Interest
                </div>
                <div class="options-card" @click="updateStageInfo(false)">
                    <img src="../../../../assets/icons/stage-type/accomodation.svg" alt="Accomodation icon">
                    <div>Accomodation</div>
                </div>

            </div>
        </div>

        <!-- Stage Info form -->
        <StageInfoForm @stage-created="createStage" @update-stage="updateStageInfo" v-if="isStageInfoFormShown" />
    </div>
</template>

<script>
import StageInfoForm from './StageInfoForm.vue';

export default {
    components:{StageInfoForm},
    data(){
        return{
            isStageInfoFormShown: false,
            stage:{}
        }
    },
    computed:{
        postForm(){
            return this.$store.state.postCreation.postForm
        },
        stages(){
            return this.$store.state.postCreation['postForm'].stages
        }
    },
    methods:{
        // Reset the stage info every time the modal is on the first page
        // When the user clicks the stage type create the stage
        updateStageInfo(stageType){
            this.stage = {};

            if(stageType){
                this.stage.id= this.postForm.stages.length + 1;
                this.stage.isPOI = stageType;
            }

            this.isStageInfoFormShown = !this.isStageInfoFormShown;
        },
        createStage(stageInfo){
            const {address, marker, images, description} = stageInfo;

            this.stage.name = address;
            this.stage.marker = marker;
            this.stage.images = images
            this.stage.description = description

            

            this.$store.commit('addStage', this.stage);

            localStorage.removeItem('stages');
            localStorage.setItem('stages', JSON.stringify(this.stages));
            console.log(this.$store.state.postCreation['postForm']);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.stage-modal-container{
    background-color: $black_60;
    color: white;
    position: absolute;
    max-height: 600px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: calc(100% - 48px);
    max-width: 400px;
    padding: 24px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    overflow-y: auto;

    &::-webkit-scrollbar{
        display: none;
    }

    .modal-title{
        text-align: center;
        color: $white !important;
    }

    .options-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .options-card{
            border: 1px solid $white;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 75%;
            padding: 24px 0;
            margin: 8px 0;
            font-size: 18px;
            font-family: 'Poppins';
            cursor: pointer;
            color: $white;

            img{
                width: 100px;
                margin-bottom: 16px;
            }            
        }
    }
}
</style>