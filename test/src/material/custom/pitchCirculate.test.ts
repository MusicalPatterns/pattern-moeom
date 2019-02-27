import { NoteSpec } from '@musical-patterns/compiler'
import { apply, Scalar, testIsCloseTo, to } from '@musical-patterns/utilities'
import { PitchCircularTechnique, pitchCirculate } from '../../../../src/indexForTest'

describe('pitch circulate', () => {
    let outputParts: NoteSpec[][]

    describe('given a part, will return a set of parts which together constitute the pitch circled version of it', () => {
        const originalGain: Scalar = to.Scalar(0.5)
        beforeEach(() => {
            const inputPart: NoteSpec[] = [ {
                gainSpec: {
                    scalar: originalGain,
                },
                pitchSpec: {
                    index: to.Ordinal(45),
                },
            } ]

            outputParts = pitchCirculate(
                inputPart,
                {
                    pitchClassCount: to.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                },
            )
        })

        it('scales the gain across the parts, so that the center part is loud, and the outer parts get quieter depending on how far from the center they are', () => {
            testIsCloseTo(
                outputParts[ 0 ][ 0 ].gainSpec!.scalar,
                apply.Scalar(to.Scalar(0.325), originalGain),
            )
            testIsCloseTo(
                outputParts[ 1 ][ 0 ].gainSpec!.scalar,
                apply.Scalar(to.Scalar(0.882), originalGain),
            )
            testIsCloseTo(
                outputParts[ 2 ][ 0 ].gainSpec!.scalar,
                apply.Scalar(to.Scalar(0.044), originalGain),
            )
        })

        it('shifts the pitches so that each part is off from the next by the window', () => {
            expect(outputParts[ 0 ][ 0 ].pitchSpec!.index)
                .toEqual(to.Ordinal(9))
            expect(outputParts[ 1 ][ 0 ].pitchSpec!.index)
                .toEqual(to.Ordinal(21))
            expect(outputParts[ 2 ][ 0 ].pitchSpec!.index)
                .toEqual(to.Ordinal(33))
        })
    })

    describe('preserving all the other information (besides pitch index and gain scalar)', () => {
        beforeEach(() => {
            const inputPart: NoteSpec[] = [
                {
                    durationSpec: {
                        index: to.Ordinal(3),
                        scalar: to.Scalar(4),
                        scaleIndex: to.Ordinal(5),
                    },
                    gainSpec: {
                        index: to.Ordinal(9),
                        scaleIndex: to.Ordinal(5),
                    },
                    pitchSpec: {
                        scalar: to.Scalar(11),
                        scaleIndex: to.Ordinal(10),
                    },
                    positionSpec: [ {
                        index: to.Ordinal(2),
                        scalar: to.Scalar(4),
                        scaleIndex: to.Ordinal(6),
                    } ],
                    sustainSpec: {
                        index: to.Ordinal(6),
                        scalar: to.Scalar(7),
                        scaleIndex: to.Ordinal(8),
                    },
                },
            ]

            outputParts = pitchCirculate(
                inputPart,
                {
                    pitchClassCount: to.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                },
            )
        })

        it('copies the duration spec into each part', () => {
            expect(outputParts[ 0 ][ 0 ].durationSpec)
                .toEqual({
                    index: to.Ordinal(3),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(5),
                })
            expect(outputParts[ 1 ][ 0 ].durationSpec)
                .toEqual({
                    index: to.Ordinal(3),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(5),
                })
            expect(outputParts[ 2 ][ 0 ].durationSpec)
                .toEqual({
                    index: to.Ordinal(3),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(5),
                })
        })

        it('copies the sustain spec into each part', () => {
            expect(outputParts[ 0 ][ 0 ].sustainSpec)
                .toEqual({
                    index: to.Ordinal(6),
                    scalar: to.Scalar(7),
                    scaleIndex: to.Ordinal(8),
                })
            expect(outputParts[ 1 ][ 0 ].sustainSpec)
                .toEqual({
                    index: to.Ordinal(6),
                    scalar: to.Scalar(7),
                    scaleIndex: to.Ordinal(8),
                })
            expect(outputParts[ 2 ][ 0 ].sustainSpec)
                .toEqual({
                    index: to.Ordinal(6),
                    scalar: to.Scalar(7),
                    scaleIndex: to.Ordinal(8),
                })
        })

        it('copies the position spec into each part', () => {
            expect(outputParts[ 0 ][ 0 ].positionSpec)
                .toEqual([ {
                    index: to.Ordinal(2),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(6),
                } ])
            expect(outputParts[ 1 ][ 0 ].positionSpec)
                .toEqual([ {
                    index: to.Ordinal(2),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(6),
                } ])
            expect(outputParts[ 2 ][ 0 ].positionSpec)
                .toEqual([ {
                    index: to.Ordinal(2),
                    scalar: to.Scalar(4),
                    scaleIndex: to.Ordinal(6),
                } ])
        })

        it('copies the pitch scale index into each part', () => {
            expect(outputParts[ 0 ][ 0 ].pitchSpec!.scaleIndex)
                .toEqual(to.Ordinal(10))
            expect(outputParts[ 1 ][ 0 ].pitchSpec!.scaleIndex)
                .toEqual(to.Ordinal(10))
            expect(outputParts[ 2 ][ 0 ].pitchSpec!.scaleIndex)
                .toEqual(to.Ordinal(10))
        })

        it('copies the pitch scalar into each part', () => {
            expect(outputParts[ 0 ][ 0 ].pitchSpec!.scalar)
                .toEqual(to.Scalar(11))
            expect(outputParts[ 1 ][ 0 ].pitchSpec!.scalar)
                .toEqual(to.Scalar(11))
            expect(outputParts[ 2 ][ 0 ].pitchSpec!.scalar)
                .toEqual(to.Scalar(11))
        })

        it('copies the gain scale index into each part', () => {
            expect(outputParts[ 0 ][ 0 ].gainSpec!.scaleIndex)
                .toEqual(to.Ordinal(5))
            expect(outputParts[ 1 ][ 0 ].gainSpec!.scaleIndex)
                .toEqual(to.Ordinal(5))
            expect(outputParts[ 2 ][ 0 ].gainSpec!.scaleIndex)
                .toEqual(to.Ordinal(5))
        })

        it('copies the gain index into each part', () => {
            expect(outputParts[ 0 ][ 0 ].gainSpec!.index)
                .toEqual(to.Ordinal(9))
            expect(outputParts[ 1 ][ 0 ].gainSpec!.index)
                .toEqual(to.Ordinal(9))
            expect(outputParts[ 2 ][ 0 ].gainSpec!.index)
                .toEqual(to.Ordinal(9))
        })
    })

    describe('gain goes in a cycle', () => {
        beforeEach(() => {
            const inputPart: NoteSpec[] = [
                { pitchSpec: { index: to.Ordinal(0) } },
                { pitchSpec: { index: to.Ordinal(1) } },
                { pitchSpec: { index: to.Ordinal(2) } },
                { pitchSpec: { index: to.Ordinal(3) } },
                { pitchSpec: { index: to.Ordinal(4) } },
                { pitchSpec: { index: to.Ordinal(5) } },
                { pitchSpec: { index: to.Ordinal(6) } },
                { pitchSpec: { index: to.Ordinal(7) } },
                { pitchSpec: { index: to.Ordinal(8) } },
                { pitchSpec: { index: to.Ordinal(9) } },
                { pitchSpec: { index: to.Ordinal(10) } },
                { pitchSpec: { index: to.Ordinal(11) } },
                { pitchSpec: { index: to.Ordinal(12) } },
            ]

            outputParts = pitchCirculate(
                inputPart,
                {
                    pitchClassCount: to.Cardinal(12),
                    technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                },
            )
        })

        it('it should return the same result after one loop around the pitch classes', () => {
            const [ lowPart, middlePart, highPart ] = outputParts

            expect(lowPart[ 0 ].gainSpec!.scalar)
                .toEqual(lowPart[ 12 ].gainSpec!.scalar)
            expect(middlePart[ 0 ].gainSpec!.scalar)
                .toEqual(middlePart[ 12 ].gainSpec!.scalar)
            expect(highPart[ 0 ].gainSpec!.scalar)
                .toEqual(highPart[ 12 ].gainSpec!.scalar)
        })

        it('the gain of the low part at the end connects back up with the gain of the middle part at the beginning, and the gain at the end of the middle part connects back up with the gain of the high part at the beginning', () => {
            const [ lowPart, middlePart, highPart ] = outputParts

            testIsCloseTo(lowPart[ 0 ].gainSpec!.scalar, to.Scalar(0.011))
            testIsCloseTo(lowPart[ 1 ].gainSpec!.scalar, to.Scalar(0.018))
            testIsCloseTo(lowPart[ 2 ].gainSpec!.scalar, to.Scalar(0.029))
            testIsCloseTo(lowPart[ 3 ].gainSpec!.scalar, to.Scalar(0.043))
            testIsCloseTo(lowPart[ 4 ].gainSpec!.scalar, to.Scalar(0.066))
            testIsCloseTo(lowPart[ 5 ].gainSpec!.scalar, to.Scalar(0.096))
            testIsCloseTo(lowPart[ 6 ].gainSpec!.scalar, to.Scalar(0.135))
            testIsCloseTo(lowPart[ 7 ].gainSpec!.scalar, to.Scalar(0.186))
            testIsCloseTo(lowPart[ 8 ].gainSpec!.scalar, to.Scalar(0.249))
            testIsCloseTo(lowPart[ 9 ].gainSpec!.scalar, to.Scalar(0.324))
            testIsCloseTo(lowPart[ 10 ].gainSpec!.scalar, to.Scalar(0.411))
            testIsCloseTo(lowPart[ 11 ].gainSpec!.scalar, to.Scalar(0.506))

            testIsCloseTo(middlePart[ 0 ].gainSpec!.scalar, to.Scalar(0.606))
            testIsCloseTo(middlePart[ 1 ].gainSpec!.scalar, to.Scalar(0.707))
            testIsCloseTo(middlePart[ 2 ].gainSpec!.scalar, to.Scalar(0.801))
            testIsCloseTo(middlePart[ 3 ].gainSpec!.scalar, to.Scalar(0.882))
            testIsCloseTo(middlePart[ 4 ].gainSpec!.scalar, to.Scalar(0.945))
            testIsCloseTo(middlePart[ 5 ].gainSpec!.scalar, to.Scalar(0.986))
            testIsCloseTo(middlePart[ 6 ].gainSpec!.scalar, to.Scalar(1))
            testIsCloseTo(middlePart[ 7 ].gainSpec!.scalar, to.Scalar(0.986))
            testIsCloseTo(middlePart[ 8 ].gainSpec!.scalar, to.Scalar(0.945))
            testIsCloseTo(middlePart[ 9 ].gainSpec!.scalar, to.Scalar(0.882))
            testIsCloseTo(middlePart[ 10 ].gainSpec!.scalar, to.Scalar(0.801))
            testIsCloseTo(middlePart[ 11 ].gainSpec!.scalar, to.Scalar(0.707))

            testIsCloseTo(highPart[ 0 ].gainSpec!.scalar, to.Scalar(0.606))
            testIsCloseTo(highPart[ 1 ].gainSpec!.scalar, to.Scalar(0.506))
            testIsCloseTo(highPart[ 2 ].gainSpec!.scalar, to.Scalar(0.411))
            testIsCloseTo(highPart[ 3 ].gainSpec!.scalar, to.Scalar(0.324))
            testIsCloseTo(highPart[ 4 ].gainSpec!.scalar, to.Scalar(0.249))
            testIsCloseTo(highPart[ 5 ].gainSpec!.scalar, to.Scalar(0.186))
            testIsCloseTo(highPart[ 6 ].gainSpec!.scalar, to.Scalar(0.135))
            testIsCloseTo(highPart[ 7 ].gainSpec!.scalar, to.Scalar(0.096))
            testIsCloseTo(highPart[ 8 ].gainSpec!.scalar, to.Scalar(0.066))
            testIsCloseTo(highPart[ 9 ].gainSpec!.scalar, to.Scalar(0.043))
            testIsCloseTo(highPart[ 10 ].gainSpec!.scalar, to.Scalar(0.029))
            testIsCloseTo(highPart[ 11 ].gainSpec!.scalar, to.Scalar(0.018))
        })
    })
})
