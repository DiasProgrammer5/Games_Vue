<template>
    <div>
        <v-row justify-md="center">
            <h1> Trivia Game </h1>
        </v-row><br /><br />
        <div v-if = "begin === false">  
            <div v-if = "end === false">
                <h3> How many questions do you want to answer?  </h3>
            
                <v-text-field type="number" v-model.number="numberofquestions"></v-text-field>
                <h3> Press the start button to start the game! </h3>
                <v-btn v-on:click = "start"
                    elevation="2"
                    large
                    text
                > Start </v-btn>
            </div>
        </div>
        <div v-if = "begin">
            <question-game :question="currentQuestion" @answeruser="answer($event)">  </question-game>
        </div>
        <div v-if = "end">
            <end-game :questions = "questions" :answers = "answersuser" >  </end-game>
             <v-btn v-on:click = "reset"
                depressed
                color="primary"
            >
                New Game
            </v-btn>
        </div>

    </div>    
</template>

<script>

import axios from 'axios';

export default {
  name: 'trivia-game',
data() {
    return{
        questions : null,
        begin: false,
        triviagame: true,
        currentQuestion : null,
        numberofquestions: 0,
        currentstep : 0,
        answersuser: [],
        end: false,
    };
  },
   methods: {
       start(){


      var self = this;

        axios.get('https://opentdb.com/api.php?amount='+self.numberofquestions).then(function(response){

            console.log(response);
            self.begin = true
            self.triviagame = false
            self.questions = response.data.results;
            self.currentQuestion = self.questions[self.currentstep];

        });     
       },

    answer(event){
        console.log(event)
        if(this.currentstep != this.numberofquestions){
            this.answersuser.push(event)
            this.currentstep ++
            this.currentQuestion = this.questions[this.currentstep]

            //verificar se jogo acabou
            if(this.currentstep == this.numberofquestions){

                this.begin = false
                this.triviagame = false
                this.end = true
            }

        }
    },
    reset(){
        this.questions = null,
        this.begin = false,
        this.triviagame = true,
        this.currentQuestion = null,
        this.numberofquestions = 0,
        this.currentstep = 0,
        this.answersuser = [],
        this.end = false
    }
   }
}
</script>
