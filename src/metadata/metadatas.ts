import { Metadata } from '@musical-patterns/pattern'
import { post } from './posts'

const metadata: Metadata = {
    description: post,
    formattedName: 'Moeom',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-10-31T07:00:00.000Z',
    musicalIdeaIllustrated: 'when step sizes increase in pitch circular space, eventually harmonic direction flips',
    originalPublish: '2018-10-31T07:00:00.000Z',
    version: process.env.PATTERN_VERSION || 'unknown',
}

export {
    metadata,
}
