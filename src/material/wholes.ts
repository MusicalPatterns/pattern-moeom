import { PitchOnly } from '@musical-patterns/pattern'
import {
    ContourWhole,
    from,
    INITIAL,
    Numerator,
    sequence,
    slice,
    to,
    zeroAndPositiveIntegers,
} from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'
import { moeomPiece } from './pieces'

const moeomWhole: (specs: MoeomSpecs) => ContourWhole<PitchOnly> =
    ({ equalDivision, flipped }: MoeomSpecs): ContourWhole<PitchOnly> =>
        slice(zeroAndPositiveIntegers, INITIAL, to.Ordinal(from.Denominator(equalDivision)))
            .map(to.Numerator)
            .reduce(
                (accumulator: ContourWhole<PitchOnly>, equalDivisionStep: Numerator): ContourWhole<PitchOnly> =>
                    to.ContourWhole<PitchOnly>(sequence(
                        accumulator,
                        moeomPiece({ equalDivisionStep, flipped }),
                    )),
                to.ContourWhole<PitchOnly>([]),
            )

export {
    moeomWhole,
}
