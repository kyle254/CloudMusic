import * as types from './mutation-type'

const mutations = {
  [types.SET_SINGER](state, singerId) {   
     state.singerId = singerId
  },
  
  [types.SET_SEQUENCE_LIST](state, list) {  
    state.sequenceList = list
  },

  [types.SET_PLAYLIST](state, list) {   
    state.playList = list
  },

  [types.SET_PLAY_INDEX](state, index) {   
    state.playIndex = index
  },

  [types.SET_FULL_SCREEN](state, flag) {   
    state.fullScreen = flag
  },

  [types.SET_PLAYING_STATE](state, flag) {
    state.playIng = flag
  },

  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },

  [types.SET_LIST](state, list) {
    state.list = list
  },

  [types.SET_RANK_LIST](state, ranklist) {
    state.ranklist = ranklist
  },

  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
}

export default mutations