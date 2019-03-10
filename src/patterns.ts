import { Material } from '@musical-patterns/compiler'
import { Id, Metadata, Pattern, Patterns } from '@musical-patterns/pattern'
import { materializeEntities, materializeScales } from './material'
import { post } from './metadata'
import { data, MoeomSpec } from './spec'

const material: Material = {
    materializeEntities,
    materializeScales,
}

const metadata: Metadata = {
    description: post,
    formattedName: 'Moeom',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-10-31T07:00:00.000Z',
    musicalIdeaIllustrated: 'when step sizes increase in pitch circular space, eventually harmonic direction flips',
    originalPublish: '2018-10-31T07:00:00.000Z',
    version: process.env.PATTERN_VERSION || 'unknown',
}

const pattern: Pattern<MoeomSpec> = {
    data,
    id: Id.MOEOM,
    material,
    metadata,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
