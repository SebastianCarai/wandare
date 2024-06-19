<template>
    <section>
        <h2 class="header-text">Register</h2>

        <RegisterForm />

        <RouterLink to="/">Already have an account? Login</RouterLink>
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