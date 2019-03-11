import { MaterializeScales, Scale } from '@musical-patterns/compiler'
import { computeOctaveRepeatingScalars, materializeStandardScales } from '@musical-patterns/pattern'
import { computeEqualDivisionScalars, from, Scalar, to } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'

const materializeScales: MaterializeScales =
    (spec: MoeomSpec): Scale[] => {
        const pitchScalars: Scalar[] =
            computeOctaveRepeatingScalars(
                computeEqualDivisionScalars(spec.equalDivision)
                    .map(to.Frequency),
            )
                .map<Scalar>(from.Frequency)

        return materializeStandardScales(spec, { pitchScalars })
    }

export {
    materializeScales,
}
