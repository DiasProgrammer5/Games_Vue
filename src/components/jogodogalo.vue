<template>
  <v-row justify="center">
      <div>
        <h2> Jogo do Galo </h2><br />
        <h3> Player 1: X </h3>
        <h3> Player 2: O </h3><br />
        <v-container fluid>
        <v-radio-group
            v-model="modojogo"
            column
          >
            <v-radio v-on:click = "startplay"
              label="2P"
              value="2P"
            ></v-radio>
            <v-radio v-on:click = "startplay"
              label="1P VS CP"
              value="1P"
            ></v-radio>
          </v-radio-group>
        </v-container>
        
        <div v-if="board">
          <div  v-for="(linha, indexlinha) in board" style="display: flex;" :key="(linha, indexlinha)">
              <v-btn
                  depressed
                  elevation="2"
                  outlined
                  tile
              v-for="(s, indexcoluna) in linha" :key="(s, indexcoluna)"
              v-on:click = "inputsymbol(indexlinha, indexcoluna)" 
              :disabled="invalidmove(indexlinha, indexcoluna)"
              >{{ s }}</v-btn>
          </div>
        </div>
          <br />
          <v-btn v-on:click = "clean()"
              color="secondary"
              elevation="15"
              plain
              raised
              text
              tile
          > Voltar a jogar </v-btn>
        
      </div>
  </v-row>
</template>

<script>

export default {
  name: 'jogo-galo',
    data() {
     return {
       started : false,
       modojogo: '',
       player1: 'X',
       player2: 'O',
       turn: '',
       symbol: '',
       board: [
         ['','','']
         ,
         ['','','']
         ,
         ['','','']
       ]
     }
   },
   mounted(){
    console.log('mounted call');
   },
   methods: {
     startplay(){     

       console.log('PLAY call');
         this.turn = 'X';
         this.started = true;
         alert('É o player1 a jogar!')
     },
    
     inputsymbol(linha, coluna){
       console.log([linha, coluna]);
       if(this.turn == this.player1){
         this.symbol = 'X'
         console.log(this.symbol); 
       }
      
       if(this.turn == this.player2){
         this.symbol = 'O'
         console.log(this.symbol);
       }

       this.setboardValue(linha, coluna);     

       this.combinacoesVencer();
      
       this.endgame();
      
       this.nextturn();

       if(this.modojogo === '1P')
         this.cpmove();
     },

     cpmove(){

       if(this.started){

         console.log('cpmove call');
         var indexlinha = this.RandomNumber(0, 3);
         console.log(indexlinha);
         //verificar se existe algum buraco na linha
         if(this.board[indexlinha][0] == '' || this.board[indexlinha][1] == '' || this.board[indexlinha][2] == ''){
           //PC pode jogar na linha indexlinha
  
           var indexcoluna = this.RandomNumber(0, 3);
           console.log(indexcoluna);
           if(this.board[indexlinha][indexcoluna] == ''){
          
             this.setboardValue(indexlinha, indexcoluna);
  
             this.combinacoesVencer();
        
             this.endgame();
            
             this.nextturn();
  
           } else {
             this.cpmove();
           }
       } else 
         this.cpmove();

       }
   },

     RandomNumber(min, max){
       return Math.floor(Math.random() * (max - min)) + min;
     },

     setboardValue(linha, coluna){

       var self = this;

       this.board.forEach(function(l, i) {

         l.forEach(function(c, j) {
          
           if(i == linha && j == coluna){
             //alterar valor da matrix com a linha e coluna passados por parametro
             l.splice(j, 1, self.turn);
           }
         });
       });
     },

     nextturn() {
       if(this.started){
           this.turn = this.turn === this.player1 ? this.player2 : this.player1
       } 
     },
    

     clean(){
       console.log('clean call');
       this.modojogo = ''
       this.board = [
         ['','','']
         ,
         ['','','']
         ,
         ['','','']
       ]
       document.getElementById('radio-2').checked = false;
     },
     
     invalidmove(linha, coluna){

       if(!this.started) return true;
     
       if(this.board[linha][coluna] != ''){
         return true;
       }  

         return false;
    
     },
    
     combinacoesVencer(){

       if(this.board[0][0] === this.board[0][1] &&
         this.board[0][1] === this.board[0][2] && this.board[0][0] != ''){
         return true
       }
       if(this.board[1][0] === this.board[1][1] &&
         this.board[1][1] === this.board[1][2] && this.board[1][0] != ''){
           return true
       }
       if(this.board[2][0] === this.board[2][1] &&
         this.board[2][1] === this.board[2][2] && this.board[2][0] != ''){
           return true
       }
       if(this.board[0][0] === this.board[1][0] &&
         this.board[1][0] === this.board[2][0] && this.board[0][0] != ''){
           return true
       }
       if(this.board[0][1] === this.board[1][1] &&
         this.board[1][1] === this.board[2][1] && this.board[0][1] != ''){
           return true
       }
       if(this.board[0][2] === this.board[1][2] &&
         this.board[1][2] === this.board[2][2] && this.board[0][2] != ''){
           return true
       }
       if(this.board[0][0] === this.board[1][1] &&
         this.board[1][1] === this.board[2][2] && this.board[0][0] != ''){
           return true
       }
       if(this.board[0][2] === this.board[1][1] &&
         this.board[1][1] === this.board[2][0] && this.board[0][2] != ''){
           return true
       }
       return false
     },

    isboardfull(){
      return this.board.every(linha => linha.every(coluna => coluna!= ''));
    },

    endgame(){
      if(this.combinacoesVencer() == true){
        this.started = false;
        console.log(this.combinacoesVencer())
        if(this.turn == 'X'){
          alert('O player1 ganhou o jogo, parabénnnsssss!!!')
        }
        if(this.turn == 'O'){
          alert('O player2 ganhou o jogo, parabénnnsssss!!!')
        }
        this.started = false;
      }
      if(this.isboardfull() == true){
        alert('Empateee, ninguém ganhou!!!')
      }
    },
   }
 };

 </script>

