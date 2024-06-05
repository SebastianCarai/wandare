<template>
    <div class="post-card">
        <RouterLink :to="`/posts/${id}`">
            <h1 class="post-title">Trip to the Dolomites</h1>
        </RouterLink>
        <div class="post-author">Franco Retoni</div>
        <div class="d-flex align-items-end">
            <ImageSlider/>
            
            <ul class="cta-container px-2">
                <li class="my-4 mx-1 mx-md-2">
                    <img src="../../assets/icons/Share.svg" alt="">
                    <div class="cta-text mt-1">Share</div>
                </li>
                <li class="my-3 mx-1 mx-md-2">
                    <img src="../../assets/icons/ChatSquareText.svg" alt="">
                    <div class="cta-text">320</div>
                </li>
                <li class="my-3 mx-1 mx-md-2">
                    <img src="../../assets/icons/Bookmarks-1.svg" alt="">
                    <!-- <div class="cta-text">Save</div> -->
                </li>
            </ul>
        </div>
        <div class="duration-text mt-2">
            <span>Duration:</span> <span class="duration-text duration-time">5 days</span>
        </div> 
    </div>
</template>

<script>
import ImageSlider from './ImageSlider.vue'

export default {
    components:{ImageSlider},
    data(){
        return{
            id: 5
        }
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