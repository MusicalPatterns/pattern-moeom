import { apply, Count, from, INITIAL, numbers, OCTAVE, Scalar, to } from '@musical-patterns/utilities'

const buildMoeomScalars: (steps: Count) => Scalar[] =
    (steps: Count): Scalar[] => {
        const logarithmicStep: Scalar = to.Scalar(from.Base(apply.Power(OCTAVE, to.Power(1 / from.Count(steps)))))

        return numbers.slice(from.Index(INITIAL), from.Count(steps))
            .map((n: number): number => n - 1)
            .map((n: number): Scalar =>
                apply.Power(logarithmicStep, to.Power(n)))
    }

export {
    buildMoeomScalars,
}
