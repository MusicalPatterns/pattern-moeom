import {
    Configurations,
    RangedConfiguration,
    StandardSpecs,
    ToggledConfiguration,
} from '@musical-patterns/spec'
import { Denominator } from '@musical-patterns/utilities'

interface MoeomSpecs extends StandardSpecs {
    equalDivision: Denominator,
    flipped: boolean,
}

interface MoeomConfigurations extends Configurations<MoeomSpecs> {
    equalDivision: RangedConfiguration,
    flipped: ToggledConfiguration,
}

export {
    MoeomSpecs,
    MoeomConfigurations,
}
