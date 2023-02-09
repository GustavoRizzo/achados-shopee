import style from './style.module.scss';
import mockupData from '../../api/mockupData.json';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExampleList() {

    const listPeople = mockupData;

    const [query, setQuery] = useState("");

    return (
        <>
            <h1>Olá, eu sou o componente ExampleList</h1>
            <h2>Busque uma pessoa</h2>
            <input placeholder='Digite um nome' onChange={event => setQuery(event.target.value)} />

            <motion.div className={style.list}>
                <AnimatePresence>
                    {listPeople
                    .filter((item) =>{
                        if (query.toLowerCase() === '')
                            return item    // se busca vazia, retorna todos os resultados
                        else {
                            const fields_that_should_be_searched = `${item.first_name} ${item.gender}`; // junta os campos que devem ser pesquisados
                            const isMatch = new RegExp(query, 'ig').test(fields_that_should_be_searched);
                            return isMatch ? item : null ;
                        }
                    })                
                    .map((item, index) => (
                        <motion.div className={style.card} key={index}
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3>{item.first_name}</h3>
                            <span>{item.gender}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

        </>
    );
}