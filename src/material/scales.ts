import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import {
    buildStandardScales,
    generateOctaveRepeatingScalars,
    StandardSpecProperties,
} from '@musical-patterns/pattern'
import { buildEqualDivisionScalars, from, NO_TRANSLATION, Scalar, to, Translation } from '@musical-patterns/utilities'
import { MoeomSpec } from '../types'

const buildScales: BuildScalesFunction =
    (spec: MoeomSpec): Scale[] => {
        const { nonScale, flatDurationsScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationScalar: Scalar =
            from.Ms(spec[ StandardSpecProperties.BASE_DURATION ] || to.Scalar(to.Ms(1)))
        const durationTranslation: Translation =
            from.Ms(spec[ StandardSpecProperties.DURATION_TRANSLATION ] || to.Ms(NO_TRANSLATION))
        const durationsScale: Scale = {
            scalar: durationScalar,
            scalars: flatDurationsScale.scalars,
            translation: durationTranslation,
        }
        const pitchesScalar: Scalar =
            from.Hz(spec[ StandardSpecProperties.BASE_FREQUENCY ] || to.Scalar(to.Hz(1)))
        const pitchesTranslation: Translation =
            from.Hz(spec[ StandardSpecProperties.FREQUENCY_TRANSLATION ] || to.Hz(NO_TRANSLATION))
        const pitchesScale: Scale = {
            scalar: pitchesScalar,
            scalars: generateOctaveRepeatingScalars(buildEqualDivisionScalars(spec.equalDivision)),
            translation: pitchesTranslation,
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
