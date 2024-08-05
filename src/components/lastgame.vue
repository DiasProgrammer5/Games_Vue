<template>
    <div>
        <v-row justify-md="center">
            <h1> Pedra Papel ou Tesoura </h1>
        </v-row><br /><br />
            <h3> Quantas rondas deseja jogar?  </h3>
        
            <v-text-field type="number" v-model.number="numberofrounds"></v-text-field>

            <v-btn v-on:click = "play"
                elevation="2"
                large
                text
            > 
            Jogar 
            </v-btn><br /><br /><br />  

            <div v-if = "start">

                <v-simple-table >
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            User
                        </th>
                        <th class="text-left">
                            PC
                        </th>
                        <th class="text-left">
                            Quem venceu
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(a) in jogadas " :key="a.name" >
                        <td> 
                        <v-btn  
                        v-bind:color="a.options[0] === a.user ? 'primary' : ''"
                        v-on:click = "choiceuser(a, 0)" 
                        elevation="2"
                        outlined
                        text
                        :disabled="a.finish"
                        >
                        {{a.options[0]}} 
                        </v-btn>
                        <v-btn 
                        v-bind:color="a.options[1] === a.user ? 'primary' : ''"
                        v-on:click = "choiceuser(a, 1)" 
                        elevation="2"
                        outlined
                        text
                        :disabled="a.finish"
                        >
                        {{a.options[1]}}
                        </v-btn>
                        <v-btn 
                        v-bind:color="a.options[2] === a.user ? 'primary' : ''"
                        v-on:click = "choiceuser(a, 2)" 
                        elevation="2"
                        outlined
                        text
                        :disabled="a.finish"
                        >
                        {{a.options[2]}}
                        </v-btn>
                        </td>
                        <td>{{ a.pc }}</td>
                        <td>{{ a.result }}</td>
                        </tr>
                        <tr>
                            <td colspan="4"> Pontos finais: {{ finalpontos }}  </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>    
            </div>
    </div>

</template>

<script>


export default {
  name: 'last-game',
    data() {
        return {
            numberofrounds: 0,
            jogadas: [],
            options: ['Pedra', 'Papel', 'Tesoura'],
            start: false,
            finalpontos: 0
        }
    },

    methods: {
        play(){

            this.jogadas = []
            this.finalpontos = 0

            this.start = true
            for(var i=0; i< this.numberofrounds; i++){
                this.jogadas.push( { user : null, pc : null, finish: false, points: 0, result : '', options : this.options} )
                console.log(this.jogadas)
            } 
        },

        choiceuser(a, choise){
            console.log(a);

            a.user = this.options[choise];
            
            this.choicepc(a) 
            this.updatepoints();
        },

        choicepc(a){

            if(!a.finish){

                var rand = Math.floor(Math.random() * this.options.length);
                a.pc = this.options[rand];
                a.finish = true;
                this.winner(a);
            }

        },

        winner(a){
           if(a.user === 'Pedra'){
                if(a.pc === 'Pedra'){
                    a.points = 1
                    a.result = 'Empate(1)'
                    a.finish = true
                }
            } 
            if(a.user === 'Papel'){
                if(a.pc === 'Papel'){
                    a.points = 1
                    a.result = 'Empate(1)'
                    a.finish = true
                }
            } 
            if(a.user === 'Tesoura'){
                if(a.pc === 'Tesoura'){
                    a.points = 1
                    a.result = 'Empate(1)'
                    a.finish = true
                }
            } 
            if(a.user === 'Pedra'){
                if(a.pc === 'Papel'){
                    a.points = 0
                    a.result = 'PC(0)'
                    a.finish = true
                }
            } 
            if(a.user === 'Pedra'){
                if(a.pc === 'Tesoura'){
                    a.points = 3
                    a.result = 'User(3)'
                    a.finish = true
                }
            } 
            if(a.user === 'Papel'){
                if(a.pc === 'Pedra'){
                    a.points = 3
                    a.result = 'User(3)'
                    a.finish = true
                }
            }
            if(a.user === 'Papel'){
                if(a.pc === 'Tesoura'){
                    a.points = 0
                    a.result = 'PC(0)'
                    a.finish = true
                }
            } 
            if(a.user === 'Tesoura'){
                if(a.pc === 'Pedra'){
                    a.points = 0
                    a.result = 'PC(0)'
                    a.finish = true
                }
            } 
            if(a.user === 'Tesoura'){
                if(a.pc === 'Papel'){
                    a.points = 3
                    a.result = 'User(3)'
                    a.finish = true
                }
            } 

        },

        updatepoints(){
            var self = this;
            self.finalpontos = 0;
            
            this.jogadas.forEach(function(a) {
               self.finalpontos = self.finalpontos + a.points
               console.log(a.points)
            });

            //return this.finalpontos;        
        }
    }
}
</script>
