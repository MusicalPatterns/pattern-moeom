import {
    Note,
    PitchOnly,
    REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD,
} from '@musical-patterns/material'
import { as, ContourElement, Pitch, Scalar } from '@musical-patterns/utilities'

const computeNote: (contourElement: ContourElement<PitchOnly>) => Note =
    ([ pitch ]: ContourElement<PitchOnly>): Note => ({
        intensity: {
            scalar: REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD,
        },
        pitch: {
            index: as.Ordinal<Array<Scalar<Pitch>>>(pitch),
        },
    })

export {
    computeNote,
}
