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
            <label class="input-label" for="whatToWhear">What to whear</label>
            <div class="input-description">Is there any reccomended clothing to bring with you for this trip?</div>
            <textarea v-model="whatToWhear" name="whatToWhear" cols="30" rows="5" placeholder="Type here..." class="form-textarea"></textarea> 
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
            whatToWhear: this.$store.state.postCreation.postForm.whatToWhear || '',
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
                whatToWhear: this.whatToWhear.trim().length > 0 ? this.whatToWhear : null,
                requiredDocuments: this.requiredDocuments.trim().length > 0 ? this.requiredDocuments : null
            }));

            this.$store.commit('setThirdStepState');
            console.log(this.postForm);

            this.sendPostData();
        },
        sendPostData(){
            const token = (document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            axios.post('/api/create-post', this.postForm,  {
                headers: headers
            })
            .then((res) => {
                console.log(res);
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


</style>