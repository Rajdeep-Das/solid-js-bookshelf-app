type ResultItem = {
    title: string;
    author_name: string[]
}

export async function searchBooks(query : string) {
    if(query.trim() === "") return [];

    const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURI(query)}`
    );
    const results = await res.json();
    const documents = results.docs as ResultItem[];
    console.log(documents);

    return documents.slice(0, 10).map(({title, author_name}) => ({
        title,
        author : author_name?.join(", "),
    }));
}