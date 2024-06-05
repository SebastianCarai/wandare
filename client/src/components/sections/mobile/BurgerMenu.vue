<template>
    <div class="d-md-none burger-menu" >
        <!-- Burger menu icons -->
        <img v-if="!isBurgerMenuOpen" @click="changeBurgerMenuStatus" src="../../../assets/icons/burger-menu/burger-list-menu.svg" alt="Burger menu icon">
        <img v-if="isBurgerMenuOpen" @click="changeBurgerMenuStatus" src="../../../assets/icons/burger-menu/close-icon.svg" alt="Close burger menu icon">

        <div v-if="isBurgerMenuOpen" class="burger-menu-content mt-2">
            <!-- Burger menu profile button -->
            <RouterLink to="/saved-posts">
                <div class="burger-menu-item burger-menu-profile">
                    <div class="burger-menu-item-icon">
                        <img src="../../../assets/icons/burger-menu/saved-posts.svg" alt="Saved posts icon">
                    </div>
                    <div class="burger-menu-item-text">Saved posts</div>
                </div>
            </RouterLink>

            <!-- Burger menu settings button -->
            <RouterLink to="/settings">
                <div class="burger-menu-item burger-menu-settings">
                    <div class="burger-menu-item-icon">
                        <img src="../../../assets/icons/burger-menu/settings.svg" alt="Settings icon">
                    </div>
                    <div class="burger-menu-item-text">Settings</div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script>
export default {
   data(){
    return{
        isBurgerMenuOpen : false
    }
   },
   methods:{
    changeBurgerMenuStatus(){
        this.isBurgerMenuOpen = !this.isBurgerMenuOpen
    }
   }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';
.burger-menu{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    right: 10px;
    top: 10px;
    padding: 10px;
    z-index: 10;
}

.burger-menu-content{
    background-color: rgba($color: $white, $alpha: 1);
    border: 1px solid rgba($color: $black, $alpha: 0.8);
    border-radius: 20px;

    .burger-menu-item{
        display: flex;
        align-items: center;
        align-content: center;
        min-width: 300px;
        padding: 15px 10px;
        color: $black;

        .burger-menu-item-icon{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }
    }
    .burger-menu-profile{
        border-bottom: 1px solid rgba($color: $black, $alpha: 0.8);
    }
}
</style>