import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import { buildStandardScales, generateOctaveRepeatingScalars } from '@musical-patterns/pattern'
import { buildEqualDivisionScalars, from, Scalar, to } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'

const buildScales: BuildScalesFunction =
    (spec: MoeomSpec): Scale[] => {
        const pitchScalars: Scalar[] =
            generateOctaveRepeatingScalars(
                buildEqualDivisionScalars(spec.equalDivision)
                    .map(to.Frequency),
            )
                .map<Scalar>(from.Frequency)

        return buildStandardScales(spec, { pitchScalars })
    }

export {
    buildScales,
}
