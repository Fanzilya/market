import plan1 from "./svg/plan-1.svg"
import plan2 from "./svg/plan-2.svg"
import plan3 from "./svg/plan-3.svg"
import plan4 from "./svg/plan-4.svg"


export enum SchemeParams {
    plan1 = 1,
    plan2 = 2,
    plan3 = 3,
    plan4 = 4,
}


export const dataScheme = [
    {
        value: SchemeParams.plan1,
        image: plan1,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        value: SchemeParams.plan2,
        image: plan2,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        value: SchemeParams.plan3,
        image: plan3,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        value: SchemeParams.plan4,
        image: plan4,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
]


export const checkBox = [
    {
        name: "План 1",
        value: SchemeParams.plan1,
        checked: false,
    },
    {
        name: "План 2",
        value: SchemeParams.plan2,
        checked: false,
    },
    {
        name: "План 3",
        value: SchemeParams.plan3,
        checked: false,
    },
    {
        name: "План 4",
        value: SchemeParams.plan4,
        checked: false,
    },
]