import { PitchOnly } from '@musical-patterns/material'
import {
    as,
    ContourWhole,
    INITIAL,

    Numerator,
    sequence,
    slice,
    ZERO_AND_POSITIVE_INTEGERS,
} from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'
import { moeomPiece } from './pieces'

const moeomWhole: (specs: MoeomSpecs) => ContourWhole<PitchOnly> =
    ({ equalDivision, flipped }: MoeomSpecs): ContourWhole<PitchOnly> =>
        slice(ZERO_AND_POSITIVE_INTEGERS, INITIAL, as.Ordinal(as.number(equalDivision)))
            .map(as.Numerator)
            .reduce(
                (accumulator: ContourWhole<PitchOnly>, equalDivisionStep: Numerator): ContourWhole<PitchOnly> =>
                    as.ContourWhole<PitchOnly>(sequence(
                        accumulator,
                        moeomPiece({ equalDivisionStep, flipped }),
                    )),
                as.ContourWhole<PitchOnly>([]),
            )

export {
    moeomWhole,
}
