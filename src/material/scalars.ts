import {
    apply,
    Denominator,
    from,
    INITIAL,
    OCTAVE,
    reciprocal,
    Scalar,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'

const buildMoeomScalars: (equalDivision: Denominator) => Scalar[] =
    (equalDivision: Denominator): Scalar[] => {
        const logarithmicStep: Scalar = to.Scalar(from.Base(apply.Power(
            OCTAVE,
            to.Power(from.FractionalPart(reciprocal(equalDivision))),
        )))

        return slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.FractionalPart(equalDivision)))
            .map((integer: number): Scalar =>
                apply.Power(logarithmicStep, to.Power(integer)))
    }

export {
    buildMoeomScalars,
}
