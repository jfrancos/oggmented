# oggmented
An AudioContext subclass that uses an Emscripten transpiling of libogg-1.3.4 and libvorbis-1.3.6 to `decodeAudioData(oggVorbisBuffer)` correctly in any browser (e.g. Safari and iOS browsers).

The AudioContext in Safari and all iOS browsers doesn't support decoding ogg vorbis, and [Blink](https://en.wikipedia.org/wiki/Blink_(browser_engine)) (Brave, Opera, Chrome) uses ffmpeg, which has [a bug that slightly bloats the end of decoded vorbis audio](https://trac.ffmpeg.org/ticket/6367), resulting in clicks when `audioContext.createBufferSource().loop === true`


