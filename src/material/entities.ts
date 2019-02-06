import { Entity, NoteSpec, TimbreNameEnum } from '@musical-patterns/compiler'
import { pitchCirculate } from '../custom'
import { MoeomSpec } from '../types'
import { buildPart } from './parts'

const buildEntities: (spec: MoeomSpec) => Entity[] =
    (spec: MoeomSpec): Entity[] => {
        const part: NoteSpec[] = buildPart(spec)

        const parts: NoteSpec[][] = pitchCirculate(part, spec.equalDivision)

        return parts.map((noteSpecs: NoteSpec[]): Entity => ({
            noteSpecs,
            timbreName: TimbreNameEnum.TROMBONE,
        }))
    }

export {
    buildEntities,
}
