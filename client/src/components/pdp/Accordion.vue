<template>
    <div>
        <h2 class="text-head">More information</h2>

        <!-- DESCRIPTION -->
        <div class="accordion" v-if="description">
            <!-- Icon and stage name -->
            <div class="accordion-header" @click="showAccordionInfo('description')">
                <div class="left-accordion">
                    <div class="stage-name">Description</div>
                </div>

                <div class="chevron-container">
                    <i :class="isDescriptionShown && activeDescription == 'description' ? 'rotated' : 'not-rotated'" class="fa-solid fa-chevron-up"></i>
                </div>
            </div>

            <!-- Active description -->
            <div v-if="isDescriptionShown && activeDescription == 'description'" class="description">
                {{ description }}
            </div>
        </div>

        <div class="accordion" v-if="whatToWear">
            <!-- Icon and stage name -->
            <div class="accordion-header" @click="showAccordionInfo('what_to_wear')">
                <div class="left-accordion">
                    <div class="stage-name">What to Wear</div>
                </div>

                <div class="chevron-container">
                    <i :class="isDescriptionShown && activeDescription == 'what_to_wear' ? 'rotated' : 'not-rotated'" class="fa-solid fa-chevron-up"></i>
                </div>
            </div>

            <!-- Active description -->
            <div v-if="isDescriptionShown && activeDescription == 'what_to_wear'" class="description">
                {{ whatToWear }}
            </div>
        </div>

        <div class="accordion" v-if="pricing">
            <!-- Icon and stage name -->
            <div class="accordion-header" @click="showAccordionInfo('pricing')">
                <div class="left-accordion">
                    <div class="stage-name">Pricing</div>
                </div>

                <div class="chevron-container">
                    <i :class="isDescriptionShown && activeDescription == 'pricing' ? 'rotated' : 'not-rotated'" class="fa-solid fa-chevron-up"></i>
                </div>
            </div>

            <!-- Active description -->
            <div v-if="isDescriptionShown && activeDescription == 'pricing'" class="description">
                {{ pricing }}
            </div>
        </div>


        <div class="accordion" v-if="requiredDocuments">
            <!-- Icon and stage name -->
            <div class="accordion-header" @click="showAccordionInfo('required_documents')">
                <div class="left-accordion">
                    <div class="stage-name">Required documents</div>
                </div>

                <div class="chevron-container">
                    <i :class="isDescriptionShown && activeDescription == 'required_documents' ? 'rotated' : 'not-rotated'" class="fa-solid fa-chevron-up"></i>
                </div>
            </div>

            <!-- Active description -->
            <div v-if="isDescriptionShown && activeDescription == 'required_documents'" class="description">
                {{ requiredDocuments }}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        description: String,
        pricing : String,
        whatToWear : String,
        requiredDocuments : String
    },
    data(){
        return{
            activeStage: {},
            isDescriptionShown: false,
            activeDescription: ''
        }
    },
    methods:{
        showAccordionInfo(payload){
            if(this.isDescriptionShown && this.activeDescription == payload){
                this.isDescriptionShown = false;
                return
            }
            this.activeDescription = payload;
            this.isDescriptionShown = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.accordion{
    border-top: 1px solid $black;
    border-bottom: 1px solid $black;
    padding: 16px;
    border-radius: 20px;
    margin-top: 16px;
}

.text-head{
    font-family: 'Raleway';
    text-transform: uppercase;
    font-weight: 800;
    font-size: 16px;
    letter-spacing: 4px;
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


</style>