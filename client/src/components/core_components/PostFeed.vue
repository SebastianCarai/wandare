<template>
    <ul class="d-flex flex-column align-items-center d-md-block">
        <li v-for="(post,index) in posts" :key="index">
            <PostCard :post="post" />
        </li>
    </ul>
</template>

<script>
import PostCard from './PostCard.vue'

export default {
    components:{PostCard},
    props: {
        posts: Array
    }
}
</script>