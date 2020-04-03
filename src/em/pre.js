require("setimmediate")

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
Module['audioBufferFromOggBuffer'] = (buffer, callback) => {
    const openBuffer = (inbuffer) => {
        const size = inbuffer.byteLength
        const buffer = _malloc(size)
        const bufferView = new Int8Array(inbuffer)
        HEAP8.set(bufferView, buffer)
        const retval = ccall('open_buffer', 'number', ['number', 'number'], [buffer, size])
        // console.log(String.fromCharCode(...bufferView.slice(0, 4)))
        // if (retval !== 0) {
        //     throw "Vorbis could not decode buffer"
        // }
        return {
            channels: _get_channels(),
            length: _get_length(),
            rate: _get_rate()
        }
    }
    const { channels, length, rate } = openBuffer(buffer);
    const audioBuffer = audioCtx.createBuffer(channels, length, rate);
    const ppp_pcm = _malloc(Uint32Array.BYTES_PER_ELEMENT)
    let index = 0;
    const block = () => {
        const time = Date.now()
        let samplesRead;
        while (samplesRead = _read_float(ppp_pcm)) {
            const pp_pcm = getValue(ppp_pcm, '*')
            const pp_pcm_view = new Uint32Array(HEAPU32.buffer, pp_pcm, channels)
            for (let channel = 0; channel < channels; channel++) {
                const p_pcm = pp_pcm_view[channel]
                const p_pcm_view = new Float32Array(HEAPF32.buffer, p_pcm, samplesRead)
                //copyToChannel is preferable to/faster than getChannelData.set but doesn't work in safari
                audioBuffer.getChannelData(channel).set(p_pcm_view, index);
            }
            index += samplesRead
            if (time + 8 < Date.now()) {
                window.setImmediate(block)
                break
            }
        }
        if (samplesRead === 0) {
            callback && callback(audioBuffer)
        }
    }
    setImmediate(block)
    return audioBuffer
}