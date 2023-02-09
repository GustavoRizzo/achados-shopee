import style from './style.module.scss';
import mockupData from '../../api/mockupData.json';
import { useState } from 'react';

export default function ExampleList() {

    const listPeople = mockupData;
    const [query, setQuery] = useState("");
    console.log(query);

    return (
        <>
            <h1>Olá, eu sou o componente ExampleList</h1>
            <h2>Busque uma pessoa</h2>
            <input placeholder='Digite um nome' onChange={event => setQuery(event.target.value)} />

            <ul className={style.list}>
                {listPeople
                .filter((item) =>{
                    return query.toLowerCase() === ''
                        ? item    // se busca vazia, retorna todos os resultados
                        : item.first_name.toLowerCase().includes(query);
                })                
                .map((item, index) => (
                    <li className={style.card} key={index}>
                        <h3>{item.first_name}</h3>
                        <span>{item.gender}</span>
                    </li>
                ))}
            </ul>

        </>
    );
}