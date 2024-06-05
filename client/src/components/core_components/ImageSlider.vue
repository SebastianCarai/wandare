<template>
    <Swiper
    :modules="modules"
    :pagination="{clickable : true}"
    :loop="true"
    style="
    --swiper-pagination-color:var(--your-pagination-color, #F9FBFF);
    --swiper-pagination-bullet-inactive-color:var(--inactive-pagination-color, #F9FBFF);
    --swiper-pagination-bullet-inactive-opacity:var(--inactive-pagination-opacity, 0.5)
    "
    class="swiper-shadow"
    >
        <SwiperSlide v-for="(image, index) in images" :key="index">
            <img :src="image" alt=""/>
        </SwiperSlide>
    </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';

export default {
    components:{Swiper, SwiperSlide},
    data(){
        return{
            images: [
                'https://images.pexels.com/photos/1062249/pexels-photo-1062249.jpeg',
                'https://images.pexels.com/photos/748898/pexels-photo-748898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                'https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            ]
        }
    },
    setup(){
        return {
            modules: [Pagination]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';


.swiper{
    width: 100%;
    aspect-ratio: 4 / 4;
    max-width: 278px;
    // height: 100%;
    // max-height: 278px;
    margin: 10px 0 0 0;
    border-radius: 25px;
    overflow: hidden;

    .swiper-slide img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.swiper-shadow{
    box-shadow: 0px 5px 10px $black;
}


</style>