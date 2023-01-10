const jwtDecode = require("jwt-decode");
const {Base64} = require('js-base64');
const xmlFormat = require('xml-formatter');
const { clipboard } = require('electron')
const { mainAlert } = require('./utils/utils')



const _textArea = document.getElementById('textarea');

//UTILS
const isEmpty = (value) => {
    if (!value) {
      mainAlert('il campo non può essere vuoto','error')
     
        return true;
    }
}




//BUTTONS
const reset = document.getElementById('reset');
const copy = document.getElementById('copy');

const formatJSON = document.getElementById('format-json-button');
const formatXML = document.getElementById('format-xml-button');
const validateJSON = document.getElementById('validate-json-button');
const DecodeJWT = document.getElementById('decodejwt-button');
const base64toString = document.getElementById('convertb64-to-string-button');
const stringTobase64 = document.getElementById('convert-string-tob64-button');


let value = "";
let token = "";

_textArea.onfocus = () => {
    if(!!_textArea.value){
        clipboard.readText()
        return;
    } 
    const text = clipboard.readText()
    _textArea.value = text
}

//Handle events
formatJSON.onclick = ((ev) => {
    if (isEmpty(_textArea.value)) return;
    try {
        value = _textArea.value
        const json = JSON.stringify(JSON.parse(value), null, 2)
        _textArea.value = json

    } catch (error) {

        mainAlert('il formato non è corretto, inserisci un JSON','error');
    }

})
formatXML.onclick = ((ev) => {
    if (isEmpty(_textArea.value)) return;
    try {
        value = _textArea.value
        const xml = xmlFormat(value)
        _textArea.value = xml

    } catch (error) {

        mainAlert('il formato non è corretto, inserisci un XML','error');
        return;
    }

})


validateJSON.onclick = ((ev) => {
    if (isEmpty(_textArea.value)) return;
    try {
        value = _textArea.value
        JSON.stringify(JSON.parse(value), null, 2)

    } catch (error) {

        mainAlert('il valore inserito non risulta essere un JSON','error');
        return;
    }
   
})

DecodeJWT.onclick = ((ev) => {
    if (isEmpty(_textArea.value)) return;
    try {
        token = _textArea.value
        const tokenDecoded = jwtDecode(token)
        _textArea.value = JSON.stringify(tokenDecoded)

    } catch (error) {
        mainAlert('errore conversione','error')
    }

})

reset.onclick = ((ev) => {
    _textArea.value = ""

})

copy.onclick = ((ev) => {
    if (!_textArea.value) return;
    const text = clipboard.writeText(_textArea.value)

})


base64toString.onclick = ((ev) => {
    value = _textArea.value.trim();
    if (isEmpty(value)) return;
    // if (!isBase64(value)) {
    //     mainAlert('non è un formato base64')
    //     return
    // }
    try {

        let res = Base64.decode(value);
        _textArea.value = res;


    } catch (error) {
        mainAlert('errore conversione','error')
    }

})

stringTobase64.onclick = ((ev) => {
    value = _textArea.value.trim();
//     if (isBase64(value)) {
//    mainAlert('il formato attuale è già base64')
//         return;
//     }
    if (isEmpty(value)) return;
    try {

        let res = Base64.encode(value);
        _textArea.value = res;


    } catch (error) {
        mainAlert('errore conversione','error')
    }

})


module.exports = { textArea: _textArea }



