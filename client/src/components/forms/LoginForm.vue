<template>
    <form :action="`/api/login`" method="POST">
        <label for="identifier"></label>
        <input type="text" name="identifier" placeholder="Insert username or email" required>

        <label for="password"></label>
        <input type="password" name="password" placeholder="Insert password" required>

        <button>Login</button>
    </form>
</template>

<script>
export default {
    name: 'LoginForm',
    data(){
        return{
        }
    }
}
</script>