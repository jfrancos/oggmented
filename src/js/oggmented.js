import Module from './oggmented-wasm.js'
import silence from './silence.ogg'

export class OggmentedAudioContext extends (window.AudioContext || window.webkitAudioContext) {
    // need the setPrototypeOf due to this issue:
    // https://stackoverflow.com/questions/58471434/problem-extending-native-es6-classes-in-safari
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, OggmentedAudioContext.prototype);
    }
    nativeVorbisLevel() {
        return new Promise(resolve => { // Let's memoize this in e.g. this.vorbisLevel
            fetch(silence)
                .then(response => response.arrayBuffer())
                .then(buffer => super.decodeAudioData(buffer)).catch(() => resolve('webkit'))
                .then(decodedBuffer => {
                    const { length, numberOfChannels } = decodedBuffer
                    if (length === 1
                        && numberOfChannels === 1
                        && decodedBuffer.getChannelData(0)[0] === 0) {
                        resolve('gecko')
                    } else {
                        resolve('blink')
                    }
                })
        })
    }
    decodeAudioData(buffer, callback) {
        const decode = resolve => {
            Module().then(oggmented => {
                try {
                    oggmented.decodeOggData(buffer, resolve)
                }
                catch { // Defer to native AudioContext on error
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
        return oggmented.decodeOggData(buffer)
    }
}

export default OggmentedAudioContext