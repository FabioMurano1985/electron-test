const {ipcRenderer} = require('electron')
const call = require('./app').call
const {textArea} = require('./converter')




// document.getElementById('login-button').addEventListener('click',()=>{
    
    
//     // ipcRenderer.invoke('open-modal', "someArgument").then((result) => {
//         //   })
        
    
//     })
    
    document.getElementById('save').addEventListener('click',()=>{
        const textAreaValue=textArea.value || ""
        if(!textAreaValue){
            ipcRenderer.invoke('no-blank-value',textAreaValue)
            return;
        }        
         ipcRenderer.invoke('save-file',textAreaValue)
         
})


// document.getElementById('call-api-button').addEventListener('click',()=>{


//     // ipcRenderer.invoke('open-modal', "someArgument").then((result) => {
//     //   })

// call()
      
// })



    