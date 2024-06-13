export default {
    state: {
        postCreationStep: 1,
        postForm: {
            title: JSON.parse(localStorage.getItem('firstStep')) ? JSON.parse(localStorage.getItem('firstStep')).title : '',
            thumbnails: JSON.parse(localStorage.getItem('firstStep')) ? JSON.parse(localStorage.getItem('firstStep')).thumbnails : [],
            duration: JSON.parse(localStorage.getItem('firstStep')) ? JSON.parse(localStorage.getItem('firstStep')).duration : '',
            stages: JSON.parse(localStorage.getItem('stages')) ? JSON.parse(localStorage.getItem('stages')) : [],
            description: JSON.parse(localStorage.getItem('thirdStep')) ? JSON.parse(localStorage.getItem('thirdStep')).description : '',
            price: JSON.parse(localStorage.getItem('thirdStep')) ? JSON.parse(localStorage.getItem('thirdStep')).price : '',
            whatToWhear: JSON.parse(localStorage.getItem('thirdStep')) ? JSON.parse(localStorage.getItem('thirdStep')).whatToWhear : '',
            requiredDocuments: JSON.parse(localStorage.getItem('thirdStep')) ? JSON.parse(localStorage.getItem('thirdStep')).requiredDocuments : '' 
        },
        thisStage: {},
        isStageModalOpen: false
    },
    mutations:{
        // Go to the next step of the post creation form
        nextFormStep (state){
            if(state.postCreationStep < 3){
                state.postCreationStep++
            }
        },
        // Go to the previous step of the post creation form
        decreaseFormStep (state){
            if(state.postCreationStep > 1){
                state.postCreationStep--
            }
        },
        // Set info for the first step of the creation post
        setFirstStepState(state){
            state.postForm.title = JSON.parse(localStorage.getItem('firstStep')).title;
            state.postForm.thumbnails = JSON.parse(localStorage.getItem('firstStep')).thumbnails;
            state.postForm.duration = JSON.parse(localStorage.getItem('firstStep')).duration;
        },
        // Close or open the stage modal form
        chanegStageModalStatus(state){
            state.isStageModalOpen = !state.isStageModalOpen
        },
        // Add single stage to the stages array
        addStage(state, stage){
            state.postForm.stages.push(stage);
        },
        setThirdStepState(state){
            state.postForm.description = JSON.parse(localStorage.getItem('thirdStep')).description;
            state.postForm.price = JSON.parse(localStorage.getItem('thirdStep')).price;
            state.postForm.whatToWhear = JSON.parse(localStorage.getItem('thirdStep')).whatToWhear;
            state.postForm.requiredDocuments = JSON.parse(localStorage.getItem('thirdStep')).requiredDocuments;
        },
    }
}