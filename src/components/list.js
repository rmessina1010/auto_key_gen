import { useState, useRef } from 'react';
import keyGen from '../helpers/keyGen.js';

function List({ items, remove }) {

    return (
        <ul>
            {items.map((item, index) => <li key={item.k}><b>[{item.k}] {index}</b> {item.item} <button onClick={() => remove(index)}>x</button></li>)}
        </ul>
    )
}

function ListContainer({ list }) {
    let [items, setItems] = useState(list.map((item, k) => ({ item, k })));
    let [keyCount] = useState(keyGen('', items.length));

    const newItem = useRef(null);

    const remove = (index) => {
        let newState = [...items];
        newState.splice(index, 1);
        setItems(newState);
    }

    const add = (el) => {
        let item = el.value;
        if (item.trim() === '') { return; }
        let newItem = { item, k: keyCount.next().value }
        let newState = [...items, newItem];
        setItems(newState);
        el.value = '';
    }
    const sortDown = (ky) => {
        let newState = [...items];
        newState.sort((a, b) => a[ky] < b[ky]);
        setItems(newState);
    }
    const sortUp = (ky) => {
        let newState = [...items];
        newState.sort((a, b) => a[ky] > b[ky]);
        setItems(newState);
    }

    return (
        <div>
            <List items={items} remove={remove} />
            <div>Add:<input name='newitem' ref={newItem} /><button onClick={() => add(newItem.current)}>+</button></div>
            <div>
                <button onClick={() => { sortUp('item'); }}>Sort Up </button>
                <button onClick={() => { sortDown('item'); }}>Sort Down</button>
                <button onClick={() => { sortUp('k'); }}>Sort Up [id]</button>
                <button onClick={() => { sortDown('k'); }}>Sort Down[id]</button>
            </div>
        </div>
    );
}

export default ListContainer;
