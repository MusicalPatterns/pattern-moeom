import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import {
    buildStandardScales,
    generateOctaveRepeatingScalars,
    StandardSpecProperties,
} from '@musical-patterns/pattern'
import { from, NO_TRANSLATION, to } from '@musical-patterns/utilities'
import { MoeomSpec } from '../types'
import { buildMoeomScalars } from './scalars'

const buildScales: BuildScalesFunction =
    (spec: MoeomSpec): Scale[] => {
        const { nonScale, flatDurationsScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = {
            scalar: to.Scalar(from.Milliseconds(spec[ StandardSpecProperties.BASE_DURATION ] || to.Milliseconds(1))),
            scalars: flatDurationsScale.scalars,
            translation: spec[ StandardSpecProperties.DURATION_TRANSLATION ] || NO_TRANSLATION,
        }

        const pitchesScale: Scale = {
            scalar: to.Scalar(from.Frequency(spec[ StandardSpecProperties.BASE_FREQUENCY ] || to.Frequency(1))),
            scalars: generateOctaveRepeatingScalars(buildMoeomScalars(spec.equalDivision)),
            translation: spec[ StandardSpecProperties.FREQUENCY_TRANSLATION ] || NO_TRANSLATION,
        }

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildScales,
}
