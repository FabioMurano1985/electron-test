const axios = require('axios');


const URL="https://jsonplaceholder.typicode.com/todos/1"



const call=()=> axios(URL)

console.log(call)

      module.exports.call=call
      
     



