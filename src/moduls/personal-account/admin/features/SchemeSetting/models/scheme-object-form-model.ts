import { makeAutoObservable } from "mobx";

class SchemeObjectFormModel {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}

export const schemeObjectFormModel = new SchemeObjectFormModel();