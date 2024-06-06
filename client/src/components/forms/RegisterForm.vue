<template>
    <div>
        <form action="api/register-user" method="POST" @submit="submitForm">
            <label for="username"></label>
            <input type="text" name="username" placeholder="Insert username" required v-model="form.username">
            
            <label for="email"></label>
            <input type="email" name="email" placeholder="Insert email" required v-model="form.email">

            <label for="password"></label>
            <input type="password" name="password" placeholder="Insert password" required v-model="form.password">

            <label for="confirmPassword"></label>
            <input type="password" name="confirmPassword" placeholder="Confirm password" required v-model="passwordConfirmation">

            <input type="submit" placeholder="Register">
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
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