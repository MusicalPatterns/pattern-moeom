import { Entity, Material, Scale } from '@musical-patterns/compiler'
import { Id, Metadata, PatternFor, Patterns, StandardSpec } from '@musical-patterns/pattern'
import { post } from './metadata'
import { specData } from './specs'

const material: Material = {
    buildEntitiesFunction: (): Entity[] => [],
    buildScalesFunction: (): Scale[] => [],
}

const metadata: Metadata = {
    description: post,
    formattedName: 'Moeom',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-10-31T07:00:00.000Z',
    musicalIdeaIllustrated: '',
    originalPublish: '2018-10-31T07:00:00.000Z',
}

const pattern: PatternFor<StandardSpec> = {
    id: Id.MOEOM,
    material,
    metadata,
    specData,
}

const patterns: Patterns = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
