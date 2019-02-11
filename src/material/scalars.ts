import {
    apply,
    Denominator,
    from,
    INITIAL,
    Integer,
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
            to.Power(from.Denominator(reciprocal(equalDivision))),
        )))

        return slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Denominator(equalDivision)))
            .map((integer: Integer): Scalar =>
                apply.Power(logarithmicStep, to.Power(integer)))
    }

export {
    buildMoeomScalars,
}
