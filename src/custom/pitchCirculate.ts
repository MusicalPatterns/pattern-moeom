import { NoteSpec } from '@musical-patterns/compiler'
import {
    apply,
    Base,
    Cardinal,
    Denominator,
    from,
    INITIAL,
    negative,
    Numerator,
    ONE_HALF,
    Ordinal,
    Power,
    Scalar,
    SQUARED,
    to,
    Translation,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { PITCH_CIRCULAR_OCTAVE_SPAN } from './constants'

const kindaGuessingAtANiceSigma: (equalDivision: Cardinal) => Base =
    (equalDivision: Cardinal): Base =>
        to.Base(from.Cardinal(apply.Scalar(equalDivision, ONE_HALF)))

const mapToPitchCircularGainCurve: (pitchIndex: Ordinal, equalDivision: Cardinal) => Scalar =
    (pitchIndex: Ordinal, equalDivision: Cardinal): Scalar => {
        const totalPitchesWithinSpan: Cardinal =
            apply.Cardinal(equalDivision, PITCH_CIRCULAR_OCTAVE_SPAN)
        const pitchWhichIsInTheCenterOfTheSpan: Ordinal =
            to.Ordinal(from.Cardinal(apply.Scalar(totalPitchesWithinSpan, ONE_HALF)))
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
            from.FractionalPart(normalDistributionPowerNumerator) /
            from.FractionalPart(normalDistributionPowerDenominator),
        )

        return to.Scalar(apply.Power(
            Math.E,
            to.Power(negative(apply.Scalar(normalDistributionPower, ONE_HALF))),
        ))
    }

const oneSpan: (part: NoteSpec[], equalDivision: Cardinal, whichSpan: Ordinal) => NoteSpec[] =
    (part: NoteSpec[], equalDivision: Cardinal, whichSpan: Ordinal): NoteSpec[] =>
        part.map((noteSpec: NoteSpec): NoteSpec => {
            const originalIndex: Ordinal = noteSpec.pitchSpec && noteSpec.pitchSpec.index || to.Ordinal(0)
            const translationForSpan: Translation =
                to.Translation(from.Ordinal(apply.Cardinal(whichSpan, equalDivision)))
            const rawCircledPitchIndex: Ordinal =
                to.Ordinal(from.Ordinal(originalIndex) % from.Cardinal(equalDivision))
            const circledPitchIndex: Ordinal = apply.Translation(rawCircledPitchIndex, translationForSpan)

            return {
                ...noteSpec,
                gainSpec: {
                    scalar: mapToPitchCircularGainCurve(circledPitchIndex, equalDivision),
                },
                pitchSpec: {
                    ...noteSpec.pitchSpec,
                    index: circledPitchIndex,
                },
            }
        })

const pitchCirculate: (part: NoteSpec[], equalDivision: Cardinal) => NoteSpec[][] =
    (part: NoteSpec[], equalDivision: Cardinal): NoteSpec[][] =>
        zeroAndPositiveIntegers.slice(from.Ordinal(INITIAL), from.Cardinal(PITCH_CIRCULAR_OCTAVE_SPAN))
            .map((integer: number): NoteSpec[] => oneSpan(part, equalDivision, to.Ordinal(integer)))

export {
    pitchCirculate,
}
