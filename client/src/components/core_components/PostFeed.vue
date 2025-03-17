<template>
    <ul class="d-flex flex-column align-items-center d-md-block">
        <li v-for="(post,index) in posts" :key="index">

            <div class="profile-post-card">
                <RouterLink :to="`/posts/${post.id}`">
                    <h1 class="post-title">{{post.post_title}}</h1>
                </RouterLink>
                <ImageSlider :images="post.images" />
            </div>
        </li>
    </ul>
</template>

<script>
import ImageSlider from './ImageSlider.vue';
import PostCard from './PostCard.vue'

export default {
    components:{PostCard, ImageSlider},
    props: {
        posts: Array
    }
}
</script>

<style lang="scss" scoped>
.profile-post-card{
    margin-top: 32px;
}
</style>