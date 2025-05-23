
import ReportComponent from "../_components/ReportComponent";


export default async function page({ params }) {

    const param = await params
    const id = param?.id;

    return(
        <>
            <div className="px-26 pt-8">
                <h3 className="text-xl font-semibold text-gray-800">Report Card</h3>
            </div>
            <ReportComponent id={id} />
        </>
    )    
}