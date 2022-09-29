import { Configurations, RangedConfiguration, Specs, ToggledConfiguration } from '@musical-patterns/spec'
import { Denominator } from '@musical-patterns/utilities'

enum MoeomSpec {
    EQUAL_DIVISION = 'equalDivision',
    FLIPPED = 'flipped',
}

interface MoeomSpecs extends Specs {
    // @ts-ignore
    [ MoeomSpec.EQUAL_DIVISION ]: Denominator,
    [ MoeomSpec.FLIPPED ]: boolean,
}

interface MoeomConfigurations extends Configurations<MoeomSpecs> {
    equalDivision: RangedConfiguration,
    flipped: ToggledConfiguration,
}

export {
    MoeomSpec,
    MoeomSpecs,
    MoeomConfigurations,
}
