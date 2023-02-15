import style from './style.module.scss';
import bunner_500 from '../../assets/bunner_inicial500_webp.webp';
import bunner_250 from '../../assets/bunner_inicial250_webp.webp';

export default function ExampleList3CSV() {
    return (
        <section className={style.bunner}>
            <img
                src={bunner_500} 
                srcSet= { `${bunner_250} 950w, ${bunner_500} 1280w` }                
                alt='initial bunner' 
            />
        </section>
    );
}