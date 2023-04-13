import styles from "./NewNote.css"

function NewNote()  {
    return ( 
        <form method="post" id="note-form">
<p>
    <label htmlFor="title">Title</label>
    <input type="text" id="title" name="title" required />
</p>
<p>
    <label htmlFor="Content">Content</label>
    <textarea name="Content" id="Content"  rows="5"></textarea>
</p>
<div className="form-actions">
    <button>add note</button>
</div>
        </form>
     );
}
 
export default NewNote;

export const links = () => [
    { rel: "stylesheet", href: styles },
  ];