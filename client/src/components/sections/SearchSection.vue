<template>
    <div class="search-section pl-md-4">
        <div class="searchbar-container">
            <svg @click="onSearch" class="search-icon" width="75" height="75" viewBox="0 0 49 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24.4375" cy="23.875" r="12.875" stroke="#F9FBFF" stroke-width="2"/>
            <line x1="33.0196" y1="34.0429" x2="38.2696" y2="39.2929" stroke="#F9FBFF" stroke-width="2"/>
            </svg>
            <input @keyup.enter="onSearch" v-model="searchInput" class="searchbar" type="text" placeholder="Search...">
        </div>

        <h1 class="post-title" style="text-align:center">Search features will be available soon...</h1>

        <!-- <SliderCard sliderTitle="Categories" />
        <SliderCard sliderTitle="World Regions" class="mt-5"/> -->

        <PostFeed class="mt-5" />
    </div>
</template>

<script>
import SliderCard from './SliderCard.vue';
import PostFeed from '../core_components/PostFeed.vue'

export default {
    components:{SliderCard,PostFeed},
    data: function(){
        return{
            searchInput: ''
        }
    },
    methods:{
        onSearch(){
            console.log(this.searchInput);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.search-section{
    height: 100vh;
    padding-bottom: 80px;
    overflow-y: auto;
    border-left: 1px solid rgba($color: $black, $alpha: 0.1);
    border-right: 1px solid rgba($color: $black, $alpha: 0.1);
    &::-webkit-scrollbar{
        display: none;
    }
}

.searchbar-container{
    width: 90%;
    height: 75px;
    margin: 100px auto 48px;
    display: flex;
    justify-content: center;
    position: relative;
    
    .searchbar{
        width: 100%;
        border: 1px solid $main_color;
        padding-left: 70px;
        border-radius: 20px;
        box-shadow: 0px 5px 10px rgba($color: $main_color, $alpha: 0.5);
        font-size: 18px;
        font-family: 'Raleway';

        &:focus{
            outline-color: $main_color;
        }
    }

    .search-icon{
        position: absolute;
        left: 0;
        & *{
            stroke: $main_color !important;
        }
    }
}
</style>