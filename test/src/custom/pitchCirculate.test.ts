import { NoteSpec } from '@musical-patterns/compiler'
import { STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { apply, Scalar, testIsCloseTo, to } from '@musical-patterns/utilities'
import { pitchCirculate } from '../../../src/indexForTest'

describe('pitch circulate, given a part, will return a set of parts which together constitute the pitch circled version of it', () => {
    let outputParts: NoteSpec[][]
    const originalGain: Scalar = to.Scalar(0.5)
    beforeEach(() => {
        const inputPart: NoteSpec[] = [
            {
                durationSpec: {
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
                gainSpec: {
                    scalar: originalGain,
                },
                pitchSpec: {
                    index: to.Ordinal(45),
                    scaleIndex: STANDARD_PITCH_SCALE_INDEX,
                },
            },
        ]

        outputParts = pitchCirculate(inputPart, to.Denominator(12))
    })

    it('scales the gain, so that the center part is loud, and the outer parts get quieter depending on how far from the center they are', () => {
        testIsCloseTo(
            outputParts[ 0 ][ 0 ].gainSpec && outputParts[ 0 ][ 0 ].gainSpec.scalar,
            apply.Scalar(to.Scalar(0.32465246735834974), originalGain),
        )
        testIsCloseTo(
            outputParts[ 1 ][ 0 ].gainSpec && outputParts[ 1 ][ 0 ].gainSpec.scalar,
            apply.Scalar(to.Scalar(0.8824969025845955), originalGain),
        )
        testIsCloseTo(
            outputParts[ 2 ][ 0 ].gainSpec && outputParts[ 2 ][ 0 ].gainSpec.scalar,
            apply.Scalar(to.Scalar(0.04393693362340743), originalGain),
        )
    })

    it('shifts the pitches so that each part is off from the next by the window', () => {
        expect(outputParts[ 0 ][ 0 ].pitchSpec)
            .toEqual({
                index: to.Ordinal(9),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            })
        expect(outputParts[ 1 ][ 0 ].pitchSpec)
            .toEqual({
                index: to.Ordinal(21),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            })
        expect(outputParts[ 2 ][ 0 ].pitchSpec)
            .toEqual({
                index: to.Ordinal(33),
                scaleIndex: STANDARD_PITCH_SCALE_INDEX,
            })
    })

    it('preserves the original durations', () => {
        expect(outputParts[ 0 ][ 0 ].durationSpec)
            .toEqual({
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            })
        expect(outputParts[ 1 ][ 0 ].durationSpec)
            .toEqual({
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            })
        expect(outputParts[ 2 ][ 0 ].durationSpec)
            .toEqual({
                scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
            })
    })
})
