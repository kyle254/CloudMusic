import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
   singerId:{},   // 歌手ID
   playIng:false, // 是否正在播放
   fullScreen:false, // 是否张开播放页
   playList:[],  // 播放列表
   sequenceList:[], // 用于存储原playlist
   mode:playMode.sequence,
   playIndex:-1,   // 当前播放的索引
   list:{},   // 歌单ID
   ranklist:{},
   searchHistory:loadSearch()
}

export default state