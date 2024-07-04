<template>
    <div style="position:relative">
        <a :href="`/profile/${postData.authorInfo.username}`" class="author-info">
            <div class="author-image">
                <img :src="postData ? postData.authorInfo.profileImage : '../../assets/icons/default-profile-pic.svg'" alt="">
            </div>
            <div class="author-name">
                {{postData ? postData.authorInfo.username : 'Loading' }}
            </div>
        </a>

        <div class="slider-container">
            <ImageSlider :isSwiperFull="true" :images="postData ? postData.signedUrls : []" />

            <ul class="cta-container px-2">
                <li class="my-3 d-flex flex-column justify-content-center">
                    <img src="../../assets/icons/post-cta/share.svg" alt="">
                    <div class="cta-text mt-1">Share</div>
                </li>
                <li class="my-2">
                    <img src="../../assets/icons/post-cta/comment.svg" alt="">
                    <div class="cta-text">320</div>
                </li>
                <li class="my-3">
                    <img src="../../assets/icons/post-cta/save.svg" alt="">
                    <!-- <div class="cta-text">Save</div> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ImageSlider from '../../components/core_components/ImageSlider.vue';
export default {
    components: {ImageSlider},
    props: {
        postData: Object
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
.author-info{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 16px;
    top: 32px;
    z-index: 10;
    padding: 8px 12px;
    background-color: rgba($color: $black, $alpha: 0.2);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    box-shadow: 0px 5px 8px rgba($color: $black, $alpha: 1);

    .author-image{
        padding: 1px;
        background-color: $white;
        width: 30px;
        height: 30px;
        margin-right: 8px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        img{
            width: 100%;
            height: 100%;
        }
    }

    .author-name{
        font-family: 'Raleway';
        color: $white;
        font-size: 14px;
        font-weight: 800;
    }
}

.slider-container{
    position: relative;
    ul{
        position: absolute;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        z-index: 3;
        bottom: 24px;
        right: 16px;
        color: $black;
        li{
            img{
                width: 100%;
            }
        }
    }
}
</style>