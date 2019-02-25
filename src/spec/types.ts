import {
    RangedSpecPropertyAttributes,
    SpecAttributesFor,
    StandardSpec,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { Denominator } from '@musical-patterns/utilities'

interface MoeomSpec extends StandardSpec {
    equalDivision: Denominator,
    flipped: boolean,
}

interface MoeomSpecAttributes extends SpecAttributesFor<MoeomSpec> {
    equalDivision: RangedSpecPropertyAttributes,
    flipped: ToggledSpecPropertyAttributes,
}

export {
    MoeomSpec,
    MoeomSpecAttributes,
}
