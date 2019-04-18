import { PitchOnly } from '@musical-patterns/material'
import { apply, ContourWhole, from, Numerator, to, TWICE } from '@musical-patterns/utilities'

const moeomPiece:
    ({ equalDivisionStep, flipped }: { equalDivisionStep: Numerator, flipped: boolean }) => ContourWhole<PitchOnly> =
    ({ equalDivisionStep, flipped }: { equalDivisionStep: Numerator, flipped: boolean }): ContourWhole<PitchOnly> =>
        to.ContourWhole<PitchOnly>([
            [ 0 ],
            [ (flipped ? -1 : 1) * from.Numerator(equalDivisionStep) ],
            [ (flipped ? -1 : 1) * from.Numerator(apply.Scalar(
                equalDivisionStep,
                to.Scalar<Numerator>(from.Cardinal(TWICE)),
            )) ],
        ])

export {
    moeomPiece,
}
