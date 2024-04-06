import {Notes} from "./components/Notes";
import { httpClient } from "./services/httpClient";

const getNotes = async () => {


  const response = await fetch(`http://localhost:8080/api/v1/notes`,{
    cache:"no-cache"
  });
  return response.json()
}

export default async function Home() {

  const notes = await getNotes();

  return (
    <main>
      <h1 className="text-center">App Notes</h1>
      <Notes serverData={notes}/>
    </main>
  );
}

