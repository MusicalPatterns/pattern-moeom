import {
    Note,
    PitchOnly,
    REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD,
    STANDARD_DURATION_SCALE_INDEX,
    STANDARD_PITCH_SCALE_INDEX,
} from '@musical-patterns/material'
import { as, ContourElement, Pitch, Scalar } from '@musical-patterns/utilities'

const computeNote: (contourElement: ContourElement<PitchOnly>) => Note =
    ([ pitch ]: ContourElement<PitchOnly>): Note => ({
        duration: {
            scaleIndex: STANDARD_DURATION_SCALE_INDEX,
        },
        gain: {
            scalar: REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD,
        },
        pitch: {
            index: as.Ordinal<Array<Scalar<Pitch>>>(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
    })

export {
    computeNote,
}
