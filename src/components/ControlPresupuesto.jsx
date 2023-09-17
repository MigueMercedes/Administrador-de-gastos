import { useEffect, useState } from 'react'
import { formatearCantidad } from '../helpers/index';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;        
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 1000);
        setDisponible(totalDisponible);
        setGastado(totalGastado);
    }, [gastos]);

    const handleResetearApp = (e) => {
        const resultado = confirm('¿Estas seguro de reiniciar todo?');
        if(resultado) {
            setPresupuesto(0);
            setGastos([]);
            setIsValidPresupuesto(false);
        }   
    }

    return ( 
        <>
            <div className="contenedor-presupuesto contenedor sombra dos-columnas">
                <div>
                    <CircularProgressbar 
                        styles={buildStyles({
                            pathColor: porcentaje >= 100 ? '#DC2626' : '#3B82F6',
                            trailColor: '#F5F5F5',
                            textColor: porcentaje >= 100 ? '#DC2626' : '#3B82F6',
                         })}
                        text={`${porcentaje}% Gastado`}
                        value={porcentaje}
                    />
                </div>

                <div className="contenido-presupuesto">

                    <button 
                        className='reset-app'
                        type='button' 
                        onClick={handleResetearApp}
                    >
                        Resetear App
                    </button>

                    <p>
                        <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                    </p>
                    
                    <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                        <span>Disponible: </span> {formatearCantidad(disponible)}
                    </p>

                    <p>
                        <span>Gastado: </span> {formatearCantidad(gastado)}
                    </p>
                </div>

            </div>
        </>
     );
}
 
export default ControlPresupuesto;