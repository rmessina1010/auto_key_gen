import ListContainer from "./components/list";
import { theData, theData2 } from "./components/sampleData";
import ObjectList from "./components/objList";

function App() {
  return (
    <div className="App">
      <ListContainer list={theData} render={ObjectList} />
    </div>
  );
}

export default App;
