export const SchemeDocsView = ({ url }: { url: string }) => {

    return (
        <div className="sticky top-[50px] w-full h-[90vh] bg-white rounded-xl p-4 border-[1px_solid_#e2e8f0] overflow-x-auto">
            <iframe
                src={`${url}#toolbar=0&navpanes=0`}
                className="w-full h-full rounded-lg"
                style={{ border: 'none' }}
            />
        </div >
    );
}