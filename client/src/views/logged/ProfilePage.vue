<template>
    <div class="container-xl">
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <!-- Homepage post Feeed -->
            <section class="col-12 col-md-9 col-lg-6" style="padding:0 !important">
                <HeroBanner :profileInfo="profileInfo" />

                <div v-if="isMyProfile" class="edit-profile-btn">
                    Edit profile
                </div>

                <hr style="width: 90%; margin:24px auto">

                <div style="padding: 0 0 40px 0">
                    <PostFeed :posts="myPosts"/>
                </div>

                <!-- <UserPosts :userId="profileInfo.id" /> -->

            </section>
            <!-- End homepage post Feeed -->
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="profile" class="d-md-none"/>

        <BurgerMenu/>
    </div>
</template>

<script>
import HeroBanner from '../../components/profile_page/HeroBanner.vue';
// import UserPosts from '../../components/profile_page/UserPosts.vue';
import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import PostFeed from '../../components/core_components/PostFeed.vue';
const instance = Axios.create(); 
const axios = setupCache(instance);
const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
}

export default {
    data(){
        return{
            isMyProfile: false,
            profileInfo: null,
            myPosts: []
        }
    },
    components:{HeroBanner, PostFeed},
    methods:{
        getUserPosts(id){
            axios.get(`/api/user-posts/${id}`, {headers: headers})
            .then((res) => {
                this.myPosts = res.data;
                console.log(res.data);
            })
        },
        getUserInfo(username){
            axios.get(`/api/user-info/${username}`, {headers: headers})
            .then((res) => {
                this.profileInfo = res.data
                this.getUserPosts(this.profileInfo.id); 
            })

        }
    },
    created(){
        // Get info about the logged username and the one in the url
        const loggedUsername = this.$store.state.user.loggedUser.username;
        const urlUsername = this.$route.params.username;

        // If they are the same this means this is the logged user's profile
        if(urlUsername == loggedUsername){
            this.isMyProfile = true;
            this.profileInfo = this.$store.state.user.loggedUser;
            this.getUserPosts(this.profileInfo.id);
            return
        }

        this.getUserInfo(urlUsername);

    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';

.edit-profile-btn{
    background-color: $black;
    color: $white;
    width: 200px;
    padding: 8px 0;
    text-align: center;
    border-radius: 10px;
    margin: auto;
    margin-top: 24px;
}
</style>