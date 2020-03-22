import Module from './decode.js'
const module = Module()

export default class oggmentedAudioContext extends (window.AudioContext || window.webkitAudioContext) {
    // need the setPrototypeOf due to this issue:
    // https://stackoverflow.com/questions/58471434/problem-extending-native-es6-classes-in-safari
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, oggmentedAudioContext.prototype);
    }
    decodeAudioData(buffer) {
        return new Promise((resolve, reject) => {
            try {
                const outbuffer = module.audioBufferFromOggBuffer(buffer, resolve)
            } // Defer to WebAudio if there's an error
            catch {
                console.log("whoops")
                super.decodeAudioData(buffer)
                    .then(decodedBuffer => resolve(decodedBuffer))
                    .then(decodedBuffer => resolve(decodedBuffer))
            }
        })
    }

    decodeAudioDataSync(buffer) {
        return module.audioBufferFromOggBuffer(buffer)
    }
}


