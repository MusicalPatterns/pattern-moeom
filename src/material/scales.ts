import { MaterializeScales, materializeStandardScales, Scales } from '@musical-patterns/material'
import {
    computeEqualDivisionPitchScalars,
    computeOctaveRepeatingPitchScalars,
    Pitch,
    Scalar,
} from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'

const materializeScales: MaterializeScales =
    (specs: MoeomSpecs): Scales => {
        const pitchScalars: Array<Scalar<Pitch>> =
            computeOctaveRepeatingPitchScalars(
                computeEqualDivisionPitchScalars(specs.equalDivision),
            )

        return materializeStandardScales(specs, { pitchScalars })
    }

export {
    materializeScales,
}
