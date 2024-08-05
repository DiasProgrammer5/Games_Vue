<template>
  <v-row justify="center">
    <div id="jogo-memoria">
          <h2> Jogo da memória </h2><br />
          <h4> Insera com quantas cartas deseja jogar! </h4>
         <v-combobox type="number" v-model="numberofcards"
            dense
            outlined
            solo
          ></v-combobox>
        <span> Número de jogadas realizadas: {{ numerodejogadas }} </span><br /><br />
        <span> Número de pares completos: {{ pares }} </span><br /><br />
        <v-btn v-on:click = "startplay"
          color="accent"
          depressed
          elevation="5"
          large
          outlined
          plain
          raised
          rounded
          text
        > Começar a jogar! </v-btn><br /><br />
        <div>
          <img style="width: 100px; height: 150px;"
          v-for="c in deckinboard " :key="c"
          v-bind:src="'/images/cards/' + (c.back == true ? 'back.png' : c.card)" 
          v-on:click="turnCard(c)">
        </div><br /><br />
        <span> Pontuação final: {{ pontuacao }} pontos / 100 pontos </span><br /><br />
    
      <v-row v-on:click = "restart"
      >
      <v-btn depressed
      color="primary"
      >
        Limpar jogo
      </v-btn>
      </v-row>
        
        <button  class = "Button">  </button>
      </div>
  </v-row>
</template>

<script>

export default {
  name: 'jogo-memoria',
  data() {
    return {   
      deck: ['2_of_clubs.png','2_of_diamonds.png','2_of_hearts.png','2_of_spades.png','3_of_clubs.png','3_of_diamonds.png','3_of_hearts.png','3_of_spades.png','4_of_clubs.png','4_of_diamonds.png','4_of_hearts.png','4_of_spades.png','5_of_clubs.png','5_of_diamonds.png','5_of_hearts.png','5_of_spades.png',
    '6_of_clubs.png','6_of_diamonds.png','6_of_hearts.png','6_of_spades.png','7_of_clubs.png','7_of_diamonds.png', '7_of_hearts.png','7_of_spades.png','8_of_clubs.png','8_of_diamonds.png','8_of_hearts.png','8_of_spades.png','9_of_clubs.png','9_of_diamonds.png','9_of_hearts.png','9_of_spades.png','10_of_clubs.png',
    '10_of_diamonds.png','10_of_hearts.png','10_of_spades.png','ace_of_clubs.png','ace_of_diamonds.png','ace_of_hearts.png','ace_of_spades.png','jack_of_clubs2.png','jack_of_diamonds2.png','jack_of_hearts2.png','jack_of_spades2.png','king_of_clubs2.png','king_of_diamonds2.png','king_of_hearts2.png',
    'king_of_spades2.png','queen_of_clubs2.png','queen_of_diamonds2.png','queen_of_hearts2.png','queen_of_spades2.png','red_joker.png','black_joker.png'],
    numberofcards: 0,
    numerodejogadas: 0,
    pares: 0,
    pontuacao: 0,
    cartaanterior: null,
    deckinboard: [],
    
    }; 
  },
  methods: {
    startplay(){
    
    //verificar se this.numberofcards é par!!!!!
    if(this.numberofcards % 2 == 0) {
      
      var cartas = this.numberofcards / 2;

      let board = [];

      for(var i=0; i< cartas; i++){

        let index = this.RandomNumber(0, this.deck.length)
         board.push( { back : true , card : this.deck[index]} )
         board.push( { back : true , card : this.deck[index]} )
      }
     
      //baralhar board
      this.shuffleArray(board)
      this.deckinboard =  [...board];
      
    } else {
        alert('Tem de introduzir um número par!')
    }
  },


   shuffleArray(deckinboard) {
    for (let i = deckinboard.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckinboard[i], deckinboard[j]] = [deckinboard[j], deckinboard[i]];
    }
  },

    RandomNumber(min, max){
      return Math.floor(Math.random() * (max - min)) + min;
    },

    turnCard(card){
      if (card.found || !card.back){
        return;
      }

      var self = this;
      card.back = !card.back;

      if(this.cartaanterior == null){
        this.cartaanterior = card
      } else {
        console.log([this.cartaanterior, card]);
        this.numerodejogadas += 1
        if(this.cartaanterior.card === card.card ){
          this.pares += 1
          this.cartaanterior.found = true;
          card.found = true;
          self.cartaanterior = null;
        } else {
          console.log('diferent call');
          setTimeout(function() {

            console.log('setTimeout call');

            self.cartaanterior.back = true
            self.cartaanterior = null;
            card.back = true;

          }, 1000);
        }
      }
      this.pontos()
    },
    
    pontos(){
      this.pontuacao = (this.pares / this.numerodejogadas) * 100
    },

    restart(){
      this.numberofcards = 0
      this.numerodejogadas = 0
      this.pares = 0
      this.pontuacao = 0
      this.deckinboard = []
      this.cartaanterior = null
    },
  }
};
</script>