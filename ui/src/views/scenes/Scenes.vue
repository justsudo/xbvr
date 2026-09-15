<template>
  <div class="container is-fluid">
    <div class="columns">

      <div class="column is-one-fifth">
        <Filters/>

        <div id="scrollButtons" v-show="showScrollButtons">
          <a id="toTop" @click="scrollToTop">
            <b-icon pack="mdi" icon="navigation" />
          </a>
          <a id="toggleInfiniteScroll" @click="toggleInfiniteScroll" :title="infiniteScrollEnabled ? 'Disable Auto Load More' : 'Enable Auto Load More'">
            <b-icon pack="mdi" :icon="infiniteScrollEnabled ? 'reload' : 'pause'" />
          </a>
        </div>
      </div>

      <div class="column is-four-fifths">
        <List :infinite-scroll-enabled="infiniteScrollEnabled"/>
      </div>

    </div>
  </div>
</template>

<script>
import Filters from './Filters'
import List from './List'

export default {
  name: 'Scenes',
  components: { Filters, List },
  data() {
    return {
      infiniteScrollEnabled: true,
      showScrollButtons: false
    }
  },
  methods: {
    toggleInfiniteScroll() {
      this.infiniteScrollEnabled = !this.infiniteScrollEnabled
    },
    handleScroll() {
      this.showScrollButtons = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 20
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query !== undefined) {
        vm.$store.commit('sceneList/stateFromQuery', to.query)
      }
      vm.$store.dispatch('optionsWeb/load')
      vm.$store.dispatch('sceneList/load', { offset: 0 })
      vm.$store.dispatch('optionsAdvanced/load')
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query !== undefined) {
      this.$store.commit('sceneList/stateFromQuery', to.query)
    }
    this.$store.dispatch('sceneList/load', { offset: 0 })
    next()
  },
}
</script>

<style scoped>
  #scrollButtons {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 20px;
    left: 30px;
    width: 18.5%;
  }
  #toTop, #toggleInfiniteScroll {
    background-color: #f0f0f0;
    color: #4a4a4a;
    padding: 15px;
    border-radius: 10px;
    font-size: 18px;
    margin-right: 8px;
  }
  #toTop:hover, #toggleInfiniteScroll:hover {
    background-color: #BDBDBD;
  }
</style>
