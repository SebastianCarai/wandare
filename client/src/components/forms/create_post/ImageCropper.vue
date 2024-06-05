<template>
  <div class="live-demo">
    <!-- Select a picture for cropping -->
    <section class="section">

      <!-- Set a button that invokes selecting an image -->
      <button class="select-picture">
        <input
          ref="uploadInput"
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          @change="selectFile"
          multiple
          hidden
        />
      </button>
    </section>

    <!-- Crop result preview -->
    <section class="section" v-if="result.dataURL && result.blobURL && this.activeModalImage == this.dataUrlsArray.length - 1">
      <div class="preview" v-for="(result,index) in result.dataURL" :key="index">
        <img :src="result" />
      </div>
    </section>

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <div class="modal-wrap" v-if="isShowModal">
      <div class="modal-mask"></div>
      <div class="modal-scroll-view">
        <div class="modal">
          <div class="modal-title">
            <div class="tools">
              <button class="btn primary" @click="getResult">
                Get result
              </button>

              <button v-if="this.activeModalImage !== this.dataUrlsArray.length - 1" @click="getResult">
                Next
              </button>
            </div>
          </div>

          <div class="modal-content">
            <!-- The component imported from `vue-picture-cropper` plugin -->
            <VuePictureCropper
              :boxStyle="{
                width: '400px',
                backgroundColor: '#f8f8f8',
                margin: 'auto',
              }"
              :img="pic"
              :options="{
                viewMode: 1,
                dragMode: 'crop',
                aspectRatio: 4 / 4,
              }"
              @ready="ready"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

export default defineComponent({
  components: {
    VuePictureCropper,
  },
  data() {
    return {
      isShowModal: false,
      pic: '',
      result: {
        dataURL: [],
        blobURL: [],
      },
      activeModalImage: 0,
      dataUrlsArray: []
    }
  },
  methods: {
    /**
     * Select the picture to be cropped
     */
    selectFile(e: Event) {
      // Reset last selection and results
      this.pic = '';
      this.result.dataURL = [];
      this.result.blobURL = [];

      // Get selected files
      const { files } = e.target as HTMLInputElement
      if (!files || !files.length) return


      const filesArray = Array.from(files)
      console.log(filesArray);
        
      let n = 0


      filesArray.forEach(async file => {
        this.dataUrlsArray.push({
          id : n + 1,
          base64: await filesToDataURL(file)
        })
        n++
        console.log(this.dataUrlsArray);

        console.log(this.dataUrlsArray[0]);
        this.pic = this.dataUrlsArray[this.activeModalImage].base64

        // Show the modal
        this.isShowModal = true
      });
      

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

      n = 0

      // Clear selected files of input element
      if (!this.$refs.uploadInput) return
      this.$refs.uploadInput.value = ''

    },

    changeCanvaImage(){
      this.pic = '';
      this.activeModalImage++
      this.pic = this.dataUrlsArray[this.activeModalImage].base64
    },

    /**
     * Get cropping results
     */
    async getResult() {
      if (!cropper) return
      console.log(cropper);
      

      const base64 = cropper.getDataURL()
      
      const blob: Blob | null = await cropper.getBlob()
      console.log(blob);

      if (!blob) return

      const file = await cropper.getFile({
        fileName: 'filename',
      })

      console.log({ base64, blob, file });

      this.result.dataURL.push(base64);
      this.result.blobURL.push(URL.createObjectURL(blob));

      // When last image has been cropped close the modal
      if(this.activeModalImage == this.dataUrlsArray.length - 1){
        this.isShowModal = false
      };

      if(this.activeModalImage !== this.dataUrlsArray.length - 1){
        this.changeCanvaImage();
      }
    },

    /**
     * Clear the crop box
     */
    clear() {
      if (!cropper) return
      cropper.clear()
    },

    /**
     * Reset the default cropping area
     */
    reset() {
      if (!cropper) return
      cropper.reset()
    },

    /**
     * The ready event passed to Cropper.js
     */
    ready() {
      console.log('Cropper is ready.')
    },
  },
})
</script>

<style scoped>
/* // @import '../styles/live-demo.less'; */
</style>