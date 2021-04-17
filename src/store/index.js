import Vue from 'vue'
import Vuex from 'vuex'

import Localbase from 'localbase'

let db = new Localbase('db')

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    // Appタイトル(環境変数)
    appTitle: process.env.VUE_APP_TITLE,
    // 検索
    search: null,
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
    // プレイリストの完了・未完了
    donePlaylist(state, id) {
      let playlist = state.playlists.filter(playlist => playlist.id === id)[0]
      playlist.done = !playlist.done
    },
    // プレイリストの削除
    deletePlaylist(state, id) {
      state.playlists = state.playlists.filter(playlist => playlist.id !== id)
    },
    // プレイリストタイトルの更新
    updatePlaylistTitle(state, payload) {
      let playlist = state.playlists.filter(playlist => playlist.id === payload.id)[0]
      playlist.title = payload.title
    },
    // プレイリスト締切日の更新
    updatePlaylistDueDate(state, payload) {
      let playlist = state.playlists.filter(playlist => playlist.id === payload.id) [0]
      playlist.dueDate = payload.dueDate
    },
    // 並び替え
    setPlaylists(state, playlists) {
      state.playlists = playlists
    },
  },
  actions: {
    // プレイリストの追加
    addPlaylist({ commit }, newPlaylistTitle) {
      let newPlaylist = {
        id: Date.now(), //TODO: 要修正
        title: newPlaylistTitle,
        done: false,
        dueDate: null
      }
      db.collection('playlists').add(newPlaylist).then(() => {
        commit('addPlaylist', newPlaylist)
      })
    },
    // プレイリストの削除
    deletePlaylist({ commit }, id) {
      db.collection('playlists').doc({ id: id }).delete().then(() => {
        commit('deletePlaylist', id)
      })
    },
    // プレイリストの更新
    updatePlaylistTitle({ commit }, payload) {
      db.collection('playlists').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updatePlaylistTitle', payload)
      })
    },
    // プレイリストの締切日の変更
    updatePlaylistDueDate({ commit }, payload) {
      db.collection('playlists').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updatePlaylistDueDate', payload)
      })
    },
    // プレイリストの取得
    getPlaylists({ commit }) {
      db.collection('plyalists').get().then(playlists => {
        commit('setPlaylists', playlists)
      })
    },
    setPlaylists({ commit }, playlists) {
      db.collection('playlists').set(playlists)
      commit('setPlaylists', playlists)
    }

  },
})
