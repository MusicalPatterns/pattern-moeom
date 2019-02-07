import { PitchOnly } from '@musical-patterns/pattern'
import {
    ContourWhole,
    Denominator,
    from,
    INITIAL,
    Numerator,
    sequence,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { moeomPiece } from './pieces'

const moeomWhole: (equalDivision: Denominator) => ContourWhole<PitchOnly> =
    (equalDivision: Denominator): ContourWhole<PitchOnly> =>
        slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.FractionalPart(equalDivision)))
            .map(to.Numerator)
            .reduce(
                (accumulator: ContourWhole<PitchOnly>, equalDivisionStep: Numerator): ContourWhole<PitchOnly> =>
                    to.ContourWhole<PitchOnly>(sequence([
                        accumulator,
                        moeomPiece(equalDivisionStep),
                    ])),
                to.ContourWhole<PitchOnly>([]),
            )

export {
    moeomWhole,
}
