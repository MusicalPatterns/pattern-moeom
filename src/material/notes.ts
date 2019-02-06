import { NoteSpec } from '@musical-patterns/compiler'
import { PitchOnly, STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX } from '@musical-patterns/pattern'
import { ContourElement, to } from '@musical-patterns/utilities'

const buildNoteSpec: (pitchOnlyContourElement: ContourElement<PitchOnly>) => NoteSpec =
    (pitchOnlyContourElement: ContourElement<PitchOnly>): NoteSpec => ({
        durationSpec: {
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        pitchSpec: {
            index: to.Ordinal(pitchOnlyContourElement[ 0 ]),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
