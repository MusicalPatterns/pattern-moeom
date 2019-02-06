import { PitchOnly } from '@musical-patterns/pattern'
import { apply, Cardinal, ContourWhole, from, to, TWICE } from '@musical-patterns/utilities'

const moeomPiece: (countOfEqualDivisionSteps: Cardinal) => ContourWhole<PitchOnly> =
    (countOfEqualDivisionSteps: Cardinal): ContourWhole<PitchOnly> =>
        to.ContourWhole<PitchOnly>([
            [ 0 ],
            [ from.Cardinal(countOfEqualDivisionSteps) ],
            [ from.Cardinal(apply.Cardinal(countOfEqualDivisionSteps, TWICE)) ],
        ])

export {
    moeomPiece,
}
