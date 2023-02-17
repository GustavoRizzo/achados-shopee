import style from './style.module.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import csvjson from '../../api/csvjson.json';
import { IProduto } from '../../types/IProduct';
import icon_discount from '../../assets/icon_discount3.png';


export default function ExampleList3CSV() {

    const listPodutos = csvjson;

    const [query, setQuery] = useState("");

    const formatingTitleProduct = ((product:IProduto) =>{
        return `#${product.id} ${product.Produto}`;
    });

    const tryRequestImgWidth150px = ((url_img:string) => {
        var searchStr = '.jpg';
        var index = url_img.indexOf(searchStr);
        if (index != -1) {
            var add_text = '_150x150';
            var new_url = url_img.slice(0,index) + add_text + url_img.slice(index);
            return new_url;
        } else {
            return url_img;
        }
    });

    return (
        <section className={style.section}>
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
                                
                                <img  
                                    src={tryRequestImgWidth150px(item.link_img)}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src=icon_discount;
                                    }}
                                    alt='image product' 
                                    loading="lazy"
                                />
                                <h2 className={style.title}>{formatingTitleProduct(item)}</h2>
                                <div className={style.card__bottom}>
                                    <div className={style.text_price}>
                                        <div className={style.text_price__preprice}>Menor preço</div>
                                        <div className={style.text_price__price}>R$ {item.Preco_Base}</div>
                                    </div>                                
                                    <a className={`${style.link} ${style.color_shoppe}`} href={item.Link_Afiliado_1}>Shopee 1</a>
                                    <a className={`${style.link} ${style.color_shoppe}`} href={item.Link_Afiliado_2}>Shopee 2</a>
                                </div>
                                
                            </motion.div>
                        ))}
                </AnimatePresence>
            </motion.div>

        </section>
    );
}