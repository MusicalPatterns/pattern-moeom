import { MaterializeScales, materializeStandardScales, Scale } from '@musical-patterns/material'
import {
    computeEqualDivisionScalars,
    computeOctaveRepeatingScalars,
    from,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'

const materializeScales: MaterializeScales =
    (specs: MoeomSpecs): Scale[] => {
        const pitchScalars: Scalar[] =
            computeOctaveRepeatingScalars(
                computeEqualDivisionScalars(specs.equalDivision)
                    .map(to.Frequency),
            )
                .map<Scalar>(from.Frequency)

        return materializeStandardScales(specs, { pitchScalars })
    }

export {
    materializeScales,
}
