import { useParams } from "react-router-dom";
import { RequestForm } from "../../features/CreateRequestPage/request-form/request-form";

export const RequestFormPage = () => {
    const { requestId } = useParams()

    return <RequestForm requestId={requestId} />;
}