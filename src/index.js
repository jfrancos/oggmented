import Module from './decode.js'


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const newAudioCtx = Module()
        fetch('gm.ogg')
            .then(response => response.arrayBuffer())
            .then(response => {
                const audioBuffer = newAudioCtx.audioBufferFromOggBuffer(response)
                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioCtx.destination);
                source.start()
            })
