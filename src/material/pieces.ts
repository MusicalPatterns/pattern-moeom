import { PitchOnly } from '@musical-patterns/material'
import { as, ContourWhole, notAs, Numerator, TWICE, use } from '@musical-patterns/utilities'

const moeomPiece:
    ({ equalDivisionStep, flipped }: { equalDivisionStep: Numerator, flipped: boolean }) => ContourWhole<PitchOnly> =
    ({ equalDivisionStep, flipped }: { equalDivisionStep: Numerator, flipped: boolean }): ContourWhole<PitchOnly> =>
        as.ContourWhole<PitchOnly>([
            [ 0 ],
            [ (flipped ? -1 : 1) * notAs.Numerator(equalDivisionStep) ],
            [ (flipped ? -1 : 1) * notAs.Numerator(use.Multiple(
                equalDivisionStep,
                as.Multiple<Numerator>(notAs.Cardinal(TWICE)),
            )) ],
        ])

export {
    moeomPiece,
}
