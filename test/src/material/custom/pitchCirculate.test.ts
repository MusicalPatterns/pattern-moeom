// tslint:disable number-literal-format

import { NoteSpec } from '@musical-patterns/compiler'
import { apply, buildEqualDivisionScalars, Scalar, testIsCloseTo, to } from '@musical-patterns/utilities'
import { PitchCircularTechnique, pitchCirculate } from '../../../../src/indexForTest'

describe('pitch circulate', () => {
    let outputParts: NoteSpec[][]

    describe('using the technique of index translation by pitch class count', () => {
        const A: Scalar = to.Scalar(0.011)
        const B: Scalar = to.Scalar(0.018)
        const C: Scalar = to.Scalar(0.029)
        const D: Scalar = to.Scalar(0.043)
        const E: Scalar = to.Scalar(0.066)
        const F: Scalar = to.Scalar(0.096)
        const G: Scalar = to.Scalar(0.135)
        const H: Scalar = to.Scalar(0.186)
        const I: Scalar = to.Scalar(0.249)
        const J: Scalar = to.Scalar(0.324)
        const K: Scalar = to.Scalar(0.411)
        const L: Scalar = to.Scalar(0.506)
        const M: Scalar = to.Scalar(0.606)
        const N: Scalar = to.Scalar(0.707)
        const O: Scalar = to.Scalar(0.801)
        const P: Scalar = to.Scalar(0.882)
        const Q: Scalar = to.Scalar(0.945)
        const R: Scalar = to.Scalar(0.986)
        const S: Scalar = to.Scalar(1.000)

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

            it('translates the pitch indices so that each part is apart from the next by the pitch class count (and for now always returning three parts, starting with the lowest possible part)', () => {
                expect(outputParts[ 0 ][ 0 ].pitchSpec!.index)
                    .toEqual(to.Ordinal(9))
                expect(outputParts[ 1 ][ 0 ].pitchSpec!.index)
                    .toEqual(to.Ordinal(21))
                expect(outputParts[ 2 ][ 0 ].pitchSpec!.index)
                    .toEqual(to.Ordinal(33))
            })

            it('maps the gain to a normal distribution curve, so that the center part is loud, and the outer parts get quieter depending on how far from the center they are (treating each index as an equal step, irrespective to whether they give differently sized pitch changes)', () => {
                const MEDIUM_LOUD_IN_THE_LOW_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar = to.Scalar(0.324)
                const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_PART: Scalar = to.Scalar(0.882)
                const QUIETEST_IN_THE_HIGH_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar = to.Scalar(0.043)

                testIsCloseTo(
                    outputParts[ 0 ][ 0 ].gainSpec!.scalar,
                    apply.Scalar(MEDIUM_LOUD_IN_THE_LOW_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE, originalGain),
                )
                testIsCloseTo(
                    outputParts[ 1 ][ 0 ].gainSpec!.scalar,
                    apply.Scalar(LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_PART, originalGain),
                )
                testIsCloseTo(
                    outputParts[ 2 ][ 0 ].gainSpec!.scalar,
                    apply.Scalar(QUIETEST_IN_THE_HIGH_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE, originalGain),
                )
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

                testIsCloseTo(lowPart[ 0 ].gainSpec!.scalar, A)
                testIsCloseTo(lowPart[ 1 ].gainSpec!.scalar, B)
                testIsCloseTo(lowPart[ 2 ].gainSpec!.scalar, C)
                testIsCloseTo(lowPart[ 3 ].gainSpec!.scalar, D)
                testIsCloseTo(lowPart[ 4 ].gainSpec!.scalar, E)
                testIsCloseTo(lowPart[ 5 ].gainSpec!.scalar, F)
                testIsCloseTo(lowPart[ 6 ].gainSpec!.scalar, G)
                testIsCloseTo(lowPart[ 7 ].gainSpec!.scalar, H)
                testIsCloseTo(lowPart[ 8 ].gainSpec!.scalar, I)
                testIsCloseTo(lowPart[ 9 ].gainSpec!.scalar, J)
                testIsCloseTo(lowPart[ 10 ].gainSpec!.scalar, K)
                testIsCloseTo(lowPart[ 11 ].gainSpec!.scalar, L)

                testIsCloseTo(middlePart[ 0 ].gainSpec!.scalar, M)
                testIsCloseTo(middlePart[ 1 ].gainSpec!.scalar, N)
                testIsCloseTo(middlePart[ 2 ].gainSpec!.scalar, O)
                testIsCloseTo(middlePart[ 3 ].gainSpec!.scalar, P)
                testIsCloseTo(middlePart[ 4 ].gainSpec!.scalar, Q)
                testIsCloseTo(middlePart[ 5 ].gainSpec!.scalar, R)
                testIsCloseTo(middlePart[ 6 ].gainSpec!.scalar, S)
                testIsCloseTo(middlePart[ 7 ].gainSpec!.scalar, R)
                testIsCloseTo(middlePart[ 8 ].gainSpec!.scalar, Q)
                testIsCloseTo(middlePart[ 9 ].gainSpec!.scalar, P)
                testIsCloseTo(middlePart[ 10 ].gainSpec!.scalar, O)
                testIsCloseTo(middlePart[ 11 ].gainSpec!.scalar, N)

                testIsCloseTo(highPart[ 0 ].gainSpec!.scalar, M)
                testIsCloseTo(highPart[ 1 ].gainSpec!.scalar, L)
                testIsCloseTo(highPart[ 2 ].gainSpec!.scalar, K)
                testIsCloseTo(highPart[ 3 ].gainSpec!.scalar, J)
                testIsCloseTo(highPart[ 4 ].gainSpec!.scalar, I)
                testIsCloseTo(highPart[ 5 ].gainSpec!.scalar, H)
                testIsCloseTo(highPart[ 6 ].gainSpec!.scalar, G)
                testIsCloseTo(highPart[ 7 ].gainSpec!.scalar, F)
                testIsCloseTo(highPart[ 8 ].gainSpec!.scalar, E)
                testIsCloseTo(highPart[ 9 ].gainSpec!.scalar, D)
                testIsCloseTo(highPart[ 10 ].gainSpec!.scalar, C)
                testIsCloseTo(highPart[ 11 ].gainSpec!.scalar, B)
            })
        })

        describe('gain curve is almost zero at the edges and slopes nicely up to a 1 in the middle, for other pitch class counts too', () => {
            beforeEach(() => {
                const inputPart: NoteSpec[] = [
                    { pitchSpec: { index: to.Ordinal(0) } },
                    { pitchSpec: { index: to.Ordinal(1) } },
                    { pitchSpec: { index: to.Ordinal(2) } },
                    { pitchSpec: { index: to.Ordinal(3) } },
                    { pitchSpec: { index: to.Ordinal(4) } },
                    { pitchSpec: { index: to.Ordinal(5) } },
                ]

                outputParts = pitchCirculate(
                    inputPart,
                    {
                        pitchClassCount: to.Cardinal(6),
                        technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
                    },
                )
            })

            it('works', () => {
                const [ lowPart, middlePart, highPart ] = outputParts

                testIsCloseTo(lowPart[ 0 ].gainSpec!.scalar, A)
                testIsCloseTo(lowPart[ 1 ].gainSpec!.scalar, C)
                testIsCloseTo(lowPart[ 2 ].gainSpec!.scalar, E)
                testIsCloseTo(lowPart[ 3 ].gainSpec!.scalar, G)
                testIsCloseTo(lowPart[ 4 ].gainSpec!.scalar, I)
                testIsCloseTo(lowPart[ 5 ].gainSpec!.scalar, K)

                testIsCloseTo(middlePart[ 0 ].gainSpec!.scalar, M)
                testIsCloseTo(middlePart[ 1 ].gainSpec!.scalar, O)
                testIsCloseTo(middlePart[ 2 ].gainSpec!.scalar, Q)
                testIsCloseTo(middlePart[ 3 ].gainSpec!.scalar, S)
                testIsCloseTo(middlePart[ 4 ].gainSpec!.scalar, Q)
                testIsCloseTo(middlePart[ 5 ].gainSpec!.scalar, O)

                testIsCloseTo(highPart[ 0 ].gainSpec!.scalar, M)
                testIsCloseTo(highPart[ 1 ].gainSpec!.scalar, K)
                testIsCloseTo(highPart[ 2 ].gainSpec!.scalar, I)
                testIsCloseTo(highPart[ 3 ].gainSpec!.scalar, G)
                testIsCloseTo(highPart[ 4 ].gainSpec!.scalar, E)
                testIsCloseTo(highPart[ 5 ].gainSpec!.scalar, C)
            })
        })
    })

    describe('using the technique of scalar scaling by window size', () => {
        const A: Scalar = to.Scalar(0.011)
        const B: Scalar = to.Scalar(0.020)
        const C: Scalar = to.Scalar(0.034)
        const D: Scalar = to.Scalar(0.056)
        const E: Scalar = to.Scalar(0.089)
        const F: Scalar = to.Scalar(0.135)
        const G: Scalar = to.Scalar(0.198)
        const H: Scalar = to.Scalar(0.278)
        const I: Scalar = to.Scalar(0.375)
        const J: Scalar = to.Scalar(0.487)
        const K: Scalar = to.Scalar(0.607)
        const L: Scalar = to.Scalar(0.726)
        const M: Scalar = to.Scalar(0.835)
        const N: Scalar = to.Scalar(0.923)
        const O: Scalar = to.Scalar(0.980)
        const P: Scalar = to.Scalar(1.000)

        describe('given a part, will return a set of parts which together constitute the pitch circled version of it', () => {
            const originalGain: Scalar = to.Scalar(0.5)
            beforeEach(() => {
                const inputPart: NoteSpec[] = [ {
                    gainSpec: {
                        scalar: originalGain,
                    },
                    pitchSpec: {
                        scalar: to.Scalar(57),
                    },
                } ]

                outputParts = pitchCirculate(
                    inputPart,
                    {
                        technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                        windowSize: to.Scalar(to.Frequency(2)),
                    },
                )
            })

            it('scales the pitches so that each part is off from the next by the window size (and for now always returning three parts, starting with the lowest possible part)', () => {
                expect(outputParts[ 0 ][ 0 ].pitchSpec!.scalar)
                    .toEqual(to.Scalar(57 / 32))
                expect(outputParts[ 1 ][ 0 ].pitchSpec!.scalar)
                    .toEqual(to.Scalar(57 / 16))
                expect(outputParts[ 2 ][ 0 ].pitchSpec!.scalar)
                    .toEqual(to.Scalar(57 / 8))
            })

            it('maps the gain to a normal distribution curve, so that the center part is loud, and the outer parts get quieter depending on how far from the center they are', () => {
                const MEDIUM_LOUD_IN_THE_LOW_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE: Scalar = to.Scalar(0.410)
                const LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_PART: Scalar = to.Scalar(0.800)
                const QUIETEST_IN_THE_HIGH_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE: Scalar = to.Scalar(0.028)

                testIsCloseTo(
                    outputParts[ 0 ][ 0 ].gainSpec!.scalar,
                    apply.Scalar(MEDIUM_LOUD_IN_THE_LOW_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_ITS_ALMOST_INTO_THE_LOUD_MIDDLE, originalGain),
                )
                testIsCloseTo(
                    outputParts[ 1 ][ 0 ].gainSpec!.scalar,
                    apply.Scalar(LOUDEST_IN_THE_MIDDLE_BUT_NOT_FULL_GAIN_SINCE_ITS_CLOSER_TO_HIGH_PART, originalGain),
                )
                testIsCloseTo(
                    outputParts[ 2 ][ 0 ].gainSpec!.scalar,
                    apply.Scalar(QUIETEST_IN_THE_HIGH_PART_BECAUSE_WITHIN_SCALE_ITS_CLOSER_TO_HIGH_SO_CLOSER_TO_BEING_GONE_THERE, originalGain),
                )
            })
        })

        describe('preserving all the other information (besides pitch scalar and gain scalar)', () => {
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
                            index: to.Ordinal(11),
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
                        technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                        windowSize: to.Scalar(to.Frequency(2)),
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

            it('copies the pitch index into each part', () => {
                expect(outputParts[ 0 ][ 0 ].pitchSpec!.index)
                    .toEqual(to.Ordinal(11))
                expect(outputParts[ 1 ][ 0 ].pitchSpec!.index)
                    .toEqual(to.Ordinal(11))
                expect(outputParts[ 2 ][ 0 ].pitchSpec!.index)
                    .toEqual(to.Ordinal(11))
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
                const tenEdScalars: Scalar[] = buildEqualDivisionScalars(to.Denominator(10))
                const inputPart: NoteSpec[] = [
                    { pitchSpec: { scalar: tenEdScalars[ 0 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 1 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 2 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 3 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 4 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 5 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 6 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 7 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 8 ] } },
                    { pitchSpec: { scalar: tenEdScalars[ 9 ] } },
                    { pitchSpec: { scalar: to.Scalar(2) } },
                ]

                outputParts = pitchCirculate(
                    inputPart,
                    {
                        technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                        windowSize: to.Scalar(to.Frequency(2)),
                    },
                )
            })

            it('it should return the same result after one loop around the pitch classes', () => {
                const [ lowPart, middlePart, highPart ] = outputParts

                expect(lowPart[ 0 ].gainSpec!.scalar)
                    .toEqual(lowPart[ 10 ].gainSpec!.scalar)
                expect(middlePart[ 0 ].gainSpec!.scalar)
                    .toEqual(middlePart[ 10 ].gainSpec!.scalar)
                expect(highPart[ 0 ].gainSpec!.scalar)
                    .toEqual(highPart[ 10 ].gainSpec!.scalar)
            })

            it('the gain of the low part at the end connects back up with the gain of the middle part at the beginning, and the gain at the end of the middle part connects back up with the gain of the high part at the beginning', () => {
                const [ lowPart, middlePart, highPart ] = outputParts

                testIsCloseTo(lowPart[ 0 ].gainSpec!.scalar, A)
                testIsCloseTo(lowPart[ 1 ].gainSpec!.scalar, B)
                testIsCloseTo(lowPart[ 2 ].gainSpec!.scalar, C)
                testIsCloseTo(lowPart[ 3 ].gainSpec!.scalar, D)
                testIsCloseTo(lowPart[ 4 ].gainSpec!.scalar, E)
                testIsCloseTo(lowPart[ 5 ].gainSpec!.scalar, F)
                testIsCloseTo(lowPart[ 6 ].gainSpec!.scalar, G)
                testIsCloseTo(lowPart[ 7 ].gainSpec!.scalar, H)
                testIsCloseTo(lowPart[ 8 ].gainSpec!.scalar, I)
                testIsCloseTo(lowPart[ 9 ].gainSpec!.scalar, J)

                testIsCloseTo(middlePart[ 0 ].gainSpec!.scalar, K)
                testIsCloseTo(middlePart[ 1 ].gainSpec!.scalar, L)
                testIsCloseTo(middlePart[ 2 ].gainSpec!.scalar, M)
                testIsCloseTo(middlePart[ 3 ].gainSpec!.scalar, N)
                testIsCloseTo(middlePart[ 4 ].gainSpec!.scalar, O)
                testIsCloseTo(middlePart[ 5 ].gainSpec!.scalar, P)
                testIsCloseTo(middlePart[ 6 ].gainSpec!.scalar, O)
                testIsCloseTo(middlePart[ 7 ].gainSpec!.scalar, N)
                testIsCloseTo(middlePart[ 8 ].gainSpec!.scalar, M)
                testIsCloseTo(middlePart[ 9 ].gainSpec!.scalar, L)

                testIsCloseTo(highPart[ 0 ].gainSpec!.scalar, K)
                testIsCloseTo(highPart[ 1 ].gainSpec!.scalar, J)
                testIsCloseTo(highPart[ 2 ].gainSpec!.scalar, I)
                testIsCloseTo(highPart[ 3 ].gainSpec!.scalar, H)
                testIsCloseTo(highPart[ 4 ].gainSpec!.scalar, G)
                testIsCloseTo(highPart[ 5 ].gainSpec!.scalar, F)
                testIsCloseTo(highPart[ 6 ].gainSpec!.scalar, E)
                testIsCloseTo(highPart[ 7 ].gainSpec!.scalar, D)
                testIsCloseTo(highPart[ 8 ].gainSpec!.scalar, C)
                testIsCloseTo(highPart[ 9 ].gainSpec!.scalar, B)
            })
        })

        describe('gain curve is almost zero at the edges and slopes nicely up to a 1 in the middle, for other pitch class counts too', () => {
            beforeEach(() => {
                const fiveEdScalars: Scalar[] = buildEqualDivisionScalars(to.Denominator(5))
                const inputPart: NoteSpec[] = [
                    { pitchSpec: { scalar: fiveEdScalars[ 0 ] } },
                    { pitchSpec: { scalar: fiveEdScalars[ 1 ] } },
                    { pitchSpec: { scalar: fiveEdScalars[ 2 ] } },
                    { pitchSpec: { scalar: fiveEdScalars[ 3 ] } },
                    { pitchSpec: { scalar: fiveEdScalars[ 4 ] } },
                ]

                outputParts = pitchCirculate(
                    inputPart,
                    {
                        technique: PitchCircularTechnique.SCALAR_SCALING_BY_WINDOW_SIZE,
                        windowSize: to.Scalar(to.Frequency(2)),
                    },
                )
            })

            it('works', () => {
                const [ lowPart, middlePart, highPart ] = outputParts

                testIsCloseTo(lowPart[ 0 ].gainSpec!.scalar, A)
                testIsCloseTo(lowPart[ 1 ].gainSpec!.scalar, C)
                testIsCloseTo(lowPart[ 2 ].gainSpec!.scalar, E)
                testIsCloseTo(lowPart[ 3 ].gainSpec!.scalar, G)
                testIsCloseTo(lowPart[ 4 ].gainSpec!.scalar, I)

                testIsCloseTo(middlePart[ 0 ].gainSpec!.scalar, K)
                testIsCloseTo(middlePart[ 1 ].gainSpec!.scalar, M)
                testIsCloseTo(middlePart[ 2 ].gainSpec!.scalar, O)
                testIsCloseTo(middlePart[ 3 ].gainSpec!.scalar, O)
                testIsCloseTo(middlePart[ 4 ].gainSpec!.scalar, M)

                testIsCloseTo(highPart[ 0 ].gainSpec!.scalar, K)
                testIsCloseTo(highPart[ 1 ].gainSpec!.scalar, I)
                testIsCloseTo(highPart[ 2 ].gainSpec!.scalar, G)
                testIsCloseTo(highPart[ 3 ].gainSpec!.scalar, E)
                testIsCloseTo(highPart[ 4 ].gainSpec!.scalar, C)
            })
        })
    })
})
