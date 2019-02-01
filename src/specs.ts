import {
    SpecAttributesFor,
    SpecDataFor,
    standardInitialSpec,
    StandardSpec,
    standardSpecAttributes,
} from '@musical-patterns/pattern'

const initial: StandardSpec = {
    ...standardInitialSpec,
}

const attributes: SpecAttributesFor<StandardSpec> = {
    ...standardSpecAttributes,
}

const specData: SpecDataFor<StandardSpec> = {
    attributes,
    initial,
}

export {
    specData,
}
