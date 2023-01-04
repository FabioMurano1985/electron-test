const jwtDecode =require("jwt-decode");
const base64 = require('base64topdf');
const isBase64 = require('is-base64');
const { clipboard } = require('electron')


const _textArea = document.getElementById('textarea');

//UTILS
const isEmpty=(value)=>{
    if(!value){
        alert('il campo non può essere vuoto');
        return true;
    }
}


//BUTTONS
const formatJSON = document.getElementById('format-button');
const DecodeJWT = document.getElementById('decodejwt-button');
const base64toString = document.getElementById('convertb64-to-string-button');
const reset = document.getElementById('reset');
const copy = document.getElementById('copy');


let value = "";
let token = "";

_textArea.onfocus=()=>{
    const text = clipboard.readText()
    _textArea.value=text
}

//Handle events
formatJSON.onclick = ((ev) => {
    if(isEmpty(_textArea.value)) return;
    try {
        value=_textArea.value
        const json = JSON.stringify(JSON.parse(value), null, 2)
        _textArea.value = json
        
    } catch (error) {
        
        alert('errore formato')
    }

})

DecodeJWT.onclick = ((ev) => {
    if(isEmpty(_textArea.value)) return;
    try {
        token=_textArea.value
        const tokenDecoded = jwtDecode(token)
        _textArea.value = JSON.stringify(tokenDecoded)
        
    } catch (error) {
        alert('errore conversione')
    }

})

reset.onclick = ((ev) => {
  _textArea.value=""

})

copy.onclick = ((ev) => {
    if(!_textArea.value) return;
    const text = clipboard.writeText(_textArea.value)

})


base64toString.onclick = ((ev) => {
    if(isEmpty(_textArea.value)) return;
    value=_textArea.value.trim();
    if(!isBase64(value)){
    alert('non è un formato base64')
    value="";
    _textArea.value="";
    return
    }
    try {
    
        let res = base64.base64ToStr(value);
                _textArea.value = res;

        
    } catch (error) {
        alert('errore conversione')
    }

})


module.exports={textArea:_textArea}



