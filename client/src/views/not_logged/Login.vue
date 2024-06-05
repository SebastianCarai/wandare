<template>
    <div>
        <LoginForm />

        <RouterLink to="/register">Don't have an account? Register</RouterLink>
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