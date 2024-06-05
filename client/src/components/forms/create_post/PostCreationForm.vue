<template>
    <div>
        <form action="/api/create-post" method="POST" enctype="multipart/form-data">
            <div class="my-5">
                <label for="title">Title</label>
                <input v-model="form.title" type="text" name="title" required>
            </div>

            <div class="my-5">
                <label for="images"></label>
                <input @change="getImageData" type="file" name="images" multiple accept="image/*" required>
            </div>

            <button>Create</button>
        </form>

        <button @click="submitForm">Click me</button>
    </div>
    
</template>

<script>
import axios from 'axios';
const token = (document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

export default {
    name: 'PostCreationFrom',
    data(){
        return{
            form: {
                title: '',
                images: [],
                description: '',
            }
        }
    },
    methods:{
        // Through the FileReader() get Base64 image data form the form
        // And append data to form.images
        getImageData($event){
            const filesArray = Array.from($event.target.files)
            console.log(filesArray);


            filesArray.forEach(async file => {
                this.form.images.push(await filesToDataURL(file))
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
        },

        submitForm(){
            console.log(axios.defaults.headers.common['Authorization']);
            axios.post('/api/create-post', {
                data:{
                    title : 'Test',
                    Description : 'Test descriptions'
                }
            })
            // const formData = new FormData();
        }
    }
}
</script>

<style lang="scss">


</style>