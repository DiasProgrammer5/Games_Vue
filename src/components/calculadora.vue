<template>
  <v-row justify="center">

    <div>
    
        <h2> Calculadora </h2><br />

          <v-text-field v-model="numero" disabled
                :rules="rules"
                hide-details="auto"
          ></v-text-field>

          <span> {{ operador }}</span><br /><br />
      
          <div v-for="operator in calculatorElements" :key="operator"> 
            
          <v-btn v-on:click = "action(operator)"
            elevation="2"
            fab
            large
            outlined
            rounded

          v-for="operator in operator.oper" :key="operator"
          >{{ operator }}</v-btn>
          </div><br />
              
          <div v-for="linha in calculatorNumbers" :key="linha">

          <v-btn v-on:click = "inputnumber(number)"
              color="secondary"
              elevation="2"
              large
              text
              tile
          v-for="number in linha.botoes" :key="number"
          >{{ number }}</v-btn>
          </div> 
    </div>
  </v-row>
</template>

<script>

export default {
  name: 'multi-calculator',
data() {
    return {
      numero: '',
      numeroanterior: 0,
      result: 0,
      operador: null,
      numbers: '',
      calculatorElements: [
        {
          oper : ['clear','*','/']
        },
        {
          oper : ['-','+','=']
        },

      ],   
      
      calculatorNumbers: [
        {
          botoes : [7,8,9]
        },
        {
          botoes : [4,5,6]
        },
        {
          botoes : [1,2,3]
        },
        {
          botoes : [0,'.']
        },
      ],
    }
  },
  methods: {
    inputnumber(number){

      this.numero +=  number;

     },
    action(n){

        console.log(n);

        if(n === 'clear'){
          this.numero = '';
          this.operador = '';
          this.result = 0;
          this.numeroanterior = 0;
        }
        
        if(['/','*','-','+'].includes(n)){
          this.operador = n;
          this.numeroanterior = this.numero;
          this.numero = ''
        } 

        if(n === '='){

            switch(this.operador){

            case '+':
              this.result = parseFloat(this.numeroanterior)  + parseFloat(this.numero);
              
            break;
            case '-':
              this.result = parseFloat(this.numeroanterior) - parseFloat(this.numero);
          
            break;
            case '*':
              this.result = parseFloat(this.numeroanterior) * parseFloat(this.numero);
          
            break;
            case '/':
              this.result = parseFloat(this.numeroanterior) / parseFloat(this.numero);
            break;
          }

          this.numero = this.result;
         
        } 
      
    } 
  }
}
</script>
