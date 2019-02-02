import { RangedSpecPropertyAttributes, Spec, SpecAttributes } from '@musical-patterns/pattern'
import { Count } from '@musical-patterns/utilities'

interface MoeomSpec extends Spec {
    steps: Count,
}

interface MoeomSpecAttributes extends SpecAttributes {
    steps: RangedSpecPropertyAttributes,
}

export {
    MoeomSpec,
    MoeomSpecAttributes,
}
