import { NoteSpec } from '@musical-patterns/compiler'
import { PitchOnly } from '@musical-patterns/pattern'
import { ContourWhole } from '@musical-patterns/utilities'
import { MoeomSpec } from '../types'
import { buildNoteSpec } from './notes'
import { moeomWhole } from './wholes'

const buildPart: (spec: MoeomSpec) => NoteSpec[] =
    (spec: MoeomSpec): NoteSpec[] => {
        const whole: ContourWhole<PitchOnly> = moeomWhole(spec.steps)

        return whole.map(buildNoteSpec)
    }

export {
    buildPart,
}
