import { PitchOnly } from '@musical-patterns/pattern'
import { ContourWhole, Count, from, INITIAL, sequence, to, zeroAndPositiveIntegers } from '@musical-patterns/utilities'
import { moeomPiece } from './pieces'

const moeomWhole: (steps: Count) => ContourWhole<PitchOnly> =
    (steps: Count): ContourWhole<PitchOnly> =>
        zeroAndPositiveIntegers.slice(from.Index(INITIAL), from.Count(steps))
            .map(to.Count)
            .reduce(
                (accumulator: ContourWhole<PitchOnly>, step: Count): ContourWhole<PitchOnly> =>
                    to.ContourWhole<PitchOnly>(sequence([ accumulator, moeomPiece(step) ])),
                to.ContourWhole<PitchOnly>([]),
            )

export {
    moeomWhole,
}
