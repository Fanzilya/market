import { Button } from "@/shared/ui-kits/button";
import Icon from "@/shared/ui-kits/Icon";
import { Input } from "@/shared/ui-kits/Input";
import Loader from "@/shared/ui-kits/loader/loader";
import { Selector } from "@/shared/ui-kits/select";
import { SeletectItemInterface } from "@/shared/ui-kits/select/src/type";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface Props {
    formData: any,
    setFormData: any,
    isLoading: boolean,
    types: SeletectItemInterface[],
    styles: any,
}


export const SuplierCompanyFormInputs = observer(({ formData, setFormData, isLoading, types, styles }: Props) => {
    return (
        <>
            <Input
                required
                label="Полное наименование компании"
                type="text"
                value={formData.fullCompanyName}
                onChange={(e) => setFormData("fullCompanyName", e)}
                placeholder="ООО «Ромашка»"
                disabled={isLoading}
            />

            <Input
                required
                label="Краткое наименование компании"
                type="text"
                value={formData.shortCompanyName}
                onChange={(e) => setFormData("shortCompanyName", e)}
                placeholder="ООО «Ромашка»"
                disabled={isLoading}
            />

            <Input
                required
                label="ИНН"
                type="number"
                value={formData.inn}
                onChange={(e) => setFormData("inn", e)}
                placeholder="1234567890"
                disabled={isLoading}
            />

            <Input
                required
                label="КПП"
                type="number"
                value={formData.kpp}
                onChange={(e) => setFormData("kpp", e)}
                placeholder="123456789"
                disabled={isLoading}
            />

            <Input
                required
                label="Юридический адрес"
                type="text"
                value={formData.jurAdress}
                onChange={(e) => setFormData("jurAdress", e)}
                placeholder="г. Москва, ул. Примерная, д. 1"
                disabled={isLoading}
            />

            <div className={styles.inputGroup}>
                <label className={styles.label}>Тип компании <span className="text-red-500">*</span></label>
                <Selector
                    placeholder="Тип компании"
                    onSelect={(value) => setFormData("companyTypeId", value.value)}
                    items={types}
                    defaultValue={formData.companyTypeId}
                />
            </div>
        </>
    );
})