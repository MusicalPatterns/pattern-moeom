import { apply, ContourWhole, Count, from, to, TWICE } from '@musical-patterns/utilities'
import { PitchOnly } from './types'

const moeomPiece: (step: Count) => ContourWhole<PitchOnly> =
    (step: Count): ContourWhole<PitchOnly> =>
        to.ContourWhole<PitchOnly>([
            [ 0 ],
            [ from.Count(step) ],
            [ apply.Scalar(from.Count(step), to.Scalar(from.Count(TWICE))) ],
        ])

export {
    moeomPiece,
}
