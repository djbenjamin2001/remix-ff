import { redirect } from "@remix-run/node"
import NewNote, {links as newNoteLinks} from "~/components/NewNote"
import { getStoredNotes, storedNotes } from "../data/notes"

export default function notePage() {
    return (<main>
<NewNote/>
    </main>)
  }
  //server side kode der bliver henrettet i backend
  //backend kode der håndter henrettelsen af newnote.jsx
 export async function action({request}) {
const formData = await request.formData()
const noteData = Object.fromEntries(formData)

const existingNotes = await getStoredNotes()
noteData.id = new Date().toISOString()
const updatedNotes = existingNotes.concat(noteData)
await storedNotes(updatedNotes)
return redirect('/notes')
 }
  export function links() {
    return[...newNoteLinks()];
  }