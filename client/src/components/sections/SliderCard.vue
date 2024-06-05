<template>
    <div>
        <h2 class="post-title my-3">{{sliderTitle}}</h2>

        <div class="slider-container">
            <div class="card">
                <img src="/Users/sebastiancarai/Downloads/dog-image.jpg" alt="Category name">
                <h2 class="card-title">Category name</h2>
            </div>
            <div class="card">
                <img src="/Users/sebastiancarai/Downloads/dog-image.jpg" alt="Category name">
                <h2 class="card-title">Category name</h2>
            </div>
            <div class="card">
                <img src="/Users/sebastiancarai/Downloads/dog-image.jpg" alt="Category name">
                <h2 class="card-title">Category name</h2>
            </div>
            <div class="card">
                <img src="/Users/sebastiancarai/Downloads/dog-image.jpg" alt="Category name">
                <h2 class="card-title">Category name</h2>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props:{
        sliderTitle: String
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';

.slider-container{
    overflow: auto;
    white-space: nowrap;
    &::-webkit-scrollbar{
        display: none;
    }

    .card{
        display: inline-block;
        width: 250px;
        height: 225px;
        margin-right: 16px;
        border-radius: 40px;
        overflow: hidden;

        img{
            width: 100%;
            height: 100%;
        }

        .card-title{
            color: $white;
            font-family: 'Raleway';
            font-size: 24px;
            font-weight: 800;
            position: absolute;
            width: 100%;
            text-align: center;
            z-index: 1;
            bottom: 8px;
        }
    }
}
</style>