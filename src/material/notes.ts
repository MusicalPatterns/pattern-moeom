import { NoteSpec } from '@musical-patterns/compiler'
import { STANDARD_DURATIONS_SCALE_INDEX, STANDARD_PITCH_SCALE_INDEX, StandardContour } from '@musical-patterns/pattern'
import { ContourElement, to } from '@musical-patterns/utilities'
import { PitchOnly } from './types'

const buildNoteSpec: (pitchOnlyContourElement: ContourElement<PitchOnly>) => NoteSpec =
    (pitchOnlyContourElement: ContourElement<PitchOnly>): NoteSpec => ({
        durationSpec: {
            scaleIndex: STANDARD_DURATIONS_SCALE_INDEX,
        },
        pitchSpec: {
            index: to.Index(pitchOnlyContourElement[ 0 ]),
            scaleIndex: STANDARD_PITCH_SCALE_INDEX,
        },
    })

export {
    buildNoteSpec,
}
