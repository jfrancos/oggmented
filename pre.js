require("setImmediate")
// decodeModule = './decode.wasm'

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// Do the tests here, (encode in the browser?): https://trac.ffmpeg.org/ticket/6367

// Module['locateFile'] = path => {
//     if (path.endsWith('.wasm')) {
//         return decodeModule;
//     }
//     return path;
// }




Module['audioBufferFromOggBuffer'] = buffer => {
    // Necessary for -closure 1
    // Module.HEAPU32 = Module['HEAPU32']
    // Module.HEAPF32 = Module['HEAPF32']
    // Module.HEAP8 = Module['HEAP8']
    // Module.ccall = Module['ccall']
    // Module.getValue = Module['getValue']
    // Module._malloc = Module['_malloc']
    // Module._get_length = Module['_get_length']
    // Module._get_channels = Module['_get_channels']
    // Module._get_rate = Module['_get_rate']
    // Module._read_float = Module['_read_float']

    console.time("WasmDecode")
    const openBuffer = (inbuffer) => {
        const size = inbuffer.byteLength
        const buffer = Module._malloc(size)
        const bufferView = new Int8Array(inbuffer)
        Module.HEAP8.set(bufferView, buffer)
        Module.ccall('open_buffer', 'number', ['number', 'number'], [buffer, size])
        return {
            length: Module._get_length(),
            channels: Module._get_channels(),
            rate: Module._get_rate()
        }
    }
    const info = openBuffer(buffer)
    // const { length, channels, rate } = info
    // console.log(length)
    const channels = info.channels
    const length = info.length
    const rate = info.rate
    const audioBuffer = audioCtx.createBuffer(channels, length, rate);
    const ppp_pcm = Module._malloc(Uint32Array.BYTES_PER_ELEMENT)
    let index = 0;
    const block = () => {
        const time = Date.now()
        let samplesRead = 0;
        while (samplesRead = Module._read_float(ppp_pcm)) {
            const pp_pcm = Module.getValue(ppp_pcm, '*')
            const pp_pcm_view = new Uint32Array(Module.HEAPU32.buffer, pp_pcm, channels)
            for (let channel = 0; channel < channels; channel++) {
                const p_pcm = pp_pcm_view[channel]
                const p_pcm_view = new Float32Array(Module.HEAPF32.buffer, p_pcm, samplesRead)
                audioBuffer.copyToChannel(p_pcm_view, channel, index);
            }
            index += samplesRead
            if (time + 8 < Date.now()) {
                window.setImmediate(block)
                break
            }
        }
        if (samplesRead === 0) {
            console.timeEnd("WasmDecode")
            for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
                console.log(audioBuffer.getChannelData(i))
            }
        }
    }
    setImmediate(block)
    return audioBuffer
}