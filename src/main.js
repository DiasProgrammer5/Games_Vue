import Vue from 'vue'

import memory from './components/Jogodamemoria.vue'
import galo from './components/jogodogalo.vue'
import forca from './components/jogodaforca.vue'
import calculator from './components/calculadora.vue'
import game from './components/triviagame.vue'
import question from './components/question.vue'
import end from './components/endgame.vue'
import last from './components/lastgame.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'

Vue.use(Vuetify)

Vue.component("jogo-memoria", memory);
Vue.component("jogo-galo", galo);
Vue.component("jogo-forca", forca);
Vue.component("multi-calculator", calculator);
Vue.component("trivia-game", game);
Vue.component("question-game", question);
Vue.component("end-game", end);
Vue.component("last-game", last)

Vue.config.productionTip = false

new Vue({
  el: '#app',

  data() {
    return {
      jogogalo: false,
      jogomemoria: false,
      jogoforca: false,
      jogocalculator: false,
      triviagame: false,
      lastgame: false
    }
  },

  vuetify,

  methods: {
    memory(){
      console.log('hey')
      this.jogomemoria = true
      this.jogogalo = false
      this.jogoforca = false
      this.jogocalculator = false
      this.triviagame = false
      this.lastgame = false
    },
    
    galo(){
      this.jogogalo = true
      this.jogomemoria = false
      this.jogoforca = false
      this.jogocalculator = false
      this.triviagame = false
      this.lastgame = false
    },

    forca(){
     this.jogoforca = true
     this.jogogalo = false
     this.jogomemoria = false
     this.jogocalculator = false
     this.triviagame = false
     this.lastgame = false
    },

    calculator(){
      this.jogocalculator = true
      this.jogogalo = false
      this.jogomemoria = false
      this.jogoforca = false
      this.triviagame = false
      this.lastgame = false
    },

    game(){
      this.triviagame = true
      this.jogocalculator = false
      this.jogogalo = false
      this.jogomemoria = false
      this.jogoforca = false
      this.lastgame = false
    },

    last(){
      this.lastgame = true
      this.triviagame = false
      this.jogocalculator = false
      this.jogogalo = false
      this.jogomemoria = false
      this.jogoforca = false
    }
  }
});
