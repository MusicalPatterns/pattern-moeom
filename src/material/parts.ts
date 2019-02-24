import { NoteSpec } from '@musical-patterns/compiler'
import { PitchOnly } from '@musical-patterns/pattern'
import { ContourWhole } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'
import { buildNoteSpec } from './notes'
import { moeomWhole } from './wholes'

const buildPart: (spec: MoeomSpec) => NoteSpec[] =
    (spec: MoeomSpec): NoteSpec[] => {
        const whole: ContourWhole<PitchOnly> = moeomWhole(spec)

        return whole.map(buildNoteSpec)
    }

export {
    buildPart,
}
