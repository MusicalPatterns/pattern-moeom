import { Note } from '@musical-patterns/compiler'
import { PitchOnly, STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { Amplitude, ContourElement, from, Scalar, to } from '@musical-patterns/utilities'
import { REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD } from './constants'

const computeNote: (contourElement: ContourElement<PitchOnly>) => Note =
    ([ pitch ]: ContourElement<PitchOnly>): Note => ({
        duration: {
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        gain: {
            scalar: from.Amplitude<Scalar, Scalar<Amplitude>>(REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD),
        },
        pitch: {
            index: to.Ordinal(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
    })

export {
    computeNote,
}