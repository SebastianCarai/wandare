<template>

    <div class="container-xl">
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <section class="col-12 col-md-9 col-lg-6">

                <h2 class="page-title">Create a post</h2>

                <StepsBar :formStep="formStep" />
                
                <div class="form-wrapper">

                    <FirstStep v-if="formStep === 1" />
                    <StagesStep v-if="formStep === 2" />
                    <ThirdStep v-if="formStep=== 3"  />
                    
                </div>

            </section>
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="create-post" class="d-md-none"/>

        <BurgerMenu/>
    </div>
</template>

<script>
import FirstStep from '../../components/forms/create_post/FirstStep.vue';
import PostCreationFormVue from '../../components/forms/create_post/PostCreationForm.vue';
import StagesStep from '../../components/forms/create_post/StagesStep.vue';
import StepsBar from '../../components/forms/create_post/StepsBar.vue';
import ThirdStep from '../../components/forms/create_post/ThirdStep.vue';

export default {
    components :{
        FirstStep,
        PostCreationFormVue,
        StagesStep,
        ThirdStep,
        StepsBar
    },
    computed: {
        formStep(){
            return this.$store.state.postCreationStep
        }
    }
}
</script>

<style lang="scss" scoped>
.form-wrapper{
    width: 100%;
    max-width: 576px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

// @media only screen and (min-width:768px) and (max-width:991px){
//     .form-wrapper{
//         width: 80%;
//     }
// }

// @media only screen and (min-width:992px){
//     .form-wrapper{
//         width: 50%;
//     }
// }
</style>