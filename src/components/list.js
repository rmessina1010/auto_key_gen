import { useState, useRef } from 'react';
import keyGen from '../helpers/keyGen.js';

function List({ render, items, remove }) {

    return (typeof render !== 'function') ? (
        <ul>
            {items.map((item, index) => <li key={item.k}><b>[{item.k}] {index}</b> {item.item} <button onClick={() => remove(index)}>x</button></li>)}
        </ul>
    ) : render(items, remove)
}

function ListContainer({ list }) {
    let [items, setItems] = useState(list.map((item, k) => ({ item, k })));
    let [keyCount] = useState(keyGen('', items.length));

    const newItem = useRef([]);
    const isItemObj = typeof items[0].item === 'object';
    const itemKeys = isItemObj ? Object.keys(items[0].item) : ['item'];
    const newItemEls = itemKeys.map((kname, i) => <label><input name={'new' + kname} ref={(el) => (newItem.current[i] = el)} /></label>);

    const remove = (index) => {
        let newState = [...items];
        newState.splice(index, 1);
        setItems(newState);
    }

    const add = (el) => {
        let isBlank = true;
        let item = itemKeys.reduce((acc, k, i) => {
            acc[k] = el[i].value;
            if (isBlank && acc[k].trim() !== '') { isBlank = false }
            return acc;
        }, {});
        if (isBlank) { return; }
        if (!isItemObj) { item = item.item; }
        let newItem = { item, k: keyCount.next().value }
        let newState = [...items, newItem];
        setItems(newState);
        el.forEach(ele => ele.value = '');
    }
    const sortDown = (ky) => {
        let newState = [...items];
        newState.sort((a, b) => a[ky] === b[ky] ? 0 : (a[ky] > b[ky] ? 1 : -1));
        setItems(newState);
    }
    const sortUp = (ky) => {
        let newState = [...items];
        newState.sort((a, b) => b[ky] === a[ky] ? 0 : (a[ky] > b[ky] ? -1 : 1));
        setItems(newState);
    }

    const kps = Object.keys(items[0]);

    return (
        <div>
            <List items={items} remove={remove} />
            <div>Add:{newItemEls}<button onClick={() => add(newItem.current)}>+</button></div>
            <div>
                {
                    kps.map((keyName) =>
                        <>
                            <button onClick={() => { sortUp(keyName); }}>Sort Up [{keyName}] </button>
                            <button onClick={() => { sortDown(keyName); }}>Sort Down [{keyName}]</button>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ListContainer;