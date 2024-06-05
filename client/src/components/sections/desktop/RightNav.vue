<template>
    <div class="right-nav-container d-flex flex-column justify-content-between py-5 px-4">
        <div class="profile-button d-flex align-items-center">
            <div class="profile-image">
                <img src="/Users/sebastiancarai/Downloads/dog-image.jpg" alt="">
            </div>
            <div class="side-nav-text mx-2">{{$store.state.loggedUser.username}}</div>
        </div>

        <ul class="side-nav-text">
            <li class="d-flex align-items-center">
                <i class="fa-solid fa-gear nav-icon mx-2"></i> <span>Settings</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DesktopRightNav'
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
    padding: 1px;
    background-color: $main_color;
    img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
}
</style>