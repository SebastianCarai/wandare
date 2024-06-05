<template>
    <div class="left-nav-container">
        <ul>
            <li class="logo-container px-4 py-5">
                <img src="/Users/sebastiancarai/Desktop/Programming/itinerary-app/client/src/assets/logo/wandare-path-logo-v3.svg" alt="Wandare Logo" srcset="">
            </li>
            <li class="px-4 navlink">
                <RouterLink class="side-nav-text" to="/">
                    <i class="mx-2 nav-icon fa-solid fa-house"></i><span class="nav-text">Homepage</span>
                </RouterLink>
            </li>
            <li class="px-4 navlink">
                <RouterLink class="side-nav-text" to="/search">
                    <i class="mx-2 nav-icon fa-solid fa-magnifying-glass"></i><span>Search</span>
                </RouterLink>
            </li>
            <li class="px-4 navlink">
                <RouterLink class="side-nav-text" to="/create-post">
                    <i class="mx-2 nav-icon fa-solid fa-pen-to-square"></i><span>Create post</span>
                </RouterLink>
            </li>
            <li class="px-4 navlink">
                <RouterLink class="side-nav-text" to="/friends">
                    <i class="mx-2 nav-icon fa-solid fa-user-group"></i><span>Friends</span>
                </RouterLink>
            </li>
            <li class="px-4 navlink">
                <RouterLink class="side-nav-text" to="/saved-posts">
                    <i class="mx-2 nav-icon fa-solid fa-bookmark"></i><span>Saved posts</span>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DesktopLeftNav'
}
</script>

<style lang="scss" scoped>
@import '../../../assets/variables.scss';
@import '../src/assets/text_styling.scss';

.left-nav-container{
    height: 100vh;
}

img{
    width: 200px;
    max-width: 100%;
}
ul{
    width: 100%;
    padding: 0;
    margin: 0;
    list-style-type: none;
}
a{
    text-decoration: none;
    display: flex;
    align-items: center;
    width: 100%;
}
li.navlink{
    line-height: 70px;
    color: $black;
    border-radius: 20px;
    &:hover{
        color: $white !important;
        background-color: $main_color_10;
    }
    .nav-icon{
        font-size: 30px;
    }

}

</style>