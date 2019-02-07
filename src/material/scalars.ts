import {
    apply,
    Cardinal,
    from,
    INITIAL,
    OCTAVE,
    reciprocal,
    Scalar,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'

const buildMoeomScalars: (equalDivision: Cardinal) => Scalar[] =
    (equalDivision: Cardinal): Scalar[] => {
        const logarithmicStep: Scalar = to.Scalar(from.Base(apply.Power(
            OCTAVE,
            to.Power(from.Cardinal(reciprocal(equalDivision))),
        )))

        return slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Cardinal(equalDivision)))
            .map((integer: number): Scalar =>
                apply.Power(logarithmicStep, to.Power(integer)))
    }

export {
    buildMoeomScalars,
}
