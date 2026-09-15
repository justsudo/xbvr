<template>
  <div class="container is-fluid">
    <div class="columns">

      <div class="column is-one-fifth">
         <Filters/> 

        <a id="toTop" v-show="showToTop" @click="scrollToTop">
          <b-icon pack="mdi" icon="navigation" />
        </a>
      </div>

      <div class="column is-four-fifths">
        <List/>
      </div>

    </div>
    
  </div>
</template>

<script>
import Filters from './Filters'
import List from './List'

export default {
  name: 'Actors',  
  components: { Filters, List },
  data () {
    return {
      showToTop: false
    }
  },
  methods: {
    handleScroll () {
      this.showToTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > 20
    },
    scrollToTop () {
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
        vm.$store.commit('actorList/stateFromQuery', to.query)
      }
      vm.$store.dispatch('optionsWeb/load')
      vm.$store.dispatch('actorList/load', { offset: 0 })
      vm.$store.dispatch('optionsAdvanced/load')
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (to.query !== undefined) {
      this.$store.commit('actorList/stateFromQuery', to.query)
    }
    this.$store.dispatch('actorList/load', { offset: 0 })
    next()
  },
  computed: {
  }
}
</script>

<style scoped>
  #toTop {
    position: fixed;
    bottom: 20px;
    left: 30px;
    background-color: #f0f0f0;
    color: #4a4a4a;
    padding: 15px;
    border-radius: 10px;
    font-size: 18px;
  }

  #toTop:hover {
    background-color: #BDBDBD;
  }
</style>
