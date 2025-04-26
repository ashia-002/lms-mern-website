import  {Button}  from "@/components/ui/button"
import FormControls from "./formControls"
// function CommonForm({ handleSubmit, buttonText, formControls = [], formData, setFormData, isButtonDisabled = false }){
//     function handleSubmit(event) {
//         event.preventDefault();
//         console.log("Form submitted", formData);
//     }
//     return(
//         <form onSubmit={handleSubmit}>
//             {/*render form controls here*/}
//             <FormControls formControls={formControls} formData={formData} setFormData={setFormData}/>
//             <Button disabled={isButtonDisabled} type='submit' className="mt-5 w-full">{buttonText || 'Submit'}</Button>
//         </form>
//     )
// }

function CommonForm({ handleSubmit, buttonText, formControls = [], formData, setFormData, isButtonDisabled = false }) {
    return (
        <form onSubmit={handleSubmit}>
            {/* Render form controls here */}
            <FormControls formControls={formControls} formData={formData} setFormData={setFormData} />
            <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full">{buttonText || 'Submit'}</Button>
        </form>
    );
}


export default CommonForm