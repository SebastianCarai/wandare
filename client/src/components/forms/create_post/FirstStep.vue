<template>
    <div>

        <!-- POST TITLE INPUT -->
        <div class="input-wrapper">        
            <label class="input-label" for="post-title">Choose post title</label>
            <div class="input-description">Where have you been?</div>
            <input 
                v-model="postTitle"
                class="input-field-text" 
                type="text" 
                name="post-title" 
                placeholder="Type here..."
            >
        </div>

        <!-- Image cropper -->
        <ImageCropper :maxImages="5" :thumbnails="croppedImages" @images-cropped="getCroppedImages"/>

        <!-- TRIP DURATION INPUT -->
        <div class="input-wrapper">        
            <label class="input-label" for="duration">Insert trip duration</label>
            <div class="input-description">How long did it last?</div>
            <input v-model="duration" class="input-field-text" type="text" name="duration" placeholder="Type here...">
        </div>


        <!-- Next step btn -->
        <div class="d-flex justify-content-end">
            <div class="form-btn" @click="nextFormStep">Next</div>
        </div>
    </div>
</template>

<script>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import ImageCropper from '../../core_components/ImageCropper.vue'

export default {
    components:{VuePictureCropper, ImageCropper},
    data(){
        return{
            postTitle: this.$store.state.postCreation.postForm.title || '',
            duration: this.$store.state.postCreation.postForm.duration || '',
            croppedImages: this.$store.state.postCreation.postForm.thumbnails || [],
        }
    },
    methods:{
        // Save all info uploaded in this step to the localstorage
        // Update the global state and go to the next form step
        nextFormStep(){
            localStorage.removeItem('firstStep');

            localStorage.setItem('firstStep', JSON.stringify({
                title: this.postTitle,
                thumbnails: this.croppedImages,
                duration: this.duration
            }));

            this.$store.commit('setFirstStepState');

            this.$store.commit('nextFormStep');
        },
        getCroppedImages(base64, files){
            this.croppedImages = base64
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.cropper-wrapper{
    background-color: rgba($color: $black, $alpha: 0.8);
    backdrop-filter: blur(5px);
    overflow: hidden;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    display: flex;
    // padding-left: 8px;
    // padding-right: 8px;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .close-modal-icon{
        position: absolute;
        right: 14px;
        top: 14px;
        color: $white;
        font-size: 30px;
    }

    .cropper-title{
        color: white;
        font-family: 'Poppins';
        margin: 16px 0;
    }

    .cropper-btn{
        all: unset;
        background-color: $main_color;
        color: $white;
        padding: 8px 16px;
        border: .5px solid $white;
        border-radius: 5px;
        margin: 8px;
    }
}
</style>