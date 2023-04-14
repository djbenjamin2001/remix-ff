import { redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import NewNote, {links as newNoteLinks} from "~/components/NewNote"
import NoteList, {links as noteListLinks} from "../components/NoteList"
import { getStoredNotes, storedNotes } from "../data/notes"

export default function notePage() {
  const notes = useLoaderData()

    return (<main>
<NewNote/>
<NoteList notes={notes}/>
    </main>)
  }

  /*remix serverer den afsluttete side med det samme når dataen er blevet loadet, fx hvis jeg klikker på mine noter loader den direkte,
  men bag scenerne sørger remix for at alt dataen var loadet før den loadet selve siden, 
  en nemmere måde man kan se det på er ved at have network åben inde i undersøgelse taben.
  så remix tager sig af at alt dataen er loadet når der er brug for det, så vi ikke behøver at bekymre os om det.
  */

  export async function loader() {
    //bliver brugt til at henrette loader i backend så den aldrig nærmer sig frontend
   const notes = await getStoredNotes()
   //return notes
   return notes
  }



  //server side kode der bliver henrettet i backend
  //backend kode der håndter henrettelsen af newnote.jsx
 export async function action({request}) {
const formData = await request.formData()
const noteData = Object.fromEntries(formData)

if(noteData.title.trim().length < 5){
return {message: 'Invalid title - skal mindst være 5 karakter lang'}
}

const existingNotes = await getStoredNotes()
noteData.id = new Date().toISOString()
const updatedNotes = existingNotes.concat(noteData)
await storedNotes(updatedNotes)
//await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000))
return redirect('/notes')
 }
  export function links() {
    return[...newNoteLinks(), ...noteListLinks()];
  }