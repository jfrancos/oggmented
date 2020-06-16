# oggmented
oggmented `extends` AudioContext and overrides `decodeAudioData` to use an Emscripten transpiling of libogg-1.3.4 and libvorbis-1.3.6 when it encounters ogg vorbis data.

This allows you to [`decodeAudioData`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) an ogg vorbis buffer, correctly in any browser.  This is especially useful in Safari and iOS browsers, which don't `decodeAudioData(oggVorbisBuffer)` at all.

In addition, [Blink](https://en.wikipedia.org/wiki/Blink_(browser_engine)) (Brave, Opera, Chrome) uses ffmpeg, which has [a bug that slightly bloats the end of decoded vorbis audio](https://trac.ffmpeg.org/ticket/6367), resulting in clicks when `audioContext.createBufferSource().loop === true`.  Using this package fixes that.


# Installation
`npm install oggmented`

# Usage
Use it like you would regular AudioContext:
```
import oggmentedAudioContext from 'oggmented'

const audioCtx = new oggmentedAudioContext()
// instead of 
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
```
