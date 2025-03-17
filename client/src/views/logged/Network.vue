<template>
    <div class="container-xl">
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <section>
                <h1 class="post-title mt-5" style="text-align:center">Network and friends features will be available soon...</h1>
            </section>
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="friends" class="d-md-none"/>
        <BurgerMenu/>
    </div>
</template>

<script>
import SearchSection from '../../components/sections/SearchSection.vue'

export default {
    components:{SearchSection}
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';
.container-xl{
    background-color: $white;
    height: 100vh;
}
</style>