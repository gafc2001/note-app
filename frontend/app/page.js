import {Notes} from "./components/Notes";

const getNotes = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/notes`,{
    cache:"no-cache"
  });
  return response.json();
}

const getTags = async() => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/tags`,{
    cache:"no-cache"
  });

  return response.json();
}

export default async function Home() {

  const notes = await getNotes();
  const tags = await getTags();
  return (
    <main>
      <h1 className="text-center">App Notes</h1>
        <Notes 
          serverData={{
            notes,
            tags
          }}
        />
    </main>
  );
}

