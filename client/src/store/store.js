import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedUser: JSON.parse(localStorage.getItem('loggedUserInfo')),
    postCreationStep: 1,
    postForm: {
      title: JSON.parse(localStorage.getItem('loggedUserInfo')).postTitle || '',
      thumbnails: JSON.parse(localStorage.getItem('loggedUserInfo')).thumbnails || [],
      duration: JSON.parse(localStorage.getItem('loggedUserInfo')).duration || '',
      stages: [],
      map: {},
      description: '',
      price: null,
      whatToWhear: '',
      documentsNeeded: ''
    }
  },
  mutations: {
    increasePostCreationStep (state){
      if(state.postCreationStep < 3){
        state.postCreationStep++
      }
    },
    decreasePostCreationStep (state){
      if(state.postCreationStep > 1){
        state.postCreationStep--
      }
    },
    setFirstStepState(state){
      state.postForm.title = JSON.parse(localStorage.getItem('firstStep')).postTitle;
      state.postForm.thumbnails = JSON.parse(localStorage.getItem('firstStep')).thumbnails;
      state.postForm.duration = JSON.parse(localStorage.getItem('firstStep')).duration;
    }
  },
  actions: {
  },
  modules: {
  }
})
