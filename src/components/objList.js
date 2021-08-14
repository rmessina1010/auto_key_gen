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

export default ObjectList;