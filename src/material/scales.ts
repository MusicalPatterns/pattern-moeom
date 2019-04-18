import { MaterializeScales, materializeStandardScales, Scale } from '@musical-patterns/material'
import { computeEqualDivisionScalars, computeOctaveRepeatingScalars, Hz, Scalar } from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'

const materializeScales: MaterializeScales =
    (specs: MoeomSpecs): Scale[] => {
        const pitchScalars: Array<Scalar<Hz>> =
            computeOctaveRepeatingScalars(
                computeEqualDivisionScalars(specs.equalDivision),
            )

        return materializeStandardScales(specs, { pitchScalars })
    }

export {
    materializeScales,
}
