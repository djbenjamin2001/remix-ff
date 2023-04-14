import { Form, useNavigation } from "@remix-run/react";
import styles from "./NewNote.css"

function NewNote()  {
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'
    return ( 
        <Form method="post" id="note-form">
<p>
    <label htmlFor="title">Title</label>
    <input type="text" id="title" name="title" required />
</p>
<p>
    <label htmlFor="content">Content</label>
    <textarea name="content" id="content"  rows="5"></textarea>
</p>
<div className="form-actions">
    <button disabled={isSubmitting}>{isSubmitting ? 'adding...' : 'add note'}</button>
</div>
        </Form>
        /*remix Form componentet virker ligesom en normal component, 
        men med dette Form bliver vi stående i en sides application verdnen
        og remix stopper siden med at blive reloadet og sender stadigvæk en request til backenden,
        men istedet for at det sender en ny request der ville fetche en ny side, bruger det client side routing istedet, 
        så den kun fetcher det opdateret data istedet for en ny side
        */
     );
}
 
export default NewNote;

export const links = () => [
    { rel: "stylesheet", href: styles },
  ];