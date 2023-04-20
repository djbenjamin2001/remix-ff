import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getStoredNotes } from '~/data/notes';
import styles from '~/styles/note-details.css';
/* 
her har vi dynamic routen til notes, hvor vi skal få en hel ny side frem hvor når vi trykker på selve noterne i mine noter,
vil vi flytte over til en ny side hvor vi kan se noterne i fuld skærm, det er hvor dynamic routes kommer ind,
dynamic routes er en segment der typisk tilhøre eller relater til en fil der allerede eksister, 
man ville også kalde det for en dynamisk segment hvis man kunde have løst til det,
og det gøre at når du prefikser din fil navn med $ vil det blive til en dynamisk segment/route, som så får remix til at matche enhvær
verdi i din url for det pågældende segment og sender det videre til din app.

dynamisk route er som sagt...dynamisk, det er en process hvor den tager dataen fra en anden route og sender det videre, 
og der er mange måder man kan lave dynamic routes på i remix ved hjælp a file naming convections,
der er mange måder man kan lave file naming convections på og den metode der endte med at blive brugt her var 
at bruge nested Urls without layout nesting, hvor vi bruger en trailing_ underscore.

trailing_ underscoren søger for at vi får en path segment men skaber ikke layout næsting, så når du klikker på en af
de noter du har lavet vil dine resultater ikke kom frem i din nuværende layout hvor du klikkede på det, den vil, ved hjelp af linket 
til {note.id} inde i NoteList.jsx vise dig dine resultater i en ny layout i fuld skærm for sig selv uden at påvirke mine noter siden.





*/ 
export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({params}) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find(note => note.id === noteId); 
  console.log(selectedNote)
  return json(selectedNote);
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta = ({data}) => {
  return [{
    title: data.title,
    description: ""
  }];
};