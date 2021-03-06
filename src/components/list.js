import { useState, useRef } from 'react';
import keyGen from '../helpers/keyGen.js';

function List({ render, items, remove }) {
    return (typeof render !== 'function') ? (
        <ul>
            {items.map((item, index) => <li key={item.k}><b>[{item.k}] {index}</b> {item.item} <button onClick={() => remove(index)}>x</button></li>)}
        </ul>
    ) : render(items, remove)
}



function ListContainer({ list, render }) {
    let [items, setItems] = useState(list.map((item, k) => ({ item, k })));
    let [keyCount] = useState(keyGen(items.length));

    const newItem = useRef([]);
    const isItemObj = typeof items[0].item === 'object';
    const itemKeys = isItemObj ? Object.keys(items[0].item) : ['item'];
    const newItemEls = itemKeys.map((kname, i) => <label key={i}>{kname}:<input name={'new' + kname} ref={(el) => (newItem.current[i] = el)} /> </label>);
    const sortItemEls = itemKeys.map((kname, i) =>
        <>
            <button key={2 * i} onClick={() => { sortUp(kname); }}>Sort Up [{kname}] </button>
            <button key={2 * i + 1} onClick={() => { sortDown(kname); }}>Sort Down [{kname}]</button>
        </>
    );

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
        newState.sort((a, b) => {
            if (isItemObj && ky !== 'k') {
                a = a.item;
                b = b.item;
            }
            return a[ky] === b[ky] ? 0 : (a[ky] > b[ky] ? -1 : 1)
        });
        setItems(newState);
    }
    const sortUp = (ky) => {
        let newState = [...items];
        newState.sort((a, b) => {
            if (isItemObj && ky !== 'k') {
                a = a.item;
                b = b.item;
            }
            return a[ky] === b[ky] ? 0 : (a[ky] > b[ky] ? 1 : -1)
        });
        setItems(newState);
    }

    return (
        <div>
            <List items={items} remove={remove} render={render} />
            <div><b>Add </b>{newItemEls}<button onClick={() => add(newItem.current)}>+</button></div>
            <div>
                <button onClick={() => { sortUp('k'); }}>Sort Up [key] </button>
                <button onClick={() => { sortDown('k'); }}>Sort Down [key]</button>
                {sortItemEls}
            </div>
        </div>
    );
}

export default ListContainer;