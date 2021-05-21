import Vue from 'vue'
import Vuex from 'vuex'
import { db, timestamp } from '@/firebase/config.js'

// localbase
// import Localbase from 'localbase'
// let db = new Localbase('db')

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    // プレイリスト
    playlists: [],
    title: '',
    url: '',
    videos: [],
    videoTitle: '',
    noteTitle: '',
    noteContent:'',
    // Appタイトル
    appTitle: process.env.VUE_APP_TITLE,
    // TODO: いるかどうか判断 ログイン/サインアップ
    user: null,
    isSignIn: false,
    // プレイリストタイトル（動画一覧のとき）
    currentPlaylistTitle: '',
    // 検索
    search: null,
    // スナックバー
    snackbar: {
      show: false,
      text: ''
    },
    // ソート
    sorting: false,
    // フォーム
    step: 1,
  },
  mutations: {
    // サインイン
    setUser(state, user) {
      state.user = user; //firebaseが返したユーザー情報
    },
    // isSignIn(state, isSignIn) {
    //     state.isSignIn = isSignIn; //ログインしてるかどうか true or false
    // },
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
    // プレイリストをセット
    setPlaylists(state, playlists) {
      console.log('setPlaylists');
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
    doneVideo(state, payload) {
      // state.videos.filter(video => video.videoId === payload.videoId)
      let video = state.videos.filter(video => video.videoId === payload.videoId)
      video.done = !video.done
    },
    // ビデオの削除
    deleteVideo(state, payload) {
      state.videos = state.videos.filter(video => video.videoId !== payload.videoId)
    },
    // ビデオタイトルの更新
    updateVideoTitle(state, payload) {
      // state.videos.filter(video => video.videoId === payload.videoId)
      let video = state.videos.filter(video => video.videoId === payload.videoId)
      video.title = payload.title
    },
    // ビデオ締切日の更新
    updateVideoDueDate(state, payload) {
      // state.videos.filter(video => video.videoId === payload.videoId)
      let video = state.videos.filter(video => video.videoId === payload.videoId)
      video.dueDate = payload.dueDate
    },
    // ビデオをセット
    setVideos(state, videos) {
      state.videos = videos
    },
    // setPlaylistVideos(state, {videos, id}) {
    //   state.videos = videos.filter(video => video.playlistId === id)
    // },
    // 
    // ノートの追加
    addNote(state, newNote) {
      state.videos.push(newNote)
    },
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
    },
    // プレイリストタイトルの表示（動画一覧のとき）
    getPlaylistTitle(state, playlistId) {
      state.playlists.filter(playlist => {
        if(playlist.id == playlistId) {
          state.currentPlaylistTitle = playlist.title
        }
      })
    }
  },
  actions: {
    // プレイリストの追加
    addPlaylist({ state, commit }, {playlistTitle, playlistDescription}) {
      const collection = db.collection('playlists')
      const newDoc = collection.doc().id
      let newPlaylist = {
        userId: state.user,
        id: newDoc,
        title: playlistTitle,
        description: playlistDescription,
        done: false,
        dueDate: null,
        createdAt: timestamp()
      }
      collection.doc(newDoc).set({
        ...newPlaylist
      })

      commit('addPlaylist', newPlaylist)
      commit('showSnackbar', '追加しました')
    },
    // プレイリストの削除
    deletePlaylist({ commit }, id) {
      // const ClickedPlaylist = db.collection('playlists').where('userId' == state.user).doc(id)
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
        console.log(payload.done);
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
    // getPlaylists({state, commit}, userId) {
    getPlaylists({commit}, userId) {
      let results = []
      db.collection('playlists').where('userId', '==', userId)
      .get()
      .then(
        snap => {
          if(!snap.size) {
            console.log('プレイリストがありません, snap.size: ', snap.size)
          }
          if(snap.size) {
            snap.forEach(doc => {
                results.push({...doc.data(), id: doc.id })
            })
          }
        },
      )
      .catch(err => console.log(err.message))
      
      // commit('setPlaylists', state.playlists)
      commit('setPlaylists', results)
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
    // addVideo({ commit }, {youtubeVideoId, playlistId, videoId, newVideoTitle, url}) {
    addVideo({ commit }, {youtubeVideoId, playlistId, newVideoTitle, url}) {
      const collection = db.collection('playlists').doc(playlistId).collection('videos')
      const newDoc = collection.doc().id
      let newVideo = {
        youtubeVideoId: youtubeVideoId,
        videoId: newDoc,
        playlistId: playlistId,
        videoTitle: newVideoTitle,
        url: url,
        done: false,
        dueDate: null,
        createdAt: timestamp(),
      }

      collection.doc(newDoc).set(newVideo)
      .then(() => {
        commit('addVideo', newVideo)
        commit('showSnackbar', '追加しました')
      })
    },
    // ビデオの完了
    doneVideo({ commit }, payload) {
      db.collection('playlists').doc(payload.playlistId).collection('videos').doc(payload.videoId).update({
        done: !payload.done
      })
      .then(() => {
        commit('doneVideo', payload)
        console.log(payload.done, payload.videoTitle); //TODO: なぜか逆の結果が出力される
      })
    },
    // ビデオの削除
    deleteVideo({ commit }, payload) {
      db.collection('playlists').doc(payload.playlistId).collection('videos').doc(payload.videoId).delete().then(() => {
        commit('deleteVideo', payload)
        commit('showSnackbar', '削除しました')

      })
    },
    // ビデオタイトルの更新
    updateVideoTitle({ commit }, payload) {
      db.collection('playlists').doc(payload.playlistId).collection('videos').doc(payload.videoId).update({
        videoId: payload.videoId,
        videoTitle: payload.videoTitle,
      }).then(() => {
        commit('updateVideoTitle', payload)
        commit('showSnackbar', '変更を保存しました')
      })
    },
    // ビデオの締切日の変更
    updateVideoDueDate({ commit }, payload) {
      db.collection('playlists').doc(payload.playlistId).collection('videos').doc(payload.videoId).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateVideoDueDate', payload)
        commit('showSnackbar', '締切日を変更しました')
      })
    },
    // ビデオの取得
    // getVideos({ commit }, playlistId) {
    //  let results = []
    //  db.collection('playlists').doc(playlistId).collection('videos').orderBy('createdAt')
    //   .get()
    //   .then(
    //     snap => {
    //       if(!snap.size) {
    //         console.log('動画がありません, snap.size: ', snap.size)
    //       }
    //       if(snap.size) {
    //         snap.forEach(doc => {
    //           results.push({ ...doc.data(), videoId: doc.id }) //videoIdをdoc.idに更新
    //         })
    //       }
    //     })
    //   .then(() => commit('setVideos', results))
    // },

    getVideos({ state, commit }, playlistId) {
      console.log('playlistId', playlistId);
      db.collection('playlists').doc(playlistId).collection('videos').orderBy('createdAt')
       .onSnapshot(snap => {
         let results = []
         snap.docs.forEach(doc => {
           // must wait for the server to create the timestamp & send it back
           results.push({ ...doc.data(), videoId: doc.id }) //videoIdをdoc.idに更新
         })
         state.videos = results
       })
         commit('setVideos', state.videos)
     },

    // setVideos({ commit }, videos) {
    //   db.collection('videos').set(videos)
    //   commit('setVideos', videos)
    // }

    // ノートの追加
    addNote({ commit }, {playlistId, videoId, noteTitle, noteContent}) {
      let newNote = {
        videoId: videoId,
        noteTitle: noteTitle,
        noteContent: noteContent,
      }
      db.collection('playlists').doc(playlistId).collection('videos').doc(videoId).update(newNote).then(() => {
        commit('addNote', newNote)
        commit('showSnackbar', '追加しました')
      })
    },
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
       return video.videoTitle.toLowerCase().includes(state.search.toLowerCase())
      })
    },
    // サインアップ
    user(state) {
      return state.user;
    },
    isSignIn(state) {
      return state.isSignIn;
    }
  }
})
