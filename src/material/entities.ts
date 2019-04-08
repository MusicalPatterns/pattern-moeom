import { Entity, Note, TimbreNameEnum } from '@musical-patterns/material'
import { PitchCircularTechnique, pitchCirculate } from '@musical-patterns/pattern'
import { from, to } from '@musical-patterns/utilities'
import { MoeomSpecs } from '../spec'
import { computeNotes } from './notes'

const materializeEntities: (specs: MoeomSpecs) => Entity[] =
    (specs: MoeomSpecs): Entity[] => {
        const notes: Note[] = computeNotes(specs)

        const entitiesNotes: Note[][] = pitchCirculate(
            notes,
            {
                pitchClassCount: to.Cardinal(from.Denominator(specs.equalDivision)),
                technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
            },
        )

        return entitiesNotes.map((entityNotes: Note[]): Entity => ({
            sections: [ { notes: entityNotes } ],
            timbreName: TimbreNameEnum.TROMBONE,
        }))
    }

export {
    materializeEntities,
}
