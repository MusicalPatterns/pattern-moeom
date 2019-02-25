import {
    RangedSpecPropertyAttributes,
    SpecAttributes,
    StandardSpec,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { Denominator } from '@musical-patterns/utilities'

interface MoeomSpec extends StandardSpec {
    equalDivision: Denominator,
    flipped: boolean,
}

interface MoeomSpecAttributes extends SpecAttributes<MoeomSpec> {
    equalDivision: RangedSpecPropertyAttributes,
    flipped: ToggledSpecPropertyAttributes,
}

export {
    MoeomSpec,
    MoeomSpecAttributes,
}
