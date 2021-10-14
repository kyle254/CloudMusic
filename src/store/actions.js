import * as types from './mutation-type'
import {playMode} from 'common/js/config'
import {shuffle, getThenIndex} from 'common/js/utils'
import {saveSearch,deleteSearch,clearSearch} from 'common/js/cache'


// 选择播放
export const selectPlay = function ({commit,state},{list,index}) {
   commit(types.SET_SEQUENCE_LIST, list)
   commit(types.SET_PLAYLIST, list)
   commit(types.SET_PLAY_INDEX, index)
   commit(types.SET_FULL_SCREEN, true)
   commit(types.SET_PLAYING_STATE, true)
}

//随机播放`
export const randomPlay = function ({commit},{list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_PLAY_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 增加歌曲
export const insertSong = function ({commit,state},song) {
  let playlist = state.playList
  let sequenceList = state.sequenceList.slice()
  let playIndex = state.playIndex
  // 记录当前歌曲
  let playItem = playlist[playIndex]
  // 查找当前列表中是否有带插入的歌曲并返回索引
  let fpIndex = getThenIndex(playlist,song)
  // 因为是插入歌曲，所以索引+1
  playIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(playIndex,0,song)
  // 如果已经包含了这首歌
  if(fpIndex > -1) {
    if(playIndex > fpIndex){
      playlist.splice(fpIndex,1)
      playIndex--
    }
  else {
    playlist.splice(fpIndex + 1, 1)
  }
}
  let playSIndex = getThenIndex(sequenceList, playItem) + 1
  let fsIndex = getThenIndex(sequenceList,song)
  sequenceList.splice(playSIndex, 0, song)
  if(fsIndex > -1) {
      if(playSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
      }else {
        sequenceList.splice(fsIndex + 1, 1)
      }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAY_INDEX, playIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)

}

//将搜索历史设置到缓存中
export const saveSearchHistory = function ({commit},query) {
   commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 删除列表中的歌
export const deleteSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 删除列表中全部的歌
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 删除播放歌曲
export const deleteSong = function ({commit,state},song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let playIndex = state.playIndex
  // 找到当前播放这首歌的索引
  let pIndex = getThenIndex(playList,song)
  // 删除这首歌
  playList.splice(pIndex, 1)
  let sIndex = getThenIndex(sequenceList,song)
  sequenceList.splice(sIndex, 1)

  if(playIndex > pIndex || playIndex === playList.length) {
    playIndex--
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAY_INDEX, playIndex)

  if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}



