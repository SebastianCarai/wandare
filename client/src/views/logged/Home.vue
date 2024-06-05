<template>
    <div class="container-xl">
        <button @click="logOut">logOut</button>
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <HomePostSection class="col-12 col-md-9 col-lg-6"/>
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="home" class="d-md-none"/>

        <BurgerMenu/>
    </div>
</template>

<script>
import axios from 'axios';
import logOut from '../../general_functions/logout';
import HomePostSection from '../../components/sections/desktop/HomePostSection.vue';
const token = (document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

export default {
    components: {HomePostSection},
    data(){
        return{
            posts: null
        }
    },
    methods:{
        logOut(){
            logOut()
        }

    },
    created(){
        // if(this.$route.query.success){
        //     window.location.href = '/';
        // }

        // Passing logged user info to the state as soon as the user logs in
        axios.get('/api/user-info')
        .then(response => {
            const userInfo = response.data
            localStorage.setItem('loggedUserInfo', JSON.stringify(userInfo));
            this.$store.commit('setLoggedUser');
            const x = JSON.parse(localStorage.getItem('loggedUserInfo'));
            console.log(x.id);
        })
        .catch(err => {
            if(err.response.status == 403){
                logOut()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
@import '../src/assets/text_styling.scss';
</style>