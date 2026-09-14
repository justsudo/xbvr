import ky from 'ky'

function getBrowserTheme () {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

function resolveTheme (theme) {
  if (theme === 'dark' || theme === 'light') {
    return theme
  }
  return getBrowserTheme()
}

function applyTheme (theme) {
  if (typeof document !== 'undefined') {
    const active = resolveTheme(theme)
    if (active === 'dark') {
      document.documentElement.classList.add('theme-dark')
    } else {
      document.documentElement.classList.remove('theme-dark')
    }
  }
}

const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null
const initialTheme = savedTheme || getBrowserTheme()
applyTheme(initialTheme)

if (typeof window !== 'undefined' && window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  })
}

const state = {
  loading: false,
  web: {
    tagSort: 'By Tag Count',
    sceneHidden: true,
    sceneWatchlist: true,
    sceneFavourite: true,
    sceneWishlist: true,
    sceneWatched: false,
    sceneEdit: false,
    sceneDuration: false,
    sceneCuepoint: true,
    showHspFile: true,
    showSubtitlesFile: true,
    sceneTrailerlist: true,
    updateCheck: true,
    isAvailOpacity: 40,
    showScriptHeatmap: false,
    showAllHeatmaps: false,
    showOpenInNewWindow: true,
    sceneCardAspectRatio: "1:1",
    sceneCardScaleToFit: true,
    actorCardAspectRatio: "1:1",
    actorCardScaleToFit: true,
    theme: initialTheme
  }
}

const mutations = {
  setTheme (state, theme) {
    state.web.theme = theme
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
    applyTheme(theme)
  }
}

const actions = {
  async load ({ state, commit }) {
    state.loading = true
    ky.get('/api/options/state')
      .json()
      .then(data => {
        state.web.tagSort = data.config.web.tagSort
        state.web.sceneHidden = data.config.web.sceneHidden
        state.web.sceneWatchlist = data.config.web.sceneWatchlist
        state.web.sceneFavourite = data.config.web.sceneFavourite
        state.web.sceneWishlist = data.config.web.sceneWishlist
        state.web.sceneWatched = data.config.web.sceneWatched
        state.web.sceneEdit = data.config.web.sceneEdit
        state.web.sceneDuration = data.config.web.sceneDuration
        state.web.sceneCuepoint = data.config.web.sceneCuepoint
        state.web.showHspFile = data.config.web.showHspFile
        state.web.showSubtitlesFile = data.config.web.showSubtitlesFile
        state.web.sceneTrailerlist = data.config.web.sceneTrailerlist
        state.web.showScriptHeatmap = data.config.web.showScriptHeatmap
        state.web.showAllHeatmaps = data.config.web.showAllHeatmaps
        state.web.updateCheck = data.config.web.updateCheck
        state.web.isAvailOpacity = data.config.web.isAvailOpacity
        state.web.showOpenInNewWindow = data.config.web.showOpenInNewWindow
        state.web.sceneCardAspectRatio = data.config.web.sceneCardAspectRatio
        state.web.sceneCardScaleToFit = data.config.web.sceneCardScaleToFit
        state.web.actorCardAspectRatio = data.config.web.actorCardAspectRatio
        state.web.actorCardScaleToFit = data.config.web.actorCardScaleToFit
        if (data.config.web.theme) {
          commit('setTheme', data.config.web.theme)
        } else if (!savedTheme) {
          commit('setTheme', getBrowserTheme())
        }
        state.loading = false
      })
  },
  async save ({ state, commit }) {
    state.loading = true
    ky.put('/api/options/interface/web', { json: { ...state.web } })
      .json()
      .then(data => {
        state.web.tagSort = data.tagSort
        state.web.sceneHidden = data.sceneHidden
        state.web.sceneWatchlist = data.sceneWatchlist
        state.web.sceneFavourite = data.sceneFavourite
        state.web.sceneWishlist = data.sceneWishlist
        state.web.sceneWatched = data.sceneWatched
        state.web.sceneEdit = data.sceneEdit
        state.web.sceneDuration = data.sceneDuration
        state.web.sceneCuepoint = data.sceneCuepoint
        state.web.showHspFile = data.showHspFile
        state.web.showSubtitlesFile = data.showSubtitlesFile
        state.web.sceneTrailerlist = data.sceneTrailerlist
        state.web.showScriptHeatmap = data.showScriptHeatmap
        state.web.showAllHeatmaps = data.showAllHeatmaps
        state.web.updateCheck = data.updateCheck
        state.web.isAvailOpacity = data.isAvailOpacity
        state.web.showOpenInNewWindow = data.showOpenInNewWindow
        state.web.sceneCardAspectRatio = data.sceneCardAspectRatio
        state.web.sceneCardScaleToFit = data.sceneCardScaleToFit
        state.web.actorCardAspectRatio = data.actorCardAspectRatio
        state.web.actorCardScaleToFit = data.actorCardScaleToFit
        if (data.theme) {
          commit('setTheme', data.theme)
        }
        state.loading = false
      })
  },
  toggleTheme ({ state, dispatch }) {
    const currentTheme = resolveTheme(state.web.theme)
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    dispatch('setTheme', newTheme)
  },
  setTheme ({ commit, dispatch }, theme) {
    commit('setTheme', theme)
    dispatch('save')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
