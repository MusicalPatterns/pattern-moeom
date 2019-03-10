import { MaterializeScales, Scale } from '@musical-patterns/compiler'
import { generateOctaveRepeatingScalars, materializeStandardScales } from '@musical-patterns/pattern'
import { buildEqualDivisionScalars, from, Scalar, to } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'

const materializeScales: MaterializeScales =
    (spec: MoeomSpec): Scale[] => {
        const pitchScalars: Scalar[] =
            generateOctaveRepeatingScalars(
                buildEqualDivisionScalars(spec.equalDivision)
                    .map(to.Frequency),
            )
                .map<Scalar>(from.Frequency)

        return materializeStandardScales(spec, { pitchScalars })
    }

export {
    materializeScales,
}
