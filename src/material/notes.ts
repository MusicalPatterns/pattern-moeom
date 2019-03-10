import { Note } from '@musical-patterns/compiler'
import { PitchOnly } from '@musical-patterns/pattern'
import { ContourWhole } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'
import { buildNote } from './features'
import { moeomWhole } from './wholes'

const buildNotes: (spec: MoeomSpec) => Note[] =
    (spec: MoeomSpec): Note[] => {
        const whole: ContourWhole<PitchOnly> = moeomWhole(spec)

        return whole.map(buildNote)
    }

export {
    buildNotes,
}
