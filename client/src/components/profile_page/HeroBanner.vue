<template>
    <div>
        <div style="position:relative">
            <div class="hero-banner-background-image">
                <img src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Hero banner profile image">
            </div>

            <div class="profile-image">
                <img :src="profileInfo ? profileInfo.imageUrl : ''" alt="Profile image small">
            </div>
        </div>

        <h1 class="post-title" style="text-align:center; margin-top:120px">
            {{profileInfo ? profileInfo.username : ''}}
        </h1>

    </div>
</template>

<script>
export default {
    props:{
        profileInfo : Object
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.hero-banner-background-image{
    width: 100%;
    height: 300px;
    img{
        width: 100%;
        height: 300px;
    }
}

.profile-image{
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    padding: 7.5px;
    background-color: $white;
    border-radius: 100%;

    img{
        width: 200px;
    }
}
</style>