<template>
    <div class="my-5">

        <!-- FILE INPUT -->
        <div class="input-wrapper">
            <div class="input-label" :class="{'white' : isWhite , 'center' : isCentered}">{{ title }}</div>
            <div v-if="description" class="input-description" :class="{'white' : isWhite}">{{ description }}</div>
            <div class="file-input-wrapper">
                <!-- Cropped image results -->
                <div style="position:relative;" class="d-flex form-thumb-preview" v-for="(image,index) in croppedImages" :key="index" >
                        <div :class="{'is-round' : isRound}">
                            <img :src="image.base64" alt="">
                            <i @click="removeImage(image.id)" class="fa-regular fa-circle-xmark"></i>
                        </div>
                </div>
                <!-- Input for images -->
                <label v-if="croppedImages.length < maxImages" class="file-label" :class="{'white' : isWhite}" for="images">
                    <i class="fa-solid fa-square-plus"></i>
                    <input @change="getImageData" id="images" type="file" name="images" accept="image/*" required multiple hidden>
                </label>
            </div>
        </div>
        <!-- END FILE INPUT -->

        <!-- IMAGE CROPPER -->
        <div v-if="isShowModal">
            <div class="cropper-wrapper">
                <i @click="isShowModal = false" class="fa-regular fa-circle-xmark close-modal-icon"></i>

                <div class="cropper-title">Crop your image</div>
                <VuePictureCropper
                    :boxStyle="{
                        height: '100%',
                        backgroundColor: '#f8f8f8',
                        margin: 'auto',
                    }"
                    :img="pic"
                    :options="{
                        viewMode: 1,
                        dragMode: 'crop',
                        aspectRatio: 4 / 4,
                    }"
                    :presetMode="{
                        mode: isRound ? 'round' : '',
                    }"
                />

                <div class="d-flex">
                    <button :class="{'btn-not-active' : isCropperLoading }" @click="getCroppedImage" v-if="activeCropperImage < imagesArray.length - 1" class="cropper-btn">Next</button>
                    <button :class="{'btn-not-active' : isCropperLoading }" type="button" v-if="activeCropperImage == imagesArray.length - 1" @click="getCroppedImage" class="cropper-btn">Done</button>
                </div>

            </div>
            <!-- END IMAGE CROPPER -->
        </div>
    </div>
</template>

<script>
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import generateRandomString from '../../general_functions/randomstring.js';
import { OnLongPress, UseDraggable } from '@vueuse/components';

export default {
    components:{VuePictureCropper, OnLongPress, UseDraggable},
    // The "thumbnails" prop is expected to get images setted in the first step of the post creation
    // If the prop is null, the cropper is used in the stage creation
    // If not null, the cropper is used in the first step of the post creation
    props: {
        isMaxSizeReduced: Boolean,
        thumbnails: Array,
        isWhite: Boolean,
        title: String,
        description: String,
        isRound : Boolean,
        maxImages : Number,
        isCentered : Boolean,
        imagesToEdit : Array,
        forceEdit: Boolean
    },
    data(){
        return{
            imagesArray: [],
            isShowModal: false,
            // this.thumbnails is the prop passed in the first step of the post creation
            croppedImages: this.thumbnails || this.imagesToEdit || [],
            croppedFiles: [],
            activeCropperImage: 0,
            pic: '',
            isCropperLoading: false
        }
    },
    methods:{
        removeImage(id){
            for (const image of this.croppedImages){
                if(image.id == id){
                    this.croppedImages.splice(this.croppedImages.indexOf(image), 1);
                }  
                
                this.$emit('images-cropped', this.croppedImages, this.croppedFiles);
            }
        },
        // Get data from the images uploaded
        // Then save the base 64 in imagesArray
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

            let n = 0

            // Foreach image uploaded save the base64 data in ImagesArray
            filesArray.forEach(async file => {
                this.imagesArray.push({
                    id: n++,
                    base64: await filesToDataURL(file)
                })

                n++
                this.pic = this.imagesArray[this.activeCropperImage].base64
                this.isShowModal = true;

            });
        },
        // Check how many images have been uploaded
        // And show input only if there are less than maxImages
        showNextInput(){
            if(this.croppedImages.length < this.maxImages){
                this.showNextFileInput++
            }   
        },
        // Change active image inside the cropper
        // this.pic is the image data passed to the cropper
        changeCropperImage(){
            this.pic = '';
            this.activeCropperImage++
            this.pic = this.imagesArray[this.activeCropperImage].base64
        },
        // Get cropped image data from the cropper
        async getCroppedImage($e){
            if (this.isCropperLoading == true) {
                console.log("can't crop");
                return
            }
            console.log(this.croppedImages);

            this.isCropperLoading = true;

            // $e.preventDefault();
            if (!cropper) return            

            const base64 = cropper.getDataURL()

            const resizeImage = function(maxSize){
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = base64;
                    img.onload = () => {
                        let canvas = document.createElement('canvas')
                        const MAX_WIDTH = maxSize
                        const MAX_HEIGHT = maxSize
                        let width = img.width
                        let height = img.height

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width
                                width = MAX_WIDTH
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height
                                height = MAX_HEIGHT
                            }
                        }
                        canvas.width = width
                        canvas.height = height
                        let ctx = canvas.getContext('2d')
                        ctx.drawImage(img, 0, 0, width, height);
                        let quality = 2; 
                        let dataURL = canvas.toDataURL('image/png', quality);
                        resolve(dataURL);
                    }
                })
            }
            
            const maxSize = this.isMaxSizeReduced ? 300 : 600;

            const resizedImage = await resizeImage(maxSize);

            const blob = await cropper.getBlob()

            if (!blob) return

            const file = await cropper.getFile({
                fileName: generateRandomString(32),
            })
            // Cropped raw file
            this.croppedFiles.push(file);
            
            // Cropped base64
            this.croppedImages.push({
                id: this.croppedImages.length + 1,
                base64: resizedImage,
            });

            // When last image has been cropped close the modal
            if(this.activeCropperImage == this.imagesArray.length - 1){
                this.isShowModal = false;
                this.$emit('images-cropped', this.croppedImages, this.croppedFiles)
            };

            // If there are still images to crop, change cropper image
            if(this.activeCropperImage !== this.imagesArray.length - 1){
                this.changeCropperImage();
            }

            this.showNextInput();

            this.isCropperLoading = false;
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
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 100000;

    & *{
        max-height: 390px !important;
    }

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
        &.btn-not-active{
            background-color: rgba($color: $black, $alpha: 0.7);
        }
    }
}
.center{
    text-align: center !important;
}

.is-round{
    border-radius: 100%;
    overflow: hidden;
}
</style>