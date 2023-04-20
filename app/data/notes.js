import fs from 'fs/promises'
//for at læse fra et fil
export async function getStoredNotes(){
    const rawFileContent =await fs.readFile('notes.json', {encoding:"utf-8"})
    const data = JSON.parse(rawFileContent)
    const storedNotes = data.notes ?? [];
    return storedNotes
}

//for at lagre et fil
export function storedNotes(notes){
    return fs.writeFile('notes.json', JSON.stringify({notes:notes || []}))
}