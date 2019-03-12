import {
    Configurations,
    RangedConfiguration,
    Specs,
    ToggledConfiguration,
} from '@musical-patterns/pattern'
import { Denominator } from '@musical-patterns/utilities'

interface MoeomSpecs extends Specs {
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
