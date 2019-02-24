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
import { MoeomSpec } from '../spec'
import { moeomPiece } from './pieces'

const moeomWhole: (spec: MoeomSpec) => ContourWhole<PitchOnly> =
    ({ equalDivision, flipped }: MoeomSpec): ContourWhole<PitchOnly> =>
        slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Denominator(equalDivision)))
            .map(to.Numerator)
            .reduce(
                (accumulator: ContourWhole<PitchOnly>, equalDivisionStep: Numerator): ContourWhole<PitchOnly> =>
                    to.ContourWhole<PitchOnly>(sequence([
                        accumulator,
                        moeomPiece({ equalDivisionStep, flipped }),
                    ])),
                to.ContourWhole<PitchOnly>([]),
            )

export {
    moeomWhole,
}
