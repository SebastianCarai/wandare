<template>

</template>

<script>
import axios from 'axios'
import PostFeed from '../../core_components/PostFeed.vue'
const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}

export default {
    components:{PostFeed},
    methods: {
        getHomeFeed(){
            axios.get('/api/home-feed', {headers : headers})
            .then((res) => {
                console.log(res);
            })
        }
    },
    created(){
        this.getHomeFeed();
    }
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