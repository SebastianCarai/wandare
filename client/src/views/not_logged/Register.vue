<template>
    <section>
        <h2 class="header-text">Register</h2>

        <div class="wrapper">
            <RegisterForm />

            <RouterLink to="/" class="router-link">Already have an account? Login</RouterLink>
        </div>
    </section>
</template>

<script>
import RegisterForm from '../../components/forms/RegisterForm.vue';

export default {
    components: {
        RegisterForm
    }
}
</script>

<style lang="scss" scoped>
.wrapper{
    max-width: 500px;
    margin: auto;
}
</style>