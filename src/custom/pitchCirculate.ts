import { NoteSpec } from '@musical-patterns/compiler'
import {
    apply,
    Base,
    Count,
    Denominator,
    from,
    Index,
    INITIAL,
    Numerator,
    Offset,
    ONE_HALF,
    Power,
    Scalar,
    SQUARED,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { PITCH_CIRCULAR_OCTAVE_SPAN } from './constants'

const kindaGuessingAtANiceSigma: (steps: Count) => Base =
    (steps: Count): Base =>
        to.Base(from.Count(apply.Scalar(steps, ONE_HALF)))

const mapToPitchCircularGainCurve: (pitchIndex: Index, steps: Count) => Scalar =
    (pitchIndex: Index, steps: Count): Scalar => {
        const totalPitchesWithinSpan: Count = apply.Scalar(steps, to.Scalar(from.Count(PITCH_CIRCULAR_OCTAVE_SPAN)))
        const pitchWhichIsInTheCenterOfTheSpan: Index =
            to.Index(from.Count(apply.Scalar(totalPitchesWithinSpan, ONE_HALF)))
        const sigma: Base = kindaGuessingAtANiceSigma(steps)

        const normalDistributionPowerNumerator: Numerator =
            to.Numerator(
                apply.Power(
                    apply.Offset(
                        from.Index(pitchIndex),
                        to.Offset(-from.Index(pitchWhichIsInTheCenterOfTheSpan),
                        ),
                    ),
                    SQUARED,
                ),
            )
        const normalDistributionPowerDenominator: Denominator = to.Denominator(from.Base(apply.Power(sigma, SQUARED)))
        const normalDistributionPower: Power = to.Power(
            from.FractionalPart(normalDistributionPowerNumerator) /
            from.FractionalPart(normalDistributionPowerDenominator),
        )

        return to.Scalar(apply.Power(
            Math.E,
            to.Power(-apply.Scalar(normalDistributionPower, ONE_HALF)),
        ))
    }

const oneSpan: (part: NoteSpec[], steps: Count, whichSpan: Index) => NoteSpec[] =
    (part: NoteSpec[], steps: Count, whichSpan: Index): NoteSpec[] =>
        part.map((noteSpec: NoteSpec): NoteSpec => {
            const originalIndex: Index = noteSpec.pitchSpec && noteSpec.pitchSpec.index || to.Index(0)
            const offsetForSpan: Offset = to.Offset(from.Index(apply.Scalar(whichSpan, to.Scalar(from.Count(steps)))))
            const rawCircledPitchIndex: Index = to.Index(from.Index(originalIndex) % from.Count(steps))
            const circledPitchIndex: Index = apply.Offset(rawCircledPitchIndex, offsetForSpan)

            return {
                ...noteSpec,
                gainSpec: {
                    scalar: mapToPitchCircularGainCurve(circledPitchIndex, steps),
                },
                pitchSpec: {
                    ...noteSpec.pitchSpec,
                    index: circledPitchIndex,
                },
            }
        })

const pitchCirculate: (part: NoteSpec[], steps: Count) => NoteSpec[][] =
    (part: NoteSpec[], steps: Count): NoteSpec[][] =>
        zeroAndPositiveIntegers.slice(from.Index(INITIAL), from.Count(PITCH_CIRCULAR_OCTAVE_SPAN))
            .map((integer: number): NoteSpec[] => oneSpan(part, steps, to.Index(integer)))

export {
    pitchCirculate,
}
