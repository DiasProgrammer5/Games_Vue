<template>
    <div v-if="question">
        <v-row justify-md="start">
            <h3> Category: {{ question.category }} </h3>
        </v-row><br /> 
        <v-row justify-md="start">
            <h4> Type: {{ question.type }} </h4>
        </v-row><br /> 
         <v-row justify-md="start">
            <h4> Difficulty: {{ question.difficulty }} </h4>
        </v-row><br /><br />
        <v-row justify-md="center">
            <h2 v-html="question.question"> </h2>
        </v-row><br /><br />
        <div v-for="a in answers " :key="a" style="display: flex;">
            <v-btn 
                v-bind:color="a === answer ? 'primary' : ''"
                v-on:click = "reply(a)" 
                elevation="2"
                outlined
                text
            >{{a}}</v-btn></div><br /><br /><br />
        <v-btn v-on:click = "submeter"
            elevation="3"
            outlined
            rounded
            text
        >Submit</v-btn>
      </div>  
</template>

<script>

export default {
  name: 'question-game',
  props: ['question'],
data() {
    return{
        answers: [],
        answer : null,
        correctanswers: [],
    };
  },
  mounted(){

    var self = this;
   

    this.answers.push(this.question.correct_answer);
    this.question.incorrect_answers.forEach(function(answer){
    self.answers.push(answer);
    })
    this.shuffleArray(this.answers)

  },

   methods: {
    submeter(){
        //emitir evento para o pai saber o que fazer
        this.$emit('answeruser', this.answer)
        
    },

    shuffleArray(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
    },
    reply(a){
        console.log(a);
        this.answer = a;        
    }
   },
   watch : {

       question() {

        var self = this;

        this.answers = [];
        this.correctanswers = [];

        if(this.question){

            this.answers.push(this.question.correct_answer);
            this.question.incorrect_answers.forEach(function(answer){
                self.answers.push(answer);
            })
            this.shuffleArray(this.answers)
        }


       }
   }
}

</script>