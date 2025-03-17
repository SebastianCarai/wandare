<template>
    <div class="right-nav-container d-flex flex-column justify-content-between py-5 px-4">
        <RouterLink :to="`/profile/${userInfo.username}`" class="profile-button d-flex align-items-center">
            <div class="profile-image">
                <img :src="this.$store.state.user.loggedUser.imageUrl" alt="">
            </div>
            <div class="side-nav-text mx-2">{{userInfo.username}}</div>
        </RouterLink>

        <ul class="side-nav-text">
            <li class="d-flex align-items-center">
                <i class="fa-solid fa-gear nav-icon mx-2"></i> <span>Settings</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DesktopRightNav',
    computed:{
        userInfo(){
            return this.$store.state.user.loggedUser
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';

.right-nav-container{
    height: 100vh;
}

.profile-image{
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    padding: 3px;
    background-color: $main_color;
    img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
}
</style>