import { RangedSpecPropertyAttributes, Spec, SpecAttributes } from '@musical-patterns/pattern'
import { Denominator } from '@musical-patterns/utilities'

interface MoeomSpec extends Spec {
    equalDivision: Denominator,
}

interface MoeomSpecAttributes extends SpecAttributes {
    equalDivision: RangedSpecPropertyAttributes,
}

export {
    MoeomSpec,
    MoeomSpecAttributes,
}
