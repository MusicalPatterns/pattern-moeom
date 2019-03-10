import {
    Attributes,
    RangedPropertyAttributes,
    Spec,
    ToggledPropertyAttributes,
} from '@musical-patterns/pattern'
import { Denominator } from '@musical-patterns/utilities'

interface MoeomSpec extends Spec {
    equalDivision: Denominator,
    flipped: boolean,
}

interface MoeomAttributes extends Attributes<MoeomSpec> {
    equalDivision: RangedPropertyAttributes,
    flipped: ToggledPropertyAttributes,
}

export {
    MoeomSpec,
    MoeomAttributes,
}
