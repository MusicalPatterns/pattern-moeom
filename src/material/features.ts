import { Note, PitchOnly, STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/material'
import { as, ContourElement, Scalar } from '@musical-patterns/utilities'
import { REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD } from './constants'

const computeNote: (contourElement: ContourElement<PitchOnly>) => Note =
    ([ pitch ]: ContourElement<PitchOnly>): Note => ({
        duration: {
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        gain: {
            scalar: REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD,
        },
        pitch: {
            index: as.Ordinal<Scalar>(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
    })

export {
    computeNote,
}
