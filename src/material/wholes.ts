import { ContourWhole, Count, from, INITIAL, numbers, sequence, to } from '@musical-patterns/utilities'
import { moeomPiece } from './pieces'
import { PitchOnly } from './types'

const moeomWhole: (steps: Count) => ContourWhole<PitchOnly> =
    (steps: Count): ContourWhole<PitchOnly> =>
        numbers.slice(from.Index(INITIAL), from.Count(steps))
            .map((n: number): number => n - 1)
            .map(to.Count)
            .reduce(
                (accumulator: ContourWhole<PitchOnly>, step: Count): ContourWhole<PitchOnly> =>
                    to.ContourWhole<PitchOnly>(sequence([ accumulator, moeomPiece(step) ])),
                to.ContourWhole<PitchOnly>([]),
            )

export {
    moeomWhole,
}
