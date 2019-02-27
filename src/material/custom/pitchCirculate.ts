// tslint:disable max-file-line-count

import { NoteSpec } from '@musical-patterns/compiler'
import {
    apply,
    Base,
    Cardinal,
    Denominator,
    E,
    from,
    INITIAL,
    negative,
    Numerator,
    ONE_HALF,
    Ordinal,
    Power,
    Scalar,
    slice,
    SQUARED,
    to,
    Translation,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    ApplyPitchCircularGainCurveParameters,
    CalculateCircledPitchIndexParameters,
    PitchCirculateOptions,
} from './types'

const calculateNumeratorOfPowerOfNormalDistribution: (parameters: ApplyPitchCircularGainCurveParameters) => Numerator =
    ({ pitchClassCount, circledPitchIndex }: ApplyPitchCircularGainCurveParameters): Numerator => {
        const totalPitchesAcrossAllTiers: Cardinal = apply.Scalar(
            pitchClassCount,
            to.Scalar(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)),
        )
        const indexOfPitchInTheCenterOfAllTiers: Ordinal = to.Ordinal(from.Cardinal(apply.Scalar(
            totalPitchesAcrossAllTiers,
            ONE_HALF,
        )))
        const indexTranslatedSuchThatItIsPositiveIfGreaterThanTheMiddleAndNegativeIfLesser: Ordinal = apply.Translation(
            circledPitchIndex,
            to.Translation(from.Ordinal(negative(indexOfPitchInTheCenterOfAllTiers))),
        )

        return to.Numerator(from.Ordinal(apply.Power(
            indexTranslatedSuchThatItIsPositiveIfGreaterThanTheMiddleAndNegativeIfLesser,
            SQUARED,
        )))
    }

const calculateDenominatorOfPowerOfNormalDistribution:
    (parameters: ApplyPitchCircularGainCurveParameters) => Denominator =
    ({ pitchClassCount }: ApplyPitchCircularGainCurveParameters): Denominator => {
        const sigma: Base = to.Base(from.Cardinal(apply.Scalar(pitchClassCount, ONE_HALF)))

        return to.Denominator(from.Base(apply.Power(sigma, SQUARED)))
    }

const calculatePowerOfNormalDistribution: (parameters: ApplyPitchCircularGainCurveParameters) => Power =
    (parameters: ApplyPitchCircularGainCurveParameters): Power =>
        to.Power(from.Fraction([
            calculateNumeratorOfPowerOfNormalDistribution(parameters),
            calculateDenominatorOfPowerOfNormalDistribution(parameters),
        ]))

const applyPitchCircularGainCurve:
    (originalGainScalar: Scalar, parameters: ApplyPitchCircularGainCurveParameters) => Scalar =
    (originalGainScalar: Scalar, parameters: ApplyPitchCircularGainCurveParameters): Scalar => {
        const normalDistributionPower: Power = calculatePowerOfNormalDistribution(parameters)

        const pitchCircularScaling: Scalar = to.Scalar(from.Base(apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF)),
        )))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
    }

const transposePitchIndexForTier:
    (originalPitchIndex: Ordinal, parameters: CalculateCircledPitchIndexParameters) => Ordinal =
    (originalPitchIndex: Ordinal, { pitchClassCount, tierIndex }: CalculateCircledPitchIndexParameters): Ordinal => {
        const pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation: Ordinal = apply.Modulus(
            originalPitchIndex,
            to.Modulus(from.Cardinal(pitchClassCount)),
        )

        const baseTierTransposition: Translation = to.Translation(from.Ordinal(apply.Scalar(
            tierIndex,
            to.Scalar(from.Cardinal(pitchClassCount)),
        )))

        return apply.Translation(
            pitchIndexWrappedWithinPitchClassCountToRemoveOriginalWindowLocationInformation,
            baseTierTransposition,
        )
    }

const buildTierWithTechniqueIndexTranslationByPitchClassCount:
    (part: NoteSpec[], tierIndex: Ordinal, pitchClassCount: Cardinal) => NoteSpec[] =
    (part: NoteSpec[], tierIndex: Ordinal, pitchClassCount: Cardinal): NoteSpec[] =>
        part.map((noteSpec: NoteSpec): NoteSpec => {
            const originalPitchIndex: Ordinal = noteSpec.pitchSpec && noteSpec.pitchSpec.index || to.Ordinal(0)
            const originalGainScalar: Scalar = noteSpec.gainSpec && noteSpec.gainSpec.scalar || to.Scalar(1)

            const circledPitchIndex: Ordinal = transposePitchIndexForTier(
                originalPitchIndex,
                { pitchClassCount, tierIndex },
            )

            const pitchCircledGainScalar: Scalar = applyPitchCircularGainCurve(
                originalGainScalar,
                { circledPitchIndex, pitchClassCount },
            )

            return {
                ...noteSpec,
                gainSpec: {
                    scalar: pitchCircledGainScalar,
                },
                pitchSpec: {
                    ...noteSpec.pitchSpec,
                    index: circledPitchIndex,
                },
            }
        })

const pitchCirculate: (part: NoteSpec[], pitchCirculateOptions: PitchCirculateOptions) => NoteSpec[][] =
    (part: NoteSpec[], { pitchClassCount = to.Cardinal(0) }: PitchCirculateOptions): NoteSpec[][] =>
        slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)))
            .map(to.Ordinal)
            .map((tierIndex: Ordinal): NoteSpec[] =>
                buildTierWithTechniqueIndexTranslationByPitchClassCount(part, tierIndex, pitchClassCount),
            )

export {
    pitchCirculate,
}
