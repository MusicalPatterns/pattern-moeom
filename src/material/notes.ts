import { Note } from '@musical-patterns/material'
import { PitchOnly } from '@musical-patterns/pattern'
import { ContourWhole } from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'
import { computeNote } from './features'
import { moeomWhole } from './wholes'

const computeNotes: (specs: MoeomSpecs) => Note[] =
    (specs: MoeomSpecs): Note[] => {
        const whole: ContourWhole<PitchOnly> = moeomWhole(specs)

        return whole.map(computeNote)
    }

export {
    computeNotes,
}
