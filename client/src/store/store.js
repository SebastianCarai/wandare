import { createStore } from 'vuex'
import postCreationModule from './post-creation/index.js';
import userInfoModule from './user-info/index.js'

export default createStore({
  modules: {
    'postCreation' : postCreationModule,
    'user' : userInfoModule
  }
})
