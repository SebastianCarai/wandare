<template>
    <div>
        <div v-for="(stage, index) in stages" :key="index" class="accordion">
            <!-- Icon and stage name -->
            <div class="accordion-header" @click="showAccordionInfo(stage.id)">
                <div class="left-accordion">
                    <div>
                        <img class="accordion-icon" v-if="!stage.isPOI" src="../../../../assets/icons/stage-type/accomodation-black.svg" alt="">
                        <img class="accordion-icon" v-if="stage.isPOI" src="../../../../assets/icons/stage-type/poi-black.svg" alt="">
                    </div>
                    <div class="divider mx-3"></div>
                    <div class="stage-name">{{ stage.name }}</div>
                </div>

                <div class="chevron-container">
                    <i :class="isDescriptionShown && activeStage.id == stage.id ? 'rotated' : 'not-rotated'" class="fa-solid fa-chevron-up"></i>
                </div>
            </div>

            <!-- Active description -->
            <div v-if="isDescriptionShown && activeStage.id == stage.id" class="description">
                {{ activeStage.description }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        stages: Array
    },
    data(){
        return{
            activeStage: {},
            isDescriptionShown: false,
        }
    },
    methods:{
        showAccordionInfo(stageId){
            this.stages.forEach(stage => {
                if(stageId == stage.id){
                    if(this.isDescriptionShown && stageId == this.activeStage.id){
                        this.isDescriptionShown = false
                        return
                    }
                    this.activeStage = stage
                    this.isDescriptionShown = true
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.accordion{
    border: 1px solid $black;
    padding: 16px;
    border-radius: 20px;
    margin-top: 16px;
}

.accordion-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $black;
    cursor: pointer;

    .left-accordion{
        display: flex;
        align-items: center;

        .accordion-icon{
            width: 30px;
        }

        .divider{
            width: 2px;
            height: 50px;
            background-color: $black;
        }

        .stage-name{
            font-size: 18px;
            font-family: 'Raleway';
            font-weight: 800;
        }
    }

    .chevron-container{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 1px solid $black;
        display: flex;
        justify-content: center;
        align-items: center;

        .rotated{
            transform: rotate(180deg);
            transition: transform .5s;            ;
        }

        .not-rotated{
            transform: rotate(0deg);
            transition: transform .5s;
        }
    }
}

.description{
    font-family: 'Poppins';
    font-size: 14px;
    margin-top: 16px;
}


</style>