export default {
    state: {
        loggedUser: JSON.parse(localStorage.getItem('loggedUserInfo')) || '',
    },
    mutations:{
        setLoggedUser(state){
            state.loggedUser = JSON.parse(localStorage.getItem('loggedUserInfo'));
        }
    }
}