<template>
    <div class="bottom-nav-container">
        <ul class="d-flex">
            <li class="navlink homelink">
                <RouterLink class="side-nav-text" to="/">
                    <svg :class="{ 'bottom-nav-icon-active': activeIcon=='home' }" class="bottom-nav-icon" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0008 22.9993L25 11L38.9992 22.9993L39 23V23.0001V37.0001C39 37.5305 38.7893 38.0392 38.4142 38.4143C38.0391 38.7893 37.5304 39.0001 37 39.0001H29V33.0001C29 31.9392 28.5786 30.9218 27.8284 30.1716C27.0783 29.4215 26.0609 29.0001 25 29.0001C23.9391 29.0001 22.9217 29.4215 22.1716 30.1716C21.4214 30.9218 21 31.9392 21 33.0001V39.0001L13 39.0001C12.4696 39.0001 11.9609 38.7893 11.5858 38.4143C11.2107 38.0392 11 37.5305 11 37.0001V23.0001V23L11.0008 22.9993Z" stroke="#F9FBFF" stroke-width="2"/>
                    </svg>
                    <!-- <img class="bottom-nav-icon" src="../../../assets/icons/nav-icons/home.svg" alt="Home icon"> -->
                </RouterLink>
            </li>
            <li class="navlink">
                <RouterLink class="side-nav-text" to="/search">
                    <svg :class="{ 'bottom-nav-icon-active': activeIcon=='search' }" class="bottom-nav-icon" width="50" height="50" viewBox="0 0 49 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24.4375" cy="23.875" r="12.875" stroke="#F9FBFF" stroke-width="2"/>
                    <line x1="33.0196" y1="34.0429" x2="38.2696" y2="39.2929" stroke="#F9FBFF" stroke-width="2"/>
                    </svg>
                    <!-- <img class="bottom-nav-icon" src="../../../assets/icons/nav-icons/search.svg" alt="Search icon"> -->
                </RouterLink>
            </li>
            <li class="navlink">
                <RouterLink class="side-nav-text" to="/create-post">
                    <svg :class="{ 'bottom-nav-icon-active': activeIcon=='create-post' }" class="bottom-nav-icon" width="50" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_752_10824)">
                    <path d="M24.6908 13.9643H15.8092C14.7623 13.9643 13.7582 14.3707 13.018 15.094C12.2777 15.8174 11.8618 16.7985 11.8618 17.8214V35.1786C11.8618 36.2016 12.2777 37.1826 13.018 37.906C13.7582 38.6293 14.7623 39.0357 15.8092 39.0357H35.546C36.5929 39.0357 37.597 38.6293 38.3372 37.906C39.0775 37.1826 39.4934 36.2016 39.4934 35.1786V26.5" stroke="#F9FBFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M35.5461 15.8929L37.427 17.8214M39.4934 11.9721C40.0196 12.5037 40.3109 13.2161 40.3046 13.9556C40.2984 14.6951 39.995 15.4026 39.4599 15.9257L25.6776 29.3929L19.7566 31.3214L21.7303 25.5357L35.5204 11.947C36.0052 11.4697 36.6539 11.1849 37.3411 11.1479C38.0284 11.1108 38.7052 11.3241 39.2408 11.7464L39.4934 11.9721Z" stroke="#F9FBFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_752_10824">
                    <rect width="30" height="30" fill="white" transform="translate(10.875 10)"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <!-- <img class="bottom-nav-icon" src="../../../assets/icons/nav-icons/create-post.svg" alt="Create post icon"> -->
                </RouterLink>
            </li>
            <li class="navlink">
                <RouterLink class="side-nav-text" to="/friends">
                    <svg :class="{ 'bottom-nav-icon-active': activeIcon=='friends' }" class="bottom-nav-icon" width="55" height="50" viewBox="0 0 55 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_752_10828)">
                    <path d="M41.8875 36.75H32.6875V34.6C32.6875 32.1281 32.0592 29.8396 31.0003 27.9656C31.1999 27.8913 31.4221 27.8209 31.6612 27.7576C32.3009 27.5883 32.942 27.5012 33.3784 27.5C34.1516 27.8303 35.0075 28.0625 35.9375 28.0625C36.8675 28.0625 37.7234 27.8303 38.4966 27.5C39.7559 27.5033 40.9673 28.1767 41.8978 29.4082C42.8311 30.6435 43.4375 32.3957 43.4375 34.375C43.4375 35.1093 43.2112 35.7366 42.8926 36.1584C42.5743 36.5797 42.209 36.75 41.8875 36.75ZM20.6375 28.625C22.063 28.625 23.3853 28.195 24.5589 27.5H24.7175C26.0245 27.5 27.2822 28.1994 28.2467 29.4759C29.2115 30.7528 29.8375 32.5614 29.8375 34.6V36.625C29.8375 37.3593 29.6112 37.9866 29.2926 38.4084C28.9743 38.8297 28.609 39 28.2875 39H12.9875C12.666 39 12.3007 38.8297 11.9824 38.4084C11.6638 37.9866 11.4375 37.3593 11.4375 36.625V34.6C11.4375 32.5614 12.0635 30.7528 13.0283 29.4759C13.9928 28.1994 15.2505 27.5 16.5575 27.5H16.7171C17.8928 28.1941 19.2105 28.625 20.6375 28.625Z" stroke="#F9FBFF" stroke-width="2"/>
                    <path d="M26.2929 16.75C26.2929 19.9187 23.7031 22.5 20.4929 22.5C17.2826 22.5 14.6929 19.9187 14.6929 16.75C14.6929 13.5813 17.2826 11 20.4929 11C23.7031 11 26.2929 13.5813 26.2929 16.75Z" stroke="#F9FBFF" stroke-width="2"/>
                    <path d="M39.9088 18.25C39.9088 20.5903 37.9956 22.5 35.6199 22.5C33.2443 22.5 31.3311 20.5903 31.3311 18.25C31.3311 15.9097 33.2443 14 35.6199 14C37.9956 14 39.9088 15.9097 39.9088 18.25Z" stroke="#F9FBFF" stroke-width="2"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_752_10828">
                    <rect width="34" height="30" fill="white" transform="translate(10.4375 10)"/>
                    </clipPath>
                    </defs>
                    </svg>

                    <!-- <img class="bottom-nav-icon" src="../../../assets/icons/nav-icons/friends.svg" alt="Friends icon"> -->
                </RouterLink>
            </li>
            <li class="navlink">
                <RouterLink class="side-nav-text" :to="`/profile/${username}`">
                    <img :class="{ 'bottom-nav-icon-active': activeIcon=='profile' }" class="profile-icon" :src="profileImage" alt="Saved posts icon">
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'mobileBottomNav',
    props:{
        activeIcon : String
    },
    computed:{
        profileImage(){
            return this.$store.state.user.loggedUser.imageUrl
        },
        username(){
            return this.$store.state.user.loggedUser.username
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';

.bottom-nav-container{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: $bottom_navbar_height;
    width: 100%;
    background-color: rgba($color: #A1A1A1, $alpha: 0.6);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba($color: $black, $alpha: 0.2);
    z-index: 1;

    .navlink{
        height: $bottom_navbar_height;
        flex-grow: 1;
        a{
            display: flex;
            justify-content: center;
            align-items: center;
            height: $bottom_navbar_height;
            text-decoration: none;
        }
    }

}

.profile-icon{
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid rgba($color: $white, $alpha: 1.0);

    &.bottom-nav-icon-active{
        border: 3px solid $main_color;
    }
}

.bottom-nav-icon *{
    stroke: $white;
    stroke-width: 2px;
}
.bottom-nav-icon-active *{
    stroke: $main_color;
    stroke-width: 3px !important;
}

.router-link-exact-active .bottom-nav-icon *{
    stroke: $main_color;
}
</style>
