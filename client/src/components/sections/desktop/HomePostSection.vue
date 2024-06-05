<template>
    <div class="posts-container py-5 d-flex flex-column align-items-center d-md-block px-md-4">
        <div class="mb-5 intro-text">What's new</div>
        <PostFeed />
    </div>
</template>

<script>
import PostFeed from '../../core_components/PostFeed.vue'

export default {
    components:{PostFeed}
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';

.intro-text{
    font-family: 'Poppins';
    font-weight: 800;
    font-size: 18px;
}
.posts-container{
    height: 100vh;
    overflow-y: auto;
    border-left: 1px solid rgba(0,0,0,0.1);
    border-right: 1px solid rgba(0,0,0,0.1);
    &::-webkit-scrollbar{
        display: none;
    }
}
</style>