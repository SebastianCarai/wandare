<template>
    <div>
        <form :action="`/api/edit/profile/${$store.state.user.loggedUser.id}`">
 
            <!-- Username -->
            <div class="input-container">
                <div>
                    <label for="username"><i class="fa-solid fa-user"></i> Username</label>
                </div>
                <input class="input-field-text" type="text" name="username" placeholder="Type here..." required v-model="form.username">
            </div>
            
            <!-- Email -->
            <div class="input-container">
                <div>
                    <label for="email"><i class="fa-solid fa-envelope"></i> Email</label>
                </div>
                <input class="input-field-text" type="email" name="email" placeholder="Type here..." required v-model="form.email">
            </div>

            <!-- Password -->
            <div class="input-container">
                <div>
                    <label for="password"><i class="fa-solid fa-key"></i> Password</label>
                </div>
                <input class="input-field-text" type="password" name="password" placeholder="Type here..." required v-model="form.password">
            </div>

            <ImageCropper 
                @images-cropped="getProfileImage" 
                :isCentered="true" 
                :maxImages="1"
                :title="'Insert profile photo'"
                :isRound="true" 
                :isMaxSizeReduced="true"
                :imagesToEdit="[{base64: form.profileImage}]"
            />

            <input name="profileImage" type="hidden" v-model="form.profileImage">
            
            <div class="d-flex justify-center">
                <button @click="cancelEdit" type="button" class="submit-button">Cancel</button>
                <button @click="submitForm" type="button" class="submit-button">Save changes</button>
            </div>
        </form>
    </div>
</template>

<script>
import ImageCropper from '../core_components/ImageCropper.vue';
import getProfileInfo from '../../general_functions/get_profile_info.js'
import axios from 'axios';
const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}

export default {
    name: 'RegisterForm',
    components:{ImageCropper},
    data(){
        return{
            form:{
                username: this.$store.state.user.loggedUser.username,
                email: this.$store.state.user.loggedUser.email,
                password: '',
                profileImage: this.$store.state.user.loggedUser.imageUrl,
                isNewImage : false
            }
        }
    },
    computed:{
        userInfo(){
            return this.$store.state.user.loggedUser
        }
    },
    methods:{
        submitForm(){
            axios.post(`/api/edit/profile/${this.$store.state.user.loggedUser.id}`, this.form,  {headers: headers})
            .then(() => {
                getProfileInfo();
                this.$router.push(`/profile/${this.form.username}`);
            })
            .catch(() => {
                alert('Wrong password. Try again')
            })
        },
        getProfileImage(base64, files){
            this.form.profileImage = base64[0].base64;
            this.form.isNewImage = true;
            console.log(this.form.profileImage);
        },
        cancelEdit(){
            confirm('Do you want to go back?') ? this.$router.go(-1) : null
            
        }
    }
}
</script>

<style lang="scss" scoped>
.input-container{
    margin: 24px 0;
}

.submit-button{
    padding: 8px 16px;
    margin: auto;
}
</style>