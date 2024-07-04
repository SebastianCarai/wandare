<template>
    
    <div class="container-xl">
        <Loader />
        <div class="row" v-if="!isLoading">
            <DesktopLeftNav class="col-md-3 d-none d-md-flex p-0"/>
            <div style="padding:0; margin: 0" class="col-12 col-md-9 col-lg-6">
                <HeaderSection :postData="postData" />

                <div class="pdp-section">
                    <h1 class="post-title">{{ postData['post_title']}}</h1>
                    <h4 class="duration">A <span>{{ postData['post_duration']}}</span> itinerary</h4>

                    <PdpMap :zoom="postData['map_zoom']" :center="postData['map_center']" :stages="postData.stages" />

                    <Accordion
                        :description="postData.description"
                        :whatToWear="postData['what_to_wear']"
                        :pricing="postData.pricing"
                        :requiredDocuments="postData['required_documents']"
                     />
                </div>
            </div>
            <DesktopRightNav class="col-lg-3 d-none d-lg-flex" />
        </div>

        <MobileBottomNav activeIcon="" class="d-md-none"/>

        <BurgerMenu/>
    </div>
</template>

<script>
import HeaderSection from '../../components/pdp/HeaderSection.vue';
import PdpMap from '../../components/pdp/PdpMap.vue';
import Accordion from '../../components/pdp/Accordion.vue';
import StagesListVue from '../../components/forms/create_post/stage-modal/StagesList.vue';
import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
const instance = Axios.create(); 
const axios = setupCache(instance);
const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
}

export default {
    components:{HeaderSection, PdpMap, Accordion, StagesListVue},
    data(){
        return{
            postData: null,
        }
    },
    computed : {
        isLoading(){
            return this.$store.state.isLoading
        }
    },
    created(){
        const postId = this.$route.params.id;
        this.$store.commit('setLoading', true);
        axios.get('/api/posts/' + postId, {headers: headers})
        .then((res)=> {
            this.postData = res.data;
            this.$store.commit('setLoading', false);
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../src/assets/variables.scss';
.pdp-section{
    padding: 24px 24px 100px 24px;
}

@media only screen and (min-width:768px){
    .pdp-section{
        padding: 24px 24px 100px 0px;
    }
}

.duration{
    color: $black_60;
    font-size: 14px;
    span{
        font-weight: 800;
    }
}
</style>