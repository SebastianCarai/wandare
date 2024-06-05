<template>
    <ul class="d-flex flex-column align-items-center d-md-block">
        <li>
            <PostCard />
        </li>
        <li>
            <PostCard />
        </li>
        <li>
            <PostCard />
        </li>
    </ul>
</template>

<script>
import PostCard from './PostCard.vue'

export default {
    components:{PostCard}
}
</script>