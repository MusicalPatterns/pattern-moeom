import { Material } from '@musical-patterns/compiler'
import { Id, Metadata, Pattern, Patterns } from '@musical-patterns/pattern'
import { buildEntities, buildScales } from './material'
import { post } from './metadata'
import { MoeomSpec, specData } from './spec'

const material: Material = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
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
    id: Id.MOEOM,
    material,
    metadata,
    specData,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
