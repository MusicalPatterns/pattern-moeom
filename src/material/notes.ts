import { Note } from '@musical-patterns/compiler'
import { PitchOnly } from '@musical-patterns/pattern'
import { ContourWhole } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'
import { computeNote } from './features'
import { moeomWhole } from './wholes'

const computeNotes: (spec: MoeomSpec) => Note[] =
    (spec: MoeomSpec): Note[] => {
        const whole: ContourWhole<PitchOnly> = moeomWhole(spec)

        return whole.map(computeNote)
    }

export {
    computeNotes,
}
