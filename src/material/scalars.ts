import { apply, Count, from, INITIAL, OCTAVE, Scalar, to, zeroAndPositiveIntegers } from '@musical-patterns/utilities'

const buildMoeomScalars: (steps: Count) => Scalar[] =
    (steps: Count): Scalar[] => {
        const logarithmicStep: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(1 / from.Count(steps)))))

        return zeroAndPositiveIntegers.slice(from.Index(INITIAL), from.Count(steps))
            .map((n: number): Scalar =>
                apply.Power(logarithmicStep, to.Power(n)))
    }

export {
    buildMoeomScalars,
}
