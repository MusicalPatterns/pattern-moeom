import {
    apply,
    Count,
    from,
    INITIAL,
    OCTAVE,
    reciprocal,
    Scalar,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'

const buildMoeomScalars: (steps: Count) => Scalar[] =
    (steps: Count): Scalar[] => {
        const logarithmicStep: Scalar = to.Scalar(from.Base(
            apply.Power(OCTAVE, to.Power(reciprocal(from.Count(steps)))),
        ))

        return zeroAndPositiveIntegers.slice(from.Index(INITIAL), from.Count(steps))
            .map((integer: number): Scalar =>
                apply.Power(logarithmicStep, to.Power(integer)))
    }

export {
    buildMoeomScalars,
}
