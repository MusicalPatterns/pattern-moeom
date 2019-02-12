import { NoteSpec } from '@musical-patterns/compiler'
import {
    apply,
    Base,
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
import { PITCH_CIRCULAR_WINDOW_COUNT } from './constants'

const kindaGuessingAtANiceSigma: (equalDivision: Denominator) => Base =
    (equalDivision: Denominator): Base =>
        to.Base(from.Denominator(apply.Scalar(equalDivision, ONE_HALF)))

const mapToPitchCircularGainCurve: (pitchIndex: Ordinal, equalDivision: Denominator, originalScalar: Scalar) => Scalar =
    (pitchIndex: Ordinal, equalDivision: Denominator, originalScalar: Scalar): Scalar => {
        const totalPitchesWithinSpan: Denominator =
            apply.Scalar(equalDivision, to.Scalar(from.Cardinal(PITCH_CIRCULAR_WINDOW_COUNT)))
        const pitchWhichIsInTheCenterOfTheSpan: Ordinal =
            to.Ordinal(from.Denominator(apply.Scalar(totalPitchesWithinSpan, ONE_HALF)))
        const sigma: Base = kindaGuessingAtANiceSigma(equalDivision)

        const normalDistributionPowerNumerator: Numerator = to.Numerator(from.Ordinal(apply.Power(
            apply.Translation(
                pitchIndex,
                to.Translation(from.Ordinal(negative(pitchWhichIsInTheCenterOfTheSpan))),
            ),
            SQUARED,
        )))
        const normalDistributionPowerDenominator: Denominator = to.Denominator(from.Base(apply.Power(sigma, SQUARED)))
        const normalDistributionPower: Power = to.Power(
            from.Numerator(normalDistributionPowerNumerator) /
            from.Denominator(normalDistributionPowerDenominator),
        )

        const pitchCircularScaling: number = from.Base(apply.Power(
            E,
            negative(apply.Scalar(normalDistributionPower, ONE_HALF)),
        ))

        return apply.Scalar(originalScalar, to.Scalar(pitchCircularScaling))
    }

const window: (part: NoteSpec[], equalDivision: Denominator, windowIndex: Ordinal) => NoteSpec[] =
    (part: NoteSpec[], equalDivision: Denominator, whichSpan: Ordinal): NoteSpec[] =>
        part.map((noteSpec: NoteSpec): NoteSpec => {
            const originalIndex: Ordinal = noteSpec.pitchSpec && noteSpec.pitchSpec.index || to.Ordinal(0)
            const division: number = from.Denominator(equalDivision)
            const translationForSpan: Translation = to.Translation(from.Ordinal(apply.Scalar(
                whichSpan,
                to.Scalar(division),
            )))
            const rawCircledPitchIndex: Ordinal =
                apply.Modulus(originalIndex, to.Modulus(division))
            const circledPitchIndex: Ordinal = apply.Translation(rawCircledPitchIndex, translationForSpan)
            const originalScalar: Scalar = noteSpec.gainSpec && noteSpec.gainSpec.scalar || to.Scalar(1)

            return {
                ...noteSpec,
                gainSpec: {
                    scalar: mapToPitchCircularGainCurve(circledPitchIndex, equalDivision, originalScalar),
                },
                pitchSpec: {
                    ...noteSpec.pitchSpec,
                    index: circledPitchIndex,
                },
            }
        })

const pitchCirculate: (part: NoteSpec[], equalDivision: Denominator) => NoteSpec[][] =
    (part: NoteSpec[], equalDivision: Denominator): NoteSpec[][] =>
        slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Cardinal(PITCH_CIRCULAR_WINDOW_COUNT)))
            .map((windowIndex: number): NoteSpec[] => window(part, equalDivision, to.Ordinal(windowIndex)))

export {
    pitchCirculate,
}
