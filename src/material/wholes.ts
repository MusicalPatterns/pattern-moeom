import { PitchOnly } from '@musical-patterns/material'
import { as, ContourWhole, Numerator, range, sequence } from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'
import { moeomPiece } from './pieces'

const moeomWhole: (specs: MoeomSpecs) => ContourWhole<PitchOnly> =
    ({ equalDivision, flipped }: MoeomSpecs): ContourWhole<PitchOnly> =>
        range(equalDivision)
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
