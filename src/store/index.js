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
        id: Date.now(), //TODO: 要修正
        title: newPlaylistTitle,
        done: false,
        dueDate: null
      }
      db.collection('playlists').add(newPlaylist).then(() => {
        commit('addPlaylist', newPlaylist)
        commit('showSnackbar', '追加しました')
      })
    },
    // プレイリストの削除
    deletePlaylist({ commit }, id) {
      db.collection('playlists').doc({ id: id }).delete().then(() => {
        commit('deletePlaylist', id)
        commit('showSnackbar', '削除しました')
      })
    },
    // プレイリストの更新
    updatePlaylistTitle({ commit }, payload) {
      db.collection('playlists').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updatePlaylistTitle', payload)
        commit('showSnackbar', '変更を保存しました')
      })
    },
    // プレイリストの締切日の変更
    updatePlaylistDueDate({ commit }, payload) {
      db.collection('playlists').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updatePlaylistDueDate', payload)
        commit('showSnackbar', '締切日を変更しました')
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
  getters: {
    // 検索ワードをフィルターにかける(大文字/小文字無視できるように)
    playlistsFiltered(state) {
      if(!state.search) {
        return state.playlists
      }
      return state.playlists.filter(playlist => {
        playlist.title.toLowerCase().includes(state.search.toLowerCase())
      })
    }
  }
})
