import { NoteSpec } from '@musical-patterns/compiler'
import { PitchOnly, STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { Amplitude, ContourElement, from, Scalar, to } from '@musical-patterns/utilities'
import { REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD } from './constants'

const buildNoteSpec: (contourElement: ContourElement<PitchOnly>) => NoteSpec =
    ([ pitch ]: ContourElement<PitchOnly>): NoteSpec => ({
        durationSpec: {
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        gainSpec: {
            scalar: from.Amplitude<Scalar, Scalar<Amplitude>>(REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD),
        },
        pitchSpec: {
            index: to.Ordinal(pitch),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
