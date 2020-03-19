import Module from './decode.js'
const module = Module()

export default class oggmentedAudioContext extends (window.AudioContext || window.webkitAudioContext) {
    decodeAudioData(buffer) {
        return new Promise((resolve, reject) => {
            try {
                const outbuffer = module.audioBufferFromOggBuffer(buffer, () => resolve(outbuffer))
            } // Defer to WebAudio if there's an error
            catch {
                super.decodeAudioData(buffer)
                    .then(decodedBuffer => resolve(decodedBuffer))
            }
        })
    }

    decodeAudioDataSync(buffer) {
        return module.audioBufferFromOggBuffer(buffer)
    }
}