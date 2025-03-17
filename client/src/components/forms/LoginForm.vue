<template>

    <form :action="`/api/login`" method="POST" class="login-form-wrapper">
        <div class="form-input-wrapper">
            <label for="identifier" class="form-label">Username</label>
            <input type="text" name="identifier" placeholder="Insert username or email" required>
        </div>

        <div class="form-input-wrapper">
            <label for="password" class="form-label">Password</label>
            <input type="password" name="password" placeholder="Insert password" required>
        </div>

        <button class="login-button">Login</button>
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

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.login-form-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .form-input-wrapper{
        width: 100%;
        margin: 24px 0;
        padding: 0 40px;
        position: relative;

        .form-label{
            background-color: $white;
            position: absolute;
            top:-12px;
            font-family: 'Montserrat';
            font-weight: 600;
            padding: 0 8px;
            left: 48px;
            font-size: 1rem !important;
        }

        input{
            width: 100%;
            padding: 24px;
            background-color: $white;
            font-size: 1rem !important;
            border: 1px solid $black_60;
            &:focus{
                border: 1px solid $main_color;
            }
        }

    }
    
    .login-button{
        color: $white;
        background-color: $main_color;
        box-shadow: none;
        font-family: 'Montserrat';
        font-size: 1.125rem;
        padding: 8px 16px;
        text-transform: uppercase;
        letter-spacing: 0.03rem;
    }
}
</style>