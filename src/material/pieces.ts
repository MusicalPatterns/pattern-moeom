import { PitchOnly } from '@musical-patterns/pattern'
import { apply, ContourWhole, from, Numerator, to, TWICE } from '@musical-patterns/utilities'

const moeomPiece: (equalDivisionStep: Numerator) => ContourWhole<PitchOnly> =
    (equalDivisionStep: Numerator): ContourWhole<PitchOnly> =>
        to.ContourWhole<PitchOnly>([
            [ 0 ],
            [ from.Numerator(equalDivisionStep) ],
            [ from.Numerator(apply.Scalar(equalDivisionStep, to.Scalar(from.Cardinal(TWICE)))) ],
        ])

export {
    moeomPiece,
}
