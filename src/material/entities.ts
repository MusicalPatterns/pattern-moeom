import { Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { from, to } from '@musical-patterns/utilities'
import { MoeomSpec } from '../spec'
import { PitchCircularTechnique, pitchCirculate } from './custom'
import { buildPart } from './parts'

const buildEntities: (spec: MoeomSpec) => Entity[] =
    (spec: MoeomSpec): Entity[] => {
        const part: NoteSpec[] = buildPart(spec)

        const parts: NoteSpec[][] = pitchCirculate(
            part,
            {
                pitchClassCount: to.Cardinal(from.Denominator(spec.equalDivision)),
                technique: PitchCircularTechnique.INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT,
            },
        )

        return parts.map((noteSpecs: NoteSpec[]): Entity => ({
            noteSpecs,
            timbreName: TimbreNameEnum.TROMBONE,
        }))
    }

export {
    buildEntities,
}
