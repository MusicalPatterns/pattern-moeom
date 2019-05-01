import { PitchOnly } from '@musical-patterns/material'
import { as, ContourWhole, Numerator, TWICE, use } from '@musical-patterns/utilities'

const moeomPiece:
    ({ equalDivisionStep, flipped }: { equalDivisionStep: Numerator, flipped: boolean }) => ContourWhole<PitchOnly> =
    ({ equalDivisionStep, flipped }: { equalDivisionStep: Numerator, flipped: boolean }): ContourWhole<PitchOnly> =>
        as.ContourWhole<PitchOnly>([
            [ 0 ],
            [ (flipped ? -1 : 1) * as.number(equalDivisionStep) ],
            [ (flipped ? -1 : 1) * as.number(use.Multiple(
                equalDivisionStep,
                as.Multiple<Numerator>(as.number(TWICE)),
            )) ],
        ])

export {
    moeomPiece,
}
