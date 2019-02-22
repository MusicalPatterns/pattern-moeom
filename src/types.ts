import {
    RangedSpecPropertyAttributes,
    Spec,
    SpecAttributes,
    ToggledSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { Denominator } from '@musical-patterns/utilities'

interface MoeomSpec extends Spec {
    equalDivision: Denominator,
    flipped: boolean,
}

interface MoeomSpecAttributes extends SpecAttributes {
    equalDivision: RangedSpecPropertyAttributes,
    flipped: ToggledSpecPropertyAttributes,
}

export {
    MoeomSpec,
    MoeomSpecAttributes,
}
