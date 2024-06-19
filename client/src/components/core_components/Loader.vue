<template>
    <div v-if="isLoading" class="loader">
        <!-- <h1>Loading</h1> -->

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

.loader {
    position: absolute;
    left: calc(50% - 60px);
    top: calc(50% - 60px);
    transform: translate(-50%,-50%);
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid $main_color; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>