<template>
    <div>
        <form action="api/register-user" method="POST" @submit="submitForm">
            <div class="input-container">
                <label for="username"><i class="fa-solid fa-user"></i> Username</label>
                <input class="input-field-text" type="text" name="username" placeholder="Type here..." required v-model="form.username">
            </div>
            
            <div class="input-container">
                <label for="email"><i class="fa-solid fa-envelope"></i> Email</label>
                <input class="input-field-text" type="email" name="email" placeholder="Type here..." required v-model="form.email">
            </div>

            <div class="input-container">
                <label for="password"><i class="fa-solid fa-key"></i> Password</label>
                <input class="input-field-text" type="password" name="password" placeholder="Type here..." required v-model="form.password">
            </div>

            <div class="input-container">
                <label for="confirmPassword"><i class="fa-solid fa-key"></i> Confirm password</label>
                <input class="input-field-text" type="password" name="confirmPassword" placeholder="Type here..." required v-model="passwordConfirmation">
            </div>

            <!-- <ImageCropper /> -->

            <input type="submit" placeholder="Register">
        </form>
    </div>
</template>

<script>
// import ImageCropper from '../../../../wandare/client/src/components/core_components/ImageCropper.vue'

export default {
    name: 'RegisterForm',
    // components:{ImageCropper},
    data(){
        return{
            form:{
                username: '',
                email: '',
                password: '',
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

        }
    }
}
</script>

<style lang="scss" scoped>
.input-container{
    margin: 24px 0;
}
</style>