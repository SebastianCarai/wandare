<template>
    <div class="container-xl">
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <SearchSection class="col-12 col-md-9 col-lg-6 "/>
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="search" class="d-md-none"/>

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