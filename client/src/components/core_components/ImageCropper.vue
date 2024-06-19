<template>
    <div class="my-5">

        <!-- FILE INPUT -->
        <div class="input-wrapper">
            <div class="input-label" :class="{'white' : isWhite}">Choose images</div>
            <div class="input-description" :class="{'white' : isWhite}">Show how beautiful it was this stage. Upload some images! (max 5)</div>
            <div class="file-input-wrapper">
                <div v-for="(image,index) in croppedImages" :key="index" class="form-thumb-preview">
                    <img :src="image.base64" alt="">
                </div>
                <label v-if="croppedImages.length < 5" class="file-label" :class="{'white' : isWhite}" for="images">
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
                    <button v-if="activeCropperImage < imagesArray.length - 1" @click="getCroppedImage" class="cropper-btn">Next</button>
                    <button v-if="activeCropperImage == imagesArray.length - 1" @click="getCroppedImage" class="cropper-btn">Done</button>
                </div>

            </div>
            <!-- END IMAGE CROPPER -->
        </div>
    </div>
</template>

<script>
import VuePictureCropper, { cropper } from 'vue-picture-cropper';
import generateRandomString from '../../general_functions/randomstring.js';
import axios from 'axios';

export default {
    components:{VuePictureCropper},
    // The "thumbnails" prop is expected to get images setted in the first step of the post creation
    // If the prop is null, the cropper is used in the stage creation
    // If not null, the cropper is used in the first step of the post creation
    props: {
        thumbnails: Array,
        isWhite: Boolean
    },
    data(){
        return{
            imagesArray: [],
            isShowModal: false,
            // this.thumbnails is the prop passed in the first step of the post creation
            croppedImages: this.thumbnails || [],
            croppedFiles: [],
            activeCropperImage: 0,
            pic: ''
        }
    },
    methods:{
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
                this.isShowModal = true
            });
        },
        // Check how many images have been uploaded
        // And show input only if there are less than 5
        showNextInput(){
            if(this.croppedImages.length < 5){
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
        async getCroppedImage(){
            if (!cropper) return            

            const base64 = cropper.getDataURL()

            const resizeImage = function(){
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = base64;
                    console.log(img);
                    img.onload = () => {
                        let canvas = document.createElement('canvas')
                        const MAX_WIDTH = 700
                        const MAX_HEIGHT = 700
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
                        let dataURL = canvas.toDataURL('image/jpeg', quality);
                        resolve(dataURL);
                    }
                })
            }
            const resizedImage = await resizeImage();

            const blob = await cropper.getBlob()

            if (!blob) return

            const file = await cropper.getFile({
                fileName: generateRandomString(32),
            })
            console.log(file);

            // Cropped raw file
            this.croppedFiles.push(file);
            
            // Cropped base64
            this.croppedImages.push({
                id: this.croppedImages.length + 1,
                base64: resizedImage,
            });

            // When last image has been cropped close the modal
            if(this.activeCropperImage == this.imagesArray.length - 1){
                // this.sendImages(this.croppedFiles);
                this.isShowModal = false;
                this.$emit('images-cropped', this.croppedImages, this.croppedFiles)
            };

            // If there are still images to crop, change cropper image
            if(this.activeCropperImage !== this.imagesArray.length - 1){
                this.changeCropperImage();
            }


            this.showNextInput();
        },
        sendImages(files){
            const fd = new FormData();
            files.forEach(file => {
                fd.append('thumbnails', file)
            });
            console.log(fd);
            const token = (document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            axios.post('/api/create-post', fd ,  {
                headers: headers
            })
            .then((res) => {
                console.log('Data');
            })
            .catch((err) => {
                console.log(err);
            })
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
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 100000;

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