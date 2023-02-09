import style from './style.module.scss';
import mockupData from '../../api/mockupData.json';
import { useState } from 'react';

export default function ExampleList2() {

    const listPeople = mockupData;

    const [query, setQuery] = useState("");

    return (
        <>
            <h1>Olá, eu sou o componente ExampleList</h1>
            <h2>Busque uma pessoa</h2>
            <input placeholder='Digite um nome' onChange={event => setQuery(event.target.value)} />

            <div className={style.list}>
                    {listPeople
                    .filter((item) =>{
                        if (query.toLowerCase() === '')
                            return item    // se busca vazia, retorna todos os resultados
                        else {
                            const fields_that_should_be_searched = `${item.first_name} ${item.gender}`; // junta os campos que devem ser pesquisados
                            return fields_that_should_be_searched.toLowerCase().includes(query);
                        }
                    })                
                    .map((item, index) => (
                        <div className={style.card} key={index}
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3>{item.first_name}</h3>
                            <span>{item.gender}</span>
                        </div>
                    ))}
            </div>

        </>
    );
}