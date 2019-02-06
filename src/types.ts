import { RangedSpecPropertyAttributes, Spec, SpecAttributes } from '@musical-patterns/pattern'
import { Cardinal } from '@musical-patterns/utilities'

interface MoeomSpec extends Spec {
    equalDivision: Cardinal,
}

interface MoeomSpecAttributes extends SpecAttributes {
    equalDivision: RangedSpecPropertyAttributes,
}

export {
    MoeomSpec,
    MoeomSpecAttributes,
}
