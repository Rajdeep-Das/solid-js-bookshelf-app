import type { Component } from 'solid-js';
import { createSignal,Show} from "solid-js";
import { BookList } from "./BookList";
import { AddBook } from "./AddBook";



export type Book = {
  title: string;
  author: string;
};
const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Software Engineering", author: "Roger S. Pressman, Bruce Maxim"}
];


interface BookshelfProps {
  name: string;
}

function Bookshelf(props:BookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  return (
    <div>
      <h1 class="text-3xl font-bold text-center">{props.name}'s Bookshelf</h1>
      
      <BookList books={books()}/>
      <Show
        when={showForm()}
        fallback={<button type="button" class="bg-purple-500 hover:bg-purple-700 text-white  py-2 px-4 rounded" onClick={toggleForm}>Add a book</button>}
      >
        <AddBook setBooks={setBooks} />
        <button class="bg-purple-500 hover:bg-purple-700 text-white  py-2 px-4 rounded mt-4" onClick={toggleForm}>Finished adding books</button>
      </Show>
    </div>
  );
}

const App: Component = () => {

  return (
    <div class="flex justify-center mt-5">
      <Bookshelf name="Rajdeep"/>
    </div>
  );
};

export default App;
