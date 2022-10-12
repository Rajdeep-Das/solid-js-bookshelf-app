import { Setter, JSX, createSignal, createResource, Show, For } from "solid-js";
import { Book } from "./App";
import { searchBooks } from "./searchBooks";

export interface AddBookProps {
  setBooks: Setter<Book[]>;
}

const emptyBook: Book = { title: "", author: "" };

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");

  const [data] = createResource<Book[], string>(query, searchBooks);

  return (
    <>
      <form>
        <div>
          <label for="title">Search books</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}
            class="bg-gray-50 border
             border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
          class="bg-purple-500 hover:bg-purple-700 text-white  py-2 px-4  mt-4 rounded"
        >
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                {book.title} by {book.author}{" "}
                <button
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book]);
                  }}
                  class="bg-purple-500 hover:bg-purple-700 text-white  py-2 px-4 rounded"
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
