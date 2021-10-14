export const singerId = state => state.singerId

export const playIng = state => state.playIng

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const playIndex = state => state.playIndex

export const playItem = (state) => {
  return state.playList[state.playIndex] || {}
}

export const list = state => state.list

export const ranklist = state => state.ranklist

export const searchHistory = state => state.searchHistory