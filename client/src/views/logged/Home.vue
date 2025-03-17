<template>
    <div class="container-xl">
        <button @click="logOut">logOut</button>
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <!-- Homepage post Feeed -->
            <div class="col-12 col-md-9 col-lg-6">
                <div class="posts-container py-5 d-flex flex-column align-items-center d-md-block px-md-4">
                    <div class="mb-5 intro-text">What's new</div>
                    <PostFeed :posts="homeFeedPosts"/>
                </div>
            </div>
            <!-- End homepage post Feeed -->
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="home" class="d-md-none"/>

        <BurgerMenu/>
    </div>
</template>

<script>
import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
const instance = Axios.create(); 
const axios = setupCache(instance);
import logOut from '../../general_functions/logout';
import HomePostSection from '../../components/sections/desktop/HomePostSection.vue';
import getProfileInfo from '../../general_functions/get_profile_info';
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
}

export default {
    components: {HomePostSection},
    data(){
        return{
            posts: null
        }
    },
    computed: {
        homeFeedPosts(){
            return this.posts
        }
    },
    methods:{
        logOut(){
            logOut()
        },
        // Passing logged user info to the state as soon as the user logs in
        getUserInfo(){
            axios.get('/api/logged-user-info', {headers : headers})
            .then(response => {
                const userInfo = response.data
                localStorage.setItem('loggedUserInfo', JSON.stringify(userInfo));
                this.$store.commit('setLoggedUser');
            })
            .catch(err => {
                console.log(err);
                if(err.response.status == 403){
                    logOut()
                }
            })
        },
        // Get home feed posts
        getHomeFeed(){
            this.$store.commit('setLoading', true);
            axios.get('/api/home-feed', {headers : headers})
            .then((res) => {
                this.posts = res.data;
                this.$store.commit('setLoading', false);
            })
        }
    },
    created(){
        // If user has logged redirect to '7' and remove token from url
        if(this.$route.query.token){
            const token = this.$route.query.token;
            localStorage.setItem('token', token);
            window.location.href = "/"
        }

        this.getUserInfo();

        this.getHomeFeed();
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';
</style>