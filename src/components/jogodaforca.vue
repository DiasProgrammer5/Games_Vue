<template>
  <v-row justify="center">
    <div id = "jogo-forca">
        <h2> Jogo da Forca </h2><br />
        <v-btn v-on:click = "Start()"
          rounded
          color="primary"
          dark
        >
          Iniciar
        </v-btn><br /><br />
        <span> {{  mostragameword() }}</span><br /><br />
        <v-text-field v-model="play" v-on:keyup="Jogar"
          label="Coloque uma letra"
          :rules="rules"
          hide-details="auto"
        ></v-text-field><br /><br />
        <p>Número de vidas restantes: <span> {{ Vidas }}</span></p>
        <div class="my-2">
              <v-btn v-on:click = "clear()"
                color="error"
                dark
                large
              >
                Limpar
              </v-btn>
        </div> 
      </div>
  </v-row>
</template>

<script>

export default {
  name: 'jogo-forca',
data() {
    return{
    RandomWords: ['Albânia','Portugal','Alemanha','França','Suíça','Marrocos','Itália','Rússia','Equador','Austrália'],
    word: '',
    GameWord: '',
    play: '',
    Vidas: '',
    };
    
  },
  /*mounted() {
        this.Start();
    },*/
  methods: {
    Start(){
      this.Vidas ='6'
      this.GameWord = '',

      this.word = this.RandomWords[this.RandomNumber(0, this.RandomWords.length)]
     
      for(var i=0;i< this.word.length; i++){
        this.GameWord += '_';
      } 
      alert("Insere uma letra")
    },

    RandomNumber(min, max){
      return Math.floor(Math.random() * (max - min)) + min;
    },

    Jogar(){

      var acertei = false


      for(var i=0; i<this.word.length; i++){
  
          if(this.play == this.word[i]){
            console.log(i);  
            this.GameWord = this.replaceChar(this.GameWord, i, this.play);
            acertei = true
          }  
      }

      this.play = ''

      if(!acertei){
          this.Vidas--; 
          console.log(this.Vidas); 
      }

      //verificar se jogo acabou

    
      if(this.GameWord == this.word){
          alert('You win!!')
      }   

      if(this.Vidas == 0){
        alert("Game over!!")
        this.GameWord = this.word
      }
    },
    replaceChar(str,index,chr) {
      if(index > str.length-1) return str;
      return str.substring(0,index) + chr + str.substring(index+1);
    },
    mostragameword(){
      var aux = '';

      for(var i=0;i< this.GameWord.length; i++){
        aux += this.GameWord[i] + '  ';
      } 

      return aux;
    },

    clear(){
      this.word = '',
      this.GameWord = '',
      this.play = '',
      this.Vidas = ''
    }
  } 
}

</script>