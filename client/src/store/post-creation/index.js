export default {
    state: {
        postCreationStep: 1,
        postForm: {
            title: JSON.parse(localStorage.getItem('firstStep')) ? JSON.parse(localStorage.getItem('firstStep')).title : '',
            thumbnails: JSON.parse(localStorage.getItem('firstStep')) ? JSON.parse(localStorage.getItem('firstStep')).thumbnails : [],
            duration: JSON.parse(localStorage.getItem('firstStep')) ? JSON.parse(localStorage.getItem('firstStep')).duration : '',
            stages: [],
            map: {},
            description: '',
            price: null,
            whatToWhear: '',
            documentsNeeded: ''
        }
    },
    mutations:{
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
            state.postForm.title = JSON.parse(localStorage.getItem('firstStep')).title;
            state.postForm.thumbnails = JSON.parse(localStorage.getItem('firstStep')).thumbnails;
            state.postForm.duration = JSON.parse(localStorage.getItem('firstStep')).duration;
        }
    }
}