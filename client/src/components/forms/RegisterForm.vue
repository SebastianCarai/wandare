<template>
    <div>
        <form action="/api/register-user" method="POST" @submit="submitForm">
            <div class="input-container">
                <div>
                    <label for="username"><i class="fa-solid fa-user"></i> Username</label>
                </div>
                <input class="input-field-text" type="text" name="username" placeholder="Type here..." required v-model="form.username">
            </div>
            
            <div class="input-container">
                <div>
                    <label for="email"><i class="fa-solid fa-envelope"></i> Email</label>
                </div>
                <input class="input-field-text" type="email" name="email" placeholder="Type here..." required v-model="form.email">
            </div>

            <div class="input-container">
                <div>
                    <label for="password"><i class="fa-solid fa-key"></i> Password</label>
                </div>
                <input class="input-field-text" type="password" name="password" placeholder="Type here..." required v-model="form.password">
            </div>

            <div class="input-container">
                <div>
                    <label for="confirmPassword"><i class="fa-solid fa-key"></i> Confirm password</label>
                </div>
                <input class="input-field-text" type="password" name="confirmPassword" placeholder="Type here..." required v-model="passwordConfirmation">
            </div>

            <ImageCropper 
                @images-cropped="getProfileImage" 
                :isCentered="true" 
                :maxImages="1"
                :title="'Insert profile photo'" 
                :isRound="true" 
                :isMaxSizeReduced="true"
            />

            <input name="profileImage" type="hidden" v-model="form.profileImage">
            
            <div class="d-flex justify-center">
                <button @click="submitForm" type="submit" class="submit-button">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import ImageCropper from '../../components/core_components/ImageCropper.vue';
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
                username: '',
                email: '',
                password: '',
                profileImage: ''
            },
            passwordConfirmation: ''
        }
    },
    methods:{
        async submitForm(e){
            if(this.form.password === this.passwordConfirmation){
                this.$emit('submit', this.form)
            }else{
                alert('Password don\'t match. Try again');
                e.preventDefault();
            }

        },
        getProfileImage(base64, files){
            this.form.profileImage = base64[0].base64;
            console.log(this.form.profileImage);
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