import { Entity, Note, TimbreNameEnum } from '@musical-patterns/compiler'
import { PitchCircularTechnique, pitchCirculate } from '@musical-patterns/pattern'
import { from, to } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'
import { buildNotes } from './notes'

const materializeEntities: (spec: MoeomSpec) => Entity[] =
    (spec: MoeomSpec): Entity[] => {
        const notes: Note[] = buildNotes(spec)

        const notesForEntities: Note[][] = pitchCirculate(
            notes,
            {
                pitchClassCount: to.Cardinal(from.Denominator(spec.equalDivision)),
                technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
            },
        )

        return notesForEntities.map((notesForEntity: Note[]): Entity => ({
            notes: notesForEntity,
            timbreName: TimbreNameEnum.TROMBONE,
        }))
    }

export {
    materializeEntities,
}
