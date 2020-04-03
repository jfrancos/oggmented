import oac from '../dist/oggmented-bundle'
import chai from 'chai'
import Bowser from "bowser"
const expect = chai.expect;

const audioCtx = new oac()
describe('Using oggmented audio context', function () {
    describe('Decoding silence.wav', function () {
        let response, fileBuffer, buffer
        const browser = Bowser.getParser(window.navigator.userAgent);

        audioCtx.nativeVorbisLevel().then(level => console.log(browser.getBrowserName(), level))
        before(async () => {
            response = await fetch('base/test/silence.wav')
            fileBuffer = await response.arrayBuffer()
        })

        beforeEach(function () {
            buffer = fileBuffer.slice()
        })

        it('should resolve correct audioBuffer', async function () {
            let audioBuffer
            audioBuffer = await audioCtx.decodeAudioData(buffer)
            expect(audioBuffer.length).equal(1)
            expect(audioBuffer.getChannelData(0)[0]).equal(0)
        })

        it('should send correct audioBuffer to callback', async function () {
            const audioBuffer = await new Promise(resolve => audioCtx.decodeAudioData(buffer, resolve))
            expect(audioBuffer.length).equal(1)
            expect(audioBuffer.getChannelData(0)[0]).equal(0)
        })
    })

    describe('Decoding silence.ogg', function () {
        let response, fileBuffer, buffer

        before(async function () {
            response = await fetch('base/test/silence.ogg')
            fileBuffer = await response.arrayBuffer()
        })

        beforeEach(function () {
            buffer = fileBuffer.slice()
        })

        it('should resolve correct audioBuffer', async function () {
            const audioBuffer = await audioCtx.decodeAudioData(buffer)
            expect(audioBuffer.length).equal(1)
            expect(audioBuffer.getChannelData(0)[0]).equal(0)
        })

        it('should send correct audioBuffer to callback', async function () {
            const audioBuffer = await new Promise(resolve => audioCtx.decodeAudioData(buffer, resolve))
            expect(audioBuffer.length).equal(1)
            expect(audioBuffer.getChannelData(0)[0]).equal(0)
        })
    })
})

// tangent from: making sure decodeAudioData is implemented in safari styleMedia
// use await inside pre.js code ... can i already do this i.e. would emscripten compile to something a browser can support?  probs make sure babel takes care of that
// having tests make sure both work
// maybe pull pre.js out so it gets compiled with babel
