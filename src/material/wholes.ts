import { PitchOnly } from '@musical-patterns/pattern'
import {
    Cardinal,
    ContourWhole,
    from,
    INITIAL,
    sequence,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { moeomPiece } from './pieces'

const moeomWhole: (equalDivision: Cardinal) => ContourWhole<PitchOnly> =
    (equalDivision: Cardinal): ContourWhole<PitchOnly> =>
        slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Cardinal(equalDivision)))
            .map(to.Cardinal)
            .reduce(
                (accumulator: ContourWhole<PitchOnly>, countOfEqualDivisionSteps: Cardinal): ContourWhole<PitchOnly> =>
                    to.ContourWhole<PitchOnly>(sequence([
                        accumulator,
                        moeomPiece(countOfEqualDivisionSteps),
                    ])),
                to.ContourWhole<PitchOnly>([]),
            )

export {
    moeomWhole,
}
