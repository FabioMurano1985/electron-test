const {ipcRenderer} = require('electron')
const isBase64 = require('is-base64');
const {printPdf} = require('./utils/utils')
const {textArea} = require('./converter')


    document.getElementById('save').addEventListener('click',()=>{
        const textAreaValue=textArea.value || ""
        if(!textAreaValue){
            ipcRenderer.invoke('no-blank-value',textAreaValue)
            return;
        }        
         ipcRenderer.invoke('save-file',textAreaValue)
         
})


  

    document.getElementById('view-pdf').addEventListener('click',()=>{
        const textAreaValue=textArea.value || ""
        if(!textAreaValue){
           // ipcRenderer.invoke('no-blank-value',textAreaValue)
           alert('per visualizzare il pdf è necessario inserire un base64 nella textarea.')
            return;
        }      
        if(!isBase64(textAreaValue)){
            alert('il formato deve essere basa64')
            return;
        }      
        printPdf(textAreaValue)
         
})


//ALWAYS ACTIVE
ipcRenderer.on('always-active', function (evt, message) {
    document.getElementById('is-always-active').style.minWidth="60px"
    document.getElementById('is-always-active').style.width="60px"
    if(!message.isActive){
        document.getElementById('is-always-active').innerHTML = 'active';
        document.getElementById('is-always-active').title="modalità risparmio attiva"  
    }else{      
        document.getElementById('is-always-active').innerHTML = 'not active';
        document.getElementById('is-always-active').title="modalità risparmio non attiva"
    }
    console.log(message)
});

// ONLINE/OFFLINE
const updateOnlineStatus = () => {
    document.getElementById('status').style.minWidth="35px";
    document.getElementById('status').style.width="35px";
    if(navigator.onLine ){
        document.getElementById('status').innerHTML = 'online';
        document.getElementById('status').title="sei online"
        
    }else{
        
        document.getElementById('status').innerHTML = 'offline';
        document.getElementById('status').title="sei offline"
    }
  }
  
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  
  updateOnlineStatus()

