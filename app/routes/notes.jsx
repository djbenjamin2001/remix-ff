import { redirect } from "@remix-run/node"
import { useLoaderData,  isRouteErrorResponse,
  useRouteError, 
  useCatch} from "@remix-run/react"
import NewNote, {links as newNoteLinks} from "~/components/NewNote"
import NoteList, {links as noteListLinks} from "../components/NoteList"
import { getStoredNotes, storedNotes } from "../data/notes"
import { Link } from "@remix-run/react"
import { json } from "@remix-run/node"
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


   //bliver brugt til at henrette loader i backend så den aldrig nærmer sig frontend
  export async function loader() {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
      throw json(
        { message: 'Could not find any notes.' },
        {
          status: 404,
          statusText: 'Not Found',
        }
      );
    }
    return notes;
  }



  //server side kode der bliver henrettet i backend
  //backend kode der håndter henrettelsen af newnote.jsx
 export async function action({request}) {
const formData = await request.formData()
const noteData = Object.fromEntries(formData)

if (noteData.title.trim().length < 5) {
  return { message: 'Invalid title - must be at least 5 characters long.' };
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
 
  export function ErrorBoundary() {
    let error = useRouteError();
    if (isRouteErrorResponse(error)) {
      return (
        <main>
          <NewNote/>
          <p className="info-message">{error.data.message}</p>
        </main>
      );
    } else if (error instanceof Error) {
      return (
        <div className="error">
          <h1>F error occurred!</h1>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
          <p>{error.message}</p>
        
        </div>
      );
    } else {
      return <h1>Unknown Error</h1>;
    }
  }

export const meta = () => {
  return [{
    title: "Alle noter",
    description: "håndter dine noter næmmere"
  }];
};