import { Id, Pattern, Patterns } from '@musical-patterns/pattern'
import { material } from './material'
import { metadata } from './metadata'
import { MoeomSpecs, spec } from './spec'

const pattern: Pattern<MoeomSpecs> = {
    id: Id.MOEOM,
    material,
    metadata,
    spec,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
