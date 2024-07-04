<template>
    <div v-if="isLoading" class="loader">
        <div class="loader-icon"></div>
    </div>
</template>

<script>
export default {
    computed:{
        isLoading(){
            return this.$store.state.isLoading
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.loader{
    width: 100%;
    height: 100vh;
    background-color: rgba($color: $black, $alpha: .5);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
}

.loader-icon {
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    transform: translate(-50%,-50%);
    border: 15px solid $white; /* Light grey */
    border-top: 15px solid $main_color; /* Blue */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>