require ("setimmediate")

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

Module['audioBufferFromOggBuffer'] = (buffer, callback) => {
    const {
        HEAPF32,
        HEAPU32,
        HEAP8,
        ccall,
        getValue,
        _malloc,
        _get_length,
        _get_channels,
        _get_rate,
        _read_float
    } = Module
    const openBuffer = (inbuffer) => {
        const size = inbuffer.byteLength
        const buffer = _malloc(size)
        const bufferView = new Int8Array(inbuffer)
        HEAP8.set(bufferView, buffer)
        ccall('open_buffer', 'number', ['number', 'number'], [buffer, size])
        return {
            channels: _get_channels(),
            length: _get_length(),
            rate: _get_rate()
        }
    }
    const {channels, length, rate} = openBuffer(buffer);
    const audioBuffer = audioCtx.createBuffer(channels, length, rate);
    const ppp_pcm = _malloc(Uint32Array.BYTES_PER_ELEMENT)
    let index = 0;
    const block = () => {
        const time = Date.now()
        let samplesRead = 0;
        while (samplesRead = _read_float(ppp_pcm)) {
            const pp_pcm = getValue(ppp_pcm, '*')
            const pp_pcm_view = new Uint32Array(HEAPU32.buffer, pp_pcm, channels)
            for (let channel = 0; channel < channels; channel++) {
                const p_pcm = pp_pcm_view[channel]
                const p_pcm_view = new Float32Array(HEAPF32.buffer, p_pcm, samplesRead)
                audioBuffer.copyToChannel(p_pcm_view, channel, index);
            }
            index += samplesRead
            if (time + 8 < Date.now()) {
                window.setImmediate(block)
                break
            }
        }
        if (samplesRead === 0) {
            callback && callback()
        }
    }
    setImmediate(block)
    return audioBuffer
}