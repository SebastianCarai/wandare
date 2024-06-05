<template>
    <div>
        <RegisterForm />

        <RouterLink to="/">Already have an account? Login</RouterLink>
    </div>
</template>

<script>
import RegisterForm from '../../components/forms/RegisterForm.vue';

export default {
    components: {
        RegisterForm
    }
}
</script>