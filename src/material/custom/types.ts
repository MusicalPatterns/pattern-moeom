import { Cardinal, Ordinal, Scalar } from '@musical-patterns/utilities'

enum PitchCircularTechnique {
    INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT = 'INDEX_TRANSLATION_BY_PITCH_CLASS_COUNT',
    SCALAR_SCALING_BY_WINDOW_SIZE = 'SCALAR_SCALING_BY_WINDOW_SIZE',
}

interface PitchCirculateOptions {
    pitchClassCount?: Cardinal,
    technique: PitchCircularTechnique,
}

interface CalculateCircledPitchIndexParameters {
    pitchClassCount: Cardinal,
    tierIndex: Ordinal,
}

interface ApplyPitchCircularGainCurveParameters {
    circledPitchIndex: Ordinal,
    pitchClassCount: Cardinal,
}

export {
    PitchCircularTechnique,
    PitchCirculateOptions,
    CalculateCircledPitchIndexParameters,
    ApplyPitchCircularGainCurveParameters,
}
