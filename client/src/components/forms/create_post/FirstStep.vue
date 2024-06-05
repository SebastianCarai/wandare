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

        <!-- IMAGE INPUT -->
        <div class="input-wrapper">
            <div class="input-label">Choose post thumbnails</div>
            <div class="input-description">Pick at least one image (max 5) to display in the post preview </div>
            <div class="file-input-wrapper">
                <div v-for="(image,index) in croppedImages" :key="index" class="form-thumb-preview">
                    <img :src="image" alt="">
                </div>
                <label v-if="croppedImages.length < 5" class="file-label" for="images">
                    <i class="fa-solid fa-square-plus"></i>
                    <input @change="getImageData" id="images" type="file" name="images" accept="image/*" required multiple hidden>
                </label>
            </div>

        </div>


        <!-- CROPPER -->
        <div v-if="isShowModal">
            <div class="cropper-wrapper">
                <i @click="isShowModal = false" class="fa-regular fa-circle-xmark close-modal-icon"></i>

                <div class="cropper-title">Crop your image</div>
                <VuePictureCropper
                    :boxStyle="{
                        width: '100%',
                        backgroundColor: '#f8f8f8',
                        margin: 'auto',
                    }"
                    :img="pic"
                    :options="{
                        viewMode: 1,
                        dragMode: 'crop',
                        aspectRatio: 4 / 4,
                    }"
                />

                <div class="d-flex">
                    <button class="cropper-btn" @click="getCroppedImage">Next</button>
                    <button class="cropper-btn">Accept</button>
                </div>

            </div>
        </div>

        <!-- DURATION INPUT -->
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
import ImageCropper from './ImageCropper.vue';
import VuePictureCropper, { cropper } from 'vue-picture-cropper'


export default {
    components:{ImageCropper, VuePictureCropper},
    data(){
        return{
            postTitle: '',
            duration: '',
            imagesArray: [],
            croppedImages: [],
            isShowModal: false,
            activeCropperImage: 0,
            pic: ''
        }
    },
    methods:{
        // When user upload files get the data
        // Then save the base 64 in an array
        getImageData($event){
            this.imagesArray = [];
            this.pic = '';
            this.activeCropperImage = 0;

        

            // Function that transforms raw images in base64
            function filesToDataURL(file){
                const reader = new FileReader();
                return new Promise(resolve => {
                    reader.onload = e => {
                        resolve(e.target.result)
                    }
                    reader.readAsDataURL(file)
                }
                )
            }

            // Get images data from input
            const filesArray = Array.from($event.target.files)
            console.log(filesArray);

            let n = 0

            filesArray.forEach(async file => {
                this.imagesArray.push({
                    id: n++,
                    base64: await filesToDataURL(file)
                })

                n++
                this.pic = this.imagesArray[this.activeCropperImage].base64
                this.isShowModal = true
            });
            console.log(this.imagesArray);
        },
        // Check how many images have been uploaded
        // And show input only if there are less than 5
        showNextInput(){
            if(this.croppedImages.length < 5){
                this.showNextFileInput++
            }   
        },
        changeCropperImage(){
            this.pic = '';
            this.activeCropperImage++
            this.pic = this.imagesArray[this.activeCropperImage].base64
        },
        async getCroppedImage(){
            if (!cropper) return            

            const base64 = cropper.getDataURL()
            
            const blob = await cropper.getBlob()
            console.log('Blob: ' + blob);

            if (!blob) return

            const file = await cropper.getFile({
                fileName: 'filename',
            })

            console.log({ base64, blob, file });

            this.croppedImages.push(base64);
            console.log(this.croppedImages);
            // this.result.blobURL.push(URL.createObjectURL(blob));

            // When last image has been cropped close the modal
            if(this.activeCropperImage == this.imagesArray.length - 1){
                this.isShowModal = false
            };


            if(this.activeCropperImage !== this.imagesArray.length - 1){
                this.changeCropperImage();
            }



            this.showNextInput();
        },
        nextFormStep(){
            localStorage.setItem('firstStep', JSON.stringify({
                title: this.postTitle,
                thumbnails: this.croppedImages,
                duration: this.duration
            }));

            this.$store.commit('setFirstStepState');

            this.$store.commit('increasePostCreationStep');

            console.log(this.$store.state.postForm);
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