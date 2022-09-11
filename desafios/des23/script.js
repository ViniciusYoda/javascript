const textarea = document.querySelector('#text')
let voiceList = document.querySelector('#voice')
let speechBtn = document.querySelector('.submit')

let synth = speechSynthesis
let isSpeaking = true

function voicespeach() {
    for(let voice of synth.getVoices()) {
        let option = document.createElement('option')
        option.text = voice.name
        voiceList.add(option)
        console.log(option);
    }
}

synth.addEventListener('voiceschanged', voicespeach)

function texttospeech(text) {
    let utternace = new SpeechSynthesisUtterance(text)
    for(let voice of synth.getVoices()) {
        if (voice.name == voiceList.value) {
            utternace.voice = voice
        }
    }
    speechSynthesis.speak(utternace)
}