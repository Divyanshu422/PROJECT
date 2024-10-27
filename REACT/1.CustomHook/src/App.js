import Random from "./components/Random";
import Tag from "./components/Tag";
function App() {
  return (
    <div className="flex flex-col items-center background overflow-auto py-8">
      <h1 className="w-10/12 bg-white text-2xl uppercase font-bold text-center py-2 rounded-lg">
        Random GIFs
      </h1>
      <Random />
      <Tag />
    </div>
  );
}

export default App;
