import style from './style.module.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import csvjson from '../../api/csvjson.json';
import { IProduto } from '../../types/IProduct';


export default function ExampleList3CSV() {

    const listPodutos = csvjson;

    const [query, setQuery] = useState("");

    const formatingTitleProduct = ((product:IProduto) =>{
        return `${product.id} ${product.Produto}`;
    });

    return (
        <>
            <div className={style.header}>
                <h1>Todos os Produtos</h1>
                <input placeholder='Busque Pelo Produto' onChange={event => setQuery(event.target.value)} />
            </div>

            <motion.div className={style.grid_cards}>
                <AnimatePresence>
                    {listPodutos
                        .filter((item) => {
                            if (query.toLowerCase() === '')
                                return item    // se busca vazia, retorna todos os resultados
                            else {
                                const fields_that_should_be_searched = `${item.id} ${item.Produto}`; // junta os campos que devem ser pesquisados
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
                                <img  src={item.link_img} alt='image product'></img>
                                <h2 className={style.title}>{formatingTitleProduct(item)}</h2>
                                <div className={style.card__bottom}>
                                    <div className={style.price}>R$ {item.Preco_Base}</div>
                                    <a className={style.link} href={item.Link_Afiliado_1}>link</a>
                                    <a className={style.link} href={item.Link_Afiliado_2}>link</a>
                                </div>
                                
                            </motion.div>
                        ))}
                </AnimatePresence>
            </motion.div>

        </>
    );
}