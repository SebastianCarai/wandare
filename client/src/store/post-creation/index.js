const firstStepData = JSON.parse(localStorage.getItem('firstStep'));
const thirdStepData = JSON.parse(localStorage.getItem('thirdStep'));
const stagesData = JSON.parse(localStorage.getItem('stages'));
const authorId = JSON.parse(localStorage.getItem('loggedUserInfo')) ? JSON.parse(localStorage.getItem('loggedUserInfo')).id : '';
export default {
    state: {
        postCreationStep: 1,
        postForm: {
            authorId: authorId,
            title: firstStepData ? firstStepData.title : '',
            thumbnails: firstStepData ? firstStepData.thumbnails : [],
            duration: firstStepData ? firstStepData.duration : '',
            stages: stagesData ? stagesData : [],
            description: thirdStepData ? thirdStepData.description : '',
            price: thirdStepData ? thirdStepData.price : '',
            whatToWear: thirdStepData ? thirdStepData.whatToWear : '',
            requiredDocuments: thirdStepData ? thirdStepData.requiredDocuments : '' 
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
            state.postForm.authorId = Number(JSON.parse(localStorage.getItem('loggedUserInfo')).id);
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
            state.postForm.whatToWear = JSON.parse(localStorage.getItem('thirdStep')).whatToWear;
            state.postForm.requiredDocuments = JSON.parse(localStorage.getItem('thirdStep')).requiredDocuments;
        },
    }
}