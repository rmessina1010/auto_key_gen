import ListContainer from "./components/list";

let theData = [
  { name: 'ray', xtra: 's' },
  { name: 'roni', xtra: 's' },
  { name: 'bushy', xtra: 'kb' },
  { name: 'havoc', xtra: 'kb' },
  { name: 'dormamu', xtra: 'o' }
];
let theData2 = ['ray', 'roni', 'bushy', 'havoc', 'dormamu'];

function ObjectList(items, remove) {
  let keys = Object.keys(items[0].item);
  const keyLoop = (ky, item, i) => <span key={i}> <i>{ky}</i>: {item[ky]}</span>
  return (<ul>
    {items.map((item, index) =>
      <li key={item.k}>
        <b>[{item.k}] {index}</b>
        {keys.map((key, indx) => keyLoop(key, item.item, indx))}
        <button onClick={() => remove(index)}>x</button>
      </li>)
    }
  </ul>);
}


function App() {
  return (
    <div className="App">
      <ListContainer list={theData2} render={null} />
    </div>
  );
}

export default App;
