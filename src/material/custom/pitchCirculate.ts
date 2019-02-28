// tslint:disable max-file-line-count

import { NoteSpec } from '@musical-patterns/compiler'
import {
    Amplitude,
    apply,
    Cardinal,
    DOUBLE,
    E,
    Frequency,
    from,
    INITIAL,
    negative,
    ONE_HALF,
    Ordinal,
    Power,
    Scalar,
    slice,
    SQUARED,
    to,
    Translation,
    windowReduce,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { KINDA_GUESSING_AT_A_GOOD_SIGMA, NEGATIVE_POINT_FIVE_TRANSLATION, PITCH_CIRCULAR_TIER_COUNT } from './constants'
import {
    ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    CalculateCircledPitchIndexParameters,
    CalculateCircledPitchScalarParameters,
    PitchCircularTechnique,
    PitchCirculateOptions,
} from './types'

const calculateNumeratorOfPowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters) => number =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters): number => {
        const { pitchClassCount, circledPitchIndex } = parameters
        const maximumPitchAcrossAllTiers: Ordinal = to.Ordinal(from.Cardinal(apply.Scalar(
            pitchClassCount,
            to.Scalar(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)),
        )))
        const circledPitchIndexProportionOfTotalPitchCount: number = circledPitchIndex / maximumPitchAcrossAllTiers
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            apply.Translation(circledPitchIndexProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = apply.Scalar(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return apply.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const calculateNumeratorOfPowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters) => number =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters): number => {
        const { windowSize, circledPitchScalar } = parameters
        const maximumPitchAcrossAllTiers: Scalar<Frequency> = apply.Power(
            windowSize,
            to.Power(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)),
        )
        const circledPitchScalarProportionOfTotalPitchCount: number = from.Scalar(apply.Base(
            circledPitchScalar,
            // @ts-ignore
            to.Base(from.Scalar(from.Frequency(maximumPitchAcrossAllTiers))),
        ))
        const pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser: number =
            apply.Translation(circledPitchScalarProportionOfTotalPitchCount, NEGATIVE_POINT_FIVE_TRANSLATION)
        const pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne: number = apply.Scalar(
            pitchProportionOfTotalTranslatedToBePositiveIfGreaterThanMedianAndNegativeIfLesser,
            DOUBLE,
        )

        return apply.Power(
            pitchProportionOfTotalScaledToBeBetweenNegativeAndPositiveOne,
            SQUARED,
        )
    }

const calculatePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount:
    (parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters) => Power =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters): Power =>
        to.Power(
            calculateNumeratorOfPowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters) /
            from.Base(apply.Scalar(apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED), DOUBLE)),
        )

const calculatePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize:
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters) => Power =
    (parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters): Power =>
        to.Power(
            calculateNumeratorOfPowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters) /
            from.Base(apply.Scalar(apply.Power(KINDA_GUESSING_AT_A_GOOD_SIGMA, SQUARED), DOUBLE)),
        )

const applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount:
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ) => Scalar<Amplitude> =
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCountParameters,
    ): Scalar<Amplitude> => {
        const normalDistributionPower: Power =
            calculatePowerOfNormalDistributionWithTechniqueIndexTranslationByPitchClassCount(parameters)

        const pitchCircularScaling: Scalar = to.Scalar(from.Base(apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF)),
        )))

        return apply.Scalar(originalGainScalar, pitchCircularScaling)
    }

const applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize:
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ) => Scalar<Amplitude> =
    (
        originalGainScalar: Scalar<Amplitude>,
        parameters: ApplyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSizeParameters,
    ): Scalar<Amplitude> => {
        const normalDistributionPower: Power =
            calculatePowerOfNormalDistributionWithTechniqueScalarScalingByWindowSize(parameters)

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

const scalePitchScalarForTier:
    (originalPitchScalar: Scalar<Frequency>, parameters: CalculateCircledPitchScalarParameters) => Scalar<Frequency> =
    (originalPitchScalar: Scalar<Frequency>, parameters: CalculateCircledPitchScalarParameters): Scalar<Frequency> => {
        const { windowSize, tierIndex } = parameters
        const pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation: Scalar<Frequency> = windowReduce(
            originalPitchScalar,
            windowSize,
        )

        const baseTierScaling: Scalar<Frequency> = apply.Power(windowSize, to.Power(from.Ordinal(tierIndex)))

        return apply.Scalar(
            pitchScalarReducedWithinWindowSizeToRemoveWindowLocationInformation,
            baseTierScaling,
        )
    }

const buildTierWithTechniqueIndexTranslationByPitchClassCount:
    (part: NoteSpec[], tierIndex: Ordinal, pitchClassCount: Cardinal) => NoteSpec[] =
    (part: NoteSpec[], tierIndex: Ordinal, pitchClassCount: Cardinal): NoteSpec[] =>
        part.map((noteSpec: NoteSpec): NoteSpec => {
            const originalPitchIndex: Ordinal = noteSpec.pitchSpec && noteSpec.pitchSpec.index || to.Ordinal(0)
            const originalGainScalar: Scalar<Amplitude> =
                to.Amplitude(noteSpec.gainSpec && noteSpec.gainSpec.scalar || to.Scalar(1))

            const circledPitchIndex: Ordinal = transposePitchIndexForTier(
                originalPitchIndex,
                { pitchClassCount, tierIndex },
            )

            const pitchCircledGainScalar: Scalar<Amplitude> =
                applyPitchCircularGainCurveWithTechniqueIndexTranslationByPitchClassCount(
                    originalGainScalar,
                    { circledPitchIndex, pitchClassCount },
                )

            return {
                ...noteSpec,
                gainSpec: {
                    ...noteSpec.gainSpec,
                    scalar: from.Amplitude(pitchCircledGainScalar) as Scalar,
                },
                pitchSpec: {
                    ...noteSpec.pitchSpec,
                    index: circledPitchIndex,
                },
            }
        })

const buildTierWithTechniqueScalarScalingByWindowSize:
    (part: NoteSpec[], tierIndex: Ordinal, windowSize: Scalar<Frequency>) => NoteSpec[] =
    (part: NoteSpec[], tierIndex: Ordinal, windowSize: Scalar<Frequency>): NoteSpec[] =>
        part.map((noteSpec: NoteSpec): NoteSpec => {
            const originalPitchScalar: Scalar<Frequency> =
                to.Frequency(noteSpec.pitchSpec && noteSpec.pitchSpec.scalar || to.Scalar(1))
            const originalGainScalar: Scalar<Amplitude> =
                to.Amplitude(noteSpec.gainSpec && noteSpec.gainSpec.scalar || to.Scalar(1))

            const circledPitchScalar: Scalar<Frequency> = scalePitchScalarForTier(
                originalPitchScalar,
                { windowSize, tierIndex },
            )

            const pitchCircledGainScalar: Scalar<Amplitude> =
                applyPitchCircularGainCurveWithTechniqueScalarScalingByWindowSize(
                    originalGainScalar,
                    { circledPitchScalar, windowSize },
                )

            return {
                ...noteSpec,
                gainSpec: {
                    ...noteSpec.gainSpec,
                    scalar: from.Amplitude(pitchCircledGainScalar) as Scalar,
                },
                pitchSpec: {
                    ...noteSpec.pitchSpec,
                    scalar: from.Frequency(circledPitchScalar) as Scalar,
                },
            }
        })

const pitchCirculate: (part: NoteSpec[], options: PitchCirculateOptions) => NoteSpec[][] =
    (part: NoteSpec[], options: PitchCirculateOptions): NoteSpec[][] => {
        const { technique, pitchClassCount = to.Cardinal(0), windowSize = to.Scalar(to.Frequency(1)) } = options

        return slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Cardinal(PITCH_CIRCULAR_TIER_COUNT)))
            .map(to.Ordinal)
            .map((tierIndex: Ordinal): NoteSpec[] =>
                technique === PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT ?
                    buildTierWithTechniqueIndexTranslationByPitchClassCount(part, tierIndex, pitchClassCount) :
                    buildTierWithTechniqueScalarScalingByWindowSize(part, tierIndex, windowSize),
            )
    }

export {
    pitchCirculate,
}
