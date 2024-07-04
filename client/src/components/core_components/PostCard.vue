<template>
    <div class="post-card">
        <RouterLink :to="`/posts/${post.id}`">
            <h1 class="post-title">{{post.post_title}}</h1>
        </RouterLink>
        <div class="post-author">{{post.author}}</div>
        <div class="d-flex align-items-end">
            <ImageSlider :images="post.images"/>
            
            <ul class="cta-container px-2">
                <li class="my-4 mx-1 mx-md-2">
                    <img src="../../assets/icons/post-cta/share.svg" alt="">
                    <div class="cta-text mt-1">Share</div>
                </li>
                <li class="my-3 mx-1 mx-md-2">
                    <img src="../../assets/icons/post-cta/comment.svg" alt="">
                    <div class="cta-text">320</div>
                </li>
                <li class="my-3 mx-1 mx-md-2">
                    <img src="../../assets/icons/post-cta/save.svg" alt="">
                    <!-- <div class="cta-text">Save</div> -->
                </li>
            </ul>
        </div>
        <div class="duration-text mt-2">
            <span>Duration:</span> <span class="duration-text duration-time">{{post.post_duration}}</span>
        </div> 
    </div>
</template>

<script>
import ImageSlider from './ImageSlider.vue'

export default {
    components:{ImageSlider},
    props: {
        post : Object
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';

*{
    color: $black;
}
.post-card{
    margin-bottom: 45px;
}
.cta-container{
    li{
        display: flex;
        flex-direction: column;
        align-items: center;
        &:hover{
            cursor: pointer;
        }
    }
    i{
        font-size: 35px;
    }
}
.duration-text{
    font-family: 'Poppins';
    font-size: 12px;
    span{
        font-weight: 400;
        opacity: 70%;
    }
}
span.duration-time{
    font-weight: 800;
    opacity: 90%;
}
</style>