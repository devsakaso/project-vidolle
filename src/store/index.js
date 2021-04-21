import Vue from 'vue'
import Vuex from 'vuex'
import { db, timestamp } from '@/firebase/config.js'

// localbase
// import Localbase from 'localbase'
// let db = new Localbase('db')

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    title: '',
    url: '',
    videos: [],
    // Appタイトル
    appTitle: process.env.VUE_APP_TITLE,
    // 検索
    search: null,
    // スナックバー
    snackbar: {
      show: false,
      text: ''
    },
    // ソート
    sorting: false,
    // プレイリスト
    playlists: [
      //   {
      //     id: 1,
      //     title: 'Vue2のプレイリスト',
      //     done: false,
      //     dueDate: '2021-04-25'
      //   },
      //   {
      //     id: 2,
      //     title: 'Vue3のプレイリスト',
      //     done: false,
      //     dueDate: '2021-05-20'
      //   },
      //   {
      //     id: 3,
      //     title: 'Node.jsのプレイリスト',
      //     done: false,
      //     dueDate: null
      //   },
      ]
  },
  mutations: {
    // プレイリストの追加
    addPlaylist(state, newPlaylist) {
      state.playlists.push(newPlaylist)
    },
    // プレイリストの削除
    deletePlaylist(state, id) {
      state.playlists = state.playlists.filter(playlist => playlist.id !== id)
    },
    // プレイリストの完了・未完了
    donePlaylist(state, payload) {
      let playlist = state.playlists.filter(playlist => playlist.id === payload.id)[0]
      playlist.done = !playlist.done
    },
    // プレイリストタイトルの更新
    updatePlaylistTitle(state, payload) {
      let playlist = state.playlists.filter(playlist => playlist.id === payload.id)[0]
      playlist.title = payload.title
    },
    // プレイリスト締切日の更新
    updatePlaylistDueDate(state, payload) {
      let playlist = state.playlists.filter(playlist => playlist.id === payload.id)[0]
      playlist.dueDate = payload.dueDate
    },
    // プレイリスト並び替え
    setPlaylists(state, playlists) {
      state.playlists = playlists
    },
    // 
    // 
    // 
    // 
    // ビデオの追加
    addVideo(state, newVideo) {
      state.videos.push(newVideo)
    },
    // ビデオの完了・未完了
    doneVideo(state, id) {
      let video = state.videos.filter(video => video.id === id)[0]
      video.done = !video.done
    },
    // ビデオの削除
    deleteVideo(state, id) {
      state.videos = state.videos.filter(video => video.id !== id)
    },
    // ビデオタイトルの更新
    updateVideoTitle(state, payload) {
      let video = state.videos.filter(video => video.id === payload.id)[0]
      video.title = payload.title
    },
    // ビデオ締切日の更新
    updateVideoDueDate(state, payload) {
      let video = state.videos.filter(video => video.id === payload.id) [0]
      video.dueDate = payload.dueDate
    },
    // ビデオの並び替え
    setVideos(state, videos) {
      state.videos = videos
    },
    // setPlaylistVideos(state, {videos, id}) {
    //   state.videos = videos.filter(video => video.playlistId === id)
    // },
    // 
    // 
    // 
    // 
    // スナックバー
    // textにはスナックバーのメッセージをいれる
    showSnackbar(state, text) {
      let timeout = 0
      if(state.snackbar.show) {
        state.snackbar.show = false
        timeout = 10
      }
      // 2回目以降のメッセージの表示が短くなるためsetTimeoutを設定
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    // スナックバーを隠す
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    // 検索
    setSearch(state, value) {
      state.search = value
    },
    // 並び替えモードのトグル
    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    // プレイリストの追加
    addPlaylist({ commit }, newPlaylistTitle) {
      let newPlaylist = {
        // id: Date.now(), //TODO: 要修正
        id: null,
        title: newPlaylistTitle,
        done: false,
        dueDate: null,
        createdAt: timestamp(),
      }
      db.collection('playlists').add(newPlaylist).then(doc => {
        newPlaylist.id = doc.id //docのidを追加
        commit('addPlaylist', newPlaylist)
        commit('showSnackbar', '追加しました')
      })
    },
    // プレイリストの削除
    deletePlaylist({ commit }, id) {
      const ClickedPlaylist = db.collection('playlists').doc(id)
      ClickedPlaylist.collection('videos').get().then(snapshot => {
        // videosが空のときだけ削除
        if(snapshot.size === 0) {
          ClickedPlaylist.delete()
          commit('deletePlaylist', id)
          commit('showSnackbar', '削除しました')
        // videosが空でないときはメッセージ
        } else if ( snapshot.size > 0) {
          commit('showSnackbar', '動画を削除してからプレイリストを削除してください')
          this.state.snackbar.show = false
        } else {
          throw new Error
        }
      })
    },
    // プレイリストの完了
    donePlaylist({ commit }, payload) {
      db.collection('playlists').doc(payload.id).update({
        done: !payload.done
      })
      .then(() => {
        commit('donePlaylist', payload)
      })
    },
    // プレイリストタイトルの更新
    updatePlaylistTitle({ commit }, payload) {
      db.collection('playlists').doc(payload.id).update({
        title: payload.title
      })
      .then(() => {
        commit('updatePlaylistTitle', payload)
        commit('showSnackbar', '変更を保存しました')
      })
    },
    // プレイリストの締切日の変更
    updatePlaylistDueDate({ commit }, payload) {
      db.collection('playlists').doc(payload.id).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updatePlaylistDueDate', payload)
        commit('showSnackbar', '締切日を変更しました')
      })
    },
    // プレイリストの取得
    getPlaylists({state, commit}) {
      db.collection('playlists').orderBy('createdAt').get().then(playlists => {
        playlists.docs.forEach(doc => {
        state.playlists.push({...doc.data(), id: doc.id})
      })
    })
      commit('setPlaylists', state.playlists)
    },
    // プレイリストの並び替えのset
    // setPlaylists({ commit }, playlists) {
    //   db.collection('playlists').set(playlists)
    //   commit('setPlaylists', playlists)
    // },
    // 
    // 
    // 
    // 
    // ビデオの追加
    // addVideo({ commit }, newVideoTitle) {
    //   let newVideo = {
    //     id: Date.now(), //TODO: 要修正
    //     title: newVideoTitle,
    //     done: false,
    //     dueDate: null,

    //   }
    //   db.collection('videos').add(newVideo).then(() => {
    //     commit('addVideo', newVideo)
    //     commit('showSnackbar', '追加しました')
    //   })
    // },
    addVideo({ commit }, {playlistId, newVideoTitle, url}) {
      let newVideo = {
        // id: Date.now(), //TODO: 要修正
        playlistId: playlistId,
        title: newVideoTitle,
        url: url,
        done: false,
        dueDate: null,
      }
      db.collection('playlists').doc(playlistId).collection('videos').add(newVideo).then(() => {
        commit('addVideo', newVideo)
        commit('showSnackbar', '追加しました')
      })
    },
    // ビデオの完了
    doneVideo({ state, commit }, id) {
      let video = state.videos.filter(video => video.id === id)[0]
      db.collection('videos').doc({ id: id }).update({
        done: !video.done
      }).then(() => {
        commit('doneVideo', id)
      })
    },
    // ビデオの削除
    deleteVideo({ commit }, id) {
      db.collection('videos').doc({ id: id }).delete().then(() => {
        commit('deleteVideo', id)
        commit('showSnackbar', '削除しました')
      })
    },
    // ビデオの更新
    updateVideoTitle({ commit }, payload) {
      db.collection('videos').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateVideoTitle', payload)
        commit('showSnackbar', '変更を保存しました')
      })
    },
    // ビデオの締切日の変更
    updateVideoDueDate({ commit }, payload) {
      db.collection('videos').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateVideoDueDate', payload)
        commit('showSnackbar', '締切日を変更しました')
      })
    },
    // ビデオの取得
    // TODO: ビデオを全部取得してしまっているので要修正
    // TODO: ソートするとデータ消える
    getVideos({ state, commit }, id) {
     db.collection('playlists').doc(id).collection('videos')
      .onSnapshot(snap => {
        let results = []
        snap.docs.forEach(doc => {
          // must wait for the server to create the timestamp & send it back
          results.push({ ...doc.data(), id: doc.id })
          console.log(results)
        })
        state.videos = results
      })
      commit('setVideos', state.videos)
    },
    setVideos({ commit }, videos) {
      db.collection('videos').set(videos)
      commit('setVideos', videos)
    }
  },
  getters: {
    // 検索ワードをフィルターにかける(大文字/小文字無視できるように)
    playlistsFiltered(state) {
      if(!state.search) {
        return state.playlists
      }
      return state.playlists.filter(playlist => {
       return playlist.title.toLowerCase().includes(state.search.toLowerCase())
      })
    },
    videosFiltered(state) {
      if(!state.search) {
        return state.videos
      }
      return state.videos.filter(video => {
       return video.title.toLowerCase().includes(state.search.toLowerCase())
      })
    },
  }
})
