export const PumpView = () => {
    return (
        <PupmParametersView
            model={model}
            configTypes={configTypes}
            fileUrl={fileUrlPump}
            submersibleTypesId={submersibleTypesId}
        />
    );
}