<template>
    
    <div class="container-xl">
        <Loader />
        <div class="row">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <section class="col-12 col-md-9 col-lg-6">
                <h1>Data loaded</h1>

            </section>
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="" class="d-md-none"/>

        <BurgerMenu/>
    </div>
</template>

<script>
import axios from 'axios'
import Loader from '../../components/core_components/Loader.vue'
const token = (document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
}

export default {
    created(){
        const postId = this.$route.params.id;
        this.$store.commit('setLoading', true);
        axios.get('/api/posts/' + postId, {headers: headers})
        .then((res)=> {
            console.log(res);
            this.$store.commit('setLoading', false);
        })
    }
}
</script>