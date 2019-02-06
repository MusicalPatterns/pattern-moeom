import {
    apply,
    Cardinal,
    from,
    INITIAL,
    OCTAVE,
    reciprocal,
    Scalar,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'

const buildMoeomScalars: (equalDivision: Cardinal) => Scalar[] =
    (equalDivision: Cardinal): Scalar[] => {
        const logarithmicStep: Scalar = to.Scalar(from.Base(
            apply.Power(OCTAVE, to.Power(reciprocal(from.Cardinal(equalDivision)))),
        ))

        return zeroAndPositiveIntegers.slice(from.Ordinal(INITIAL), from.Cardinal(equalDivision))
            .map((integer: number): Scalar =>
                apply.Power(logarithmicStep, to.Power(integer)))
    }

export {
    buildMoeomScalars,
}
