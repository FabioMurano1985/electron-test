const axios = require('axios');
const { ipcRenderer } = require('electron')


// const URL="https://jsonplaceholder.typicode.com/todos/1"



// const call=()=> axios(URL)

const mainAlert=(msg,type)=>{
  ipcRenderer.invoke('open-dialog',msg,type ||"" )
}

     

const printPdf=(base64)=>{
    const byteArray = new Uint8Array(
      atob(base64)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }


  module.exports={printPdf,mainAlert}