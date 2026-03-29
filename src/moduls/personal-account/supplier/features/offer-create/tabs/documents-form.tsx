import { IOfferCreate, IOfferDocs } from "@/entities/offer/type";
import { Input } from "@/shared/ui-kits/Input";
import { InputFile } from "@/shared/ui-kits/Input/input-file";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";


interface Props {
    docsModel: IOfferDocs,
    setDocsModel: <K extends keyof IOfferDocs>(name: K, value: IOfferDocs[K]) => void
}

export const DocumentsForm = observer(({ docsModel, setDocsModel }: Props) => {
    return (
        <>
            <h3 className={"text-[18px] font-semibold text-[#1E293B] mb-[20px]"}>Документы</h3>
            <div className='grid grid-cols-2 gap-[16px] bg-white rounded-2xl border-[1px_solid_#E2E8F0] p-[24px]'>
                <InputFile label='Сертификат'
                    placeholder="Загрузить файл"
                    value={(docsModel?.certificate?.name) || ""}
                    onChange={(e) => setDocsModel("certificate", e)}
                />

                <InputFile label='Заявка'
                    placeholder="Загрузить файл"
                    value={(docsModel?.offer?.name) || ""}
                    onChange={(e) => setDocsModel("offer", e)}
                />

                <InputFile label='Паспорт'
                    placeholder="Загрузить файл"
                    value={(docsModel?.passport?.name) || ""}
                    onChange={(e) => setDocsModel("passport", e)}
                />

                <InputFile label='Схема'
                    placeholder="Загрузить файл"
                    value={(docsModel?.scheme?.name) || ""}
                    onChange={(e) => setDocsModel("scheme", e)}
                />

            </div>
        </>
    );
})