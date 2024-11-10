import Register from "./components/Register";
import Delete from "./components/Delete";
function App() {
  return (
    //  Using the semantic tag rather using div
    <main className="flex flex-col justify-center items-center min-h-[100vh] px-[1rem] py-[0.5rem]">
      <Register />
      {/* <Delete /> */}
    </main>
  );
}

export default App;
