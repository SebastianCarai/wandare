<template>
    <div class="d-flex justify-content-center">
        <div class="bar-wrapper">
            <div :class="formStep == 1 ? 'is-active' : 'not-active'" class="step-circle">1</div>
            <div :class="formStep == 2 ? 'is-active' : 'not-active'"  class="step-connector"></div>
            <div :class="formStep == 2 ? 'is-active' : 'not-active'"  class="step-circle">2</div>
            <div :class="formStep == 3 ? 'is-active' : 'not-active'"  class="step-connector"></div>
            <div :class="formStep == 3 ? 'is-active' : 'not-active'"  class="step-circle">3</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        formStep : Number
    }
    
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.bar-wrapper{
    width: 80%;
    max-width: 768px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin: 32px 0;
}

.color-setter{
    display: flex;
    align-items: center;
}

.step-circle{
    height: 40px;
    width: 40px;
    color: $white;
    border-radius: 100%;
    align-content: center;
    text-align: center;
    font-weight: 800;
    font-family: 'Poppins';
    &.is-active{
        background-color: $main_color;
    }
}

.step-connector{
    height: 7px;
    flex-grow: 1;

    &.is-active{
        background-color: $main_color;
    }
}

.not-active{
    background-color: rgba($color: $black, $alpha: 0.3);
    color: $white;
}

</style>