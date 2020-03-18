import oggmentedAudioContext from './oggmented'

const audioCtx = new oggmentedAudioContext()
fetch('decode.wasm')
    .then(response => response.arrayBuffer())
    .then(response => {
        const audioBuffer = audioCtx.decodeAudioDataSync(response)
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioCtx.destination);
        source.start()
    })
