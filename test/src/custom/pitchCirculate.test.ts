import { NoteSpec } from '@musical-patterns/compiler'
import { STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { Ordinal, Scalar, testIsCloseTo, to } from '@musical-patterns/utilities'
import { pitchCirculate } from '../../../src/indexForTest'

describe('pitch circulate', () => {
    it('given a part, will return a set of note specs which are the pitch circled version of them', () => {
        const inputPart: NoteSpec[] = [
            {
                durationSpec: {
                    scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
                },
                gainSpec: {
                    scalar: to.Scalar(1),
                },
                pitchSpec: {
                    index: to.Ordinal(45),
                    scaleIndex: STANDARD_PITCH_SCALE_INDEX,
                },
            },
        ]

        const outputParts: NoteSpec[][] = pitchCirculate(inputPart, to.Cardinal(12))

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

        testIsCloseTo(
            outputParts[ 0 ][ 0 ].gainSpec && outputParts[ 0 ][ 0 ].gainSpec.scalar,
            to.Scalar(0.32465246735834974),
        )
        testIsCloseTo(
            outputParts[ 1 ][ 0 ].gainSpec && outputParts[ 1 ][ 0 ].gainSpec.scalar,
            to.Scalar(0.8824969025845955),
        )
        testIsCloseTo(
            outputParts[ 2 ][ 0 ].gainSpec && outputParts[ 2 ][ 0 ].gainSpec.scalar,
            to.Scalar(0.04393693362340743),
        )

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
})
