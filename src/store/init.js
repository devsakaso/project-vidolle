// stateの初期値としたい任意のデータを定義する
function getDefaultState() {
  return {
      playlists: [],
      videos: [],
      videoTitle: '',
      noteTitle: '',
      noteContent:'',
      appTitle: process.env.VUE_APP_TITLE,
      userId: null,
      isSignIn: false,
      user: null,
      currentPlaylistTitle: '',
      search: null,
      snackbar: {
        show: false,
        text: ''
      },
      sorting: false,
      step: 1,
      unsubscribe: null,
  }
}

// stateを初期化する
export const state = getDefaultState()

export const mutations = {
  // stateを初期化するmutationを定義
  clearAuthData(state) {
    Object.assign(state, getDefaultState())
  }
}