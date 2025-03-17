<template>
    <div class="container login-page">
        <img class="login-logo" src="/src/assets/logo/wandare-path-logo-v3.svg" alt="Wandare Logo">

        <LoginForm />

        <RouterLink to="/register" class="alternative-link">Don't have an account? Register</RouterLink>
    </div>
</template>

<script>
import LoginForm from '../../components/forms/LoginForm.vue'

export default {
    components: {
        LoginForm
    },
    created(){
        if(this.$route.query.error == 1){
            alert("Username or email doesn't exist")
        }else if (this.$route.query.error == 2){
            alert("Wrong password")
        }
    }
}
</script>

<style lang="scss" scoped>
.login-page{
    height: 100vh;
}

.container{
    max-width: 600px;
    padding-top: 40px;
}

.login-logo{
    max-width: 240px;
    display: block;
    margin: 0 auto 40px;
}

.alternative-link{
    display: block;
    text-align: center;
    margin-top: 16px;
}
</style>