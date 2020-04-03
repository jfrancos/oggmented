import Module from './decode.js'
const module = Module()

export class OggmentedAudioContext extends (window.AudioContext || window.webkitAudioContext) {
    // need the setPrototypeOf due to this issue:
    // https://stackoverflow.com/questions/58471434/problem-extending-native-es6-classes-in-safari
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, OggmentedAudioContext.prototype);
    }
    decodeAudioData(buffer, callback) {
        const decode = resolve => {
            module.then(Module => {
                try {
                    Module.audioBufferFromOggBuffer(buffer, resolve)
                } // Defer to WebAudio if there's an error
                catch {
                    super.decodeAudioData(buffer, resolve)
                }
            })
        }
        if (callback) {
            decode(callback)
        } else {
            return new Promise(decode)
        }
    }

    decodeAudioDataSync(buffer) {
        return Module.audioBufferFromOggBuffer(buffer)
    }
}

export default OggmentedAudioContext