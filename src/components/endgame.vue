<template>
    <div>
       <v-simple-table
            fixed-header
        >
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">
                    Questions
                </th>
                <th class="text-left">
                    Correct answer
                </th>
                <th class="text-left">
                    Your answer
                </th>
                <th class="text-left">
                    Result
                </th>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(question, index) in questions"
                :key="question.name"
                >
                <td v-html="question.question"></td>
                <td>{{ question.correct_answer }}</td>
                <td>{{ answers[index] }}</td>
                <td>{{ question.correct_answer === answers[index] ? 'correct (1)' : 'Incorrect (0)'}}</td>
                </tr>
                <tr>
                    <td colspan="4"> Points: {{ calculatePoints() }}  </td>
                </tr>
            </tbody><br />
            </template>
        </v-simple-table>
    </div>    
</template>

<script>

export default {
  name: 'end-game',
  props: ['questions', 'answers'],
    data() {
        return{
        
        };
    },
    methods: {
        calculatePoints(){

            var points = 0;

            var self = this;


            this.questions.forEach(function(question, index) {

                if(question.correct_answer === self.answers[index]){
                    points ++;
                }

            });

             return points;             
        },
    }
}
</script>