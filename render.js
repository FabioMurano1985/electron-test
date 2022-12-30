const {ipcRenderer} = require('electron')
const call = require('./app').call


document.getElementById('login-button').addEventListener('click',()=>{


    // ipcRenderer.invoke('open-modal', "someArgument").then((result) => {
    //   })


      
})


document.getElementById('call-api-button').addEventListener('click',()=>{


    // ipcRenderer.invoke('open-modal', "someArgument").then((result) => {
    //   })

call()
      
})



    