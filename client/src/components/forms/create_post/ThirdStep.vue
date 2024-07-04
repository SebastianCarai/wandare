<template>
    <div>
        <div class="input-wrapper">        
            <label class="input-label" for="post-description">Choose post description</label>
            <div class="input-description">Describe the trip in more detail</div>
            <textarea v-model="description" name="post-description" cols="30" rows="10" placeholder="Type here..." class="form-textarea"></textarea>
        </div>

        <div class="input-wrapper">        
            <label class="input-label" for="price">Price</label>
            <div class="input-description">How much did you spend for the trip?</div>
            <input v-model="price" class="input-field-text" type="text" name="price" placeholder="Type here...">
        </div>

        <div class="input-wrapper">        
            <label class="input-label" for="whatToWear">What to whear</label>
            <div class="input-description">Is there any reccomended clothing to bring with you for this trip?</div>
            <textarea v-model="whatToWear" name="whatToWear" cols="30" rows="5" placeholder="Type here..." class="form-textarea"></textarea> 
        </div>

        <div class="input-wrapper">        
            <label class="input-label" for="requiredDocuments">Documents needed</label>
            <div class="input-description">What documents did you need? <br>*(Specify your nationality, since every country has different rules)</div>
            <textarea v-model="requiredDocuments" name="requiredDocuments" cols="30" rows="5" placeholder="Type here..." class="form-textarea"></textarea> 
        </div>

        <div class="d-flex justify-content-between">
            <div @click="$store.commit('decreaseFormStep')" class="form-btn">Previous</div>
            <div class="form-btn" @click="createPost">Craete Post</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            description:this.$store.state.postCreation.postForm.description || '',
            price: this.$store.state.postCreation.postForm.price || '',
            whatToWear: this.$store.state.postCreation.postForm.whatToWear || '',
            requiredDocuments: this.$store.state.postCreation.postForm.requiredDocuments || ''
        }
    },
    computed:{
        postForm(){
            return this.$store.state.postCreation.postForm
        }
    },
    methods:{
        createPost(){
            localStorage.setItem('thirdStep', JSON.stringify({
                description: this.description.trim().length > 0 ? this.description : null,
                price: this.price.trim().length > 0 ? this.price : null,
                whatToWear: this.whatToWear.trim().length > 0 ? this.whatToWear : null,
                requiredDocuments: this.requiredDocuments.trim().length > 0 ? this.requiredDocuments : null
            }));

            this.$store.commit('setThirdStepState');

            this.sendPostData();
        },
        sendPostData(){
            const token = localStorage.getItem('token')
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            this.$store.commit('setLoading', true);
            console.log(this.postForm);
            axios.post('/api/create-post', this.postForm,  {
                headers: headers
            })
            .then((res) => {
                const postId = res.data
                this.$router.push({ name: 'post-detail-page', params: { id: postId } });
                // localStorage.removeItem('firstStep');
                // localStorage.removeItem('stages');
                // localStorage.removeItem('thirdStep');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';


</style>