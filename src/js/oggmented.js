import Module from './decode.js'
const oggModule = Module()

export class OggmentedAudioContext extends (window.AudioContext || window.webkitAudioContext) {
    // need the setPrototypeOf due to this issue:
    // https://stackoverflow.com/questions/58471434/problem-extending-native-es6-classes-in-safari
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, OggmentedAudioContext.prototype);
    }
    decodeAudioData(buffer, callback) {
        const decode = resolve => {
            try {
                oggModule.audioBufferFromOggBuffer(buffer, resolve)
            } // Defer to WebAudio if there's an error
            catch { // broken until this works with webpack
                // const decodedBuffer = await super.decodeAudioData(buffer)
                // resolve(decodedBuffer)
            }
        }
        if (callback) {
            decode(callback)
        } else {
            return new Promise(decode)
        }
    }

    decodeAudioDataSync(buffer) {
        return oggModule.audioBufferFromOggBuffer(buffer)
    }
}

export default OggmentedAudioContext