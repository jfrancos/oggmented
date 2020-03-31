// import { oggmentedAudioContext } from '../dist/oggmented-bundle'
import oac from  '../dist/oggmented-bundle'
// const oggmented = require('../dist/oggmented-bundle').default

import chai from 'chai'
var expect = chai.expect;
// console.log(JSON.stringify(OggmentedAudioContext))
// console.log(oggmented)

describe('Decoding silence.ogg', () => {
    console.log('asdf')
    const audioCtx = new oac()
    console.log(audioCtx)
    console.log("qwer")
    let response, fileBuffer

    before(async () => {
        response = await fetch('base/test/silence.ogg')
        fileBuffer = await response.arrayBuffer()
      })

    it('should resolve correct audioBuffer', async () => {
        const audioBuffer = await audioCtx.decodeAudioData(fileBuffer)
        console.log(audioBuffer)
        expect(audioBuffer.length).equal(1)
        expect(audioBuffer.getChannelData(0)[0]).equal(0)
    })

    it('should send correct audioBuffer to callback', async () => {
        const audioBuffer = await new Promise (resolve => audioCtx.decodeAudioData(fileBuffer, resolve))
        expect(audioBuffer.length).equal(1)
        expect(audioBuffer.getChannelData(0)[0]).equal(0)
    })
})


// tangent from: making sure decodeAudioData is implemented in safari styleMedia
// use await inside pre.js code ... can i already do this i.e. would emscripten compile to something a browser can support?  probs make sure babel takes care of that
// having tests make sure both work
// maybe pull pre.js out so it gets compiled with babel
