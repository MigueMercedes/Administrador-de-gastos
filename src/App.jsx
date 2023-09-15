import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { generarId }  from './helpers/index.js'

function App() {
    const [gastos, setGastos] = useState([]);

    const [presupuesto, setPresupuesto] = useState(0);
    const [isValidadPresupuesto, setIsValidadPresupuesto] = useState(false);
    
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    
    const [gastoEditar, setGastoEditar] = useState({});

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0 ) {
            setModal(true);

		    setTimeout(() => {
    			setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);

    const handleNuevoGasto = () => {
        setModal(true);
        setGastoEditar({});

		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
    };

    const guardarGasto = (gasto) => {
        if(gasto.id){
            // Actualizar
            const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState);
            setGastos(gastosActualizados);
        } else {
            // Nuevo Gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);    
        }
        console.log(gasto)
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const EliminarGasto = (id) => {
        console.log(id)
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidadPresupuesto={isValidadPresupuesto}
                setIsValidadPresupuesto={setIsValidadPresupuesto}
            />

            {isValidadPresupuesto && (
                <>
                    <main>
                        <ListadoGastos 
                            setGastoEditar={setGastoEditar}
                            gastos={gastos}
                            EliminarGasto={EliminarGasto}
                        />
                    </main>

                    <div className="nuevo-gasto">
                        <img
                            src={IconoNuevoGasto}
                            alt="IconoNuevoGasto"
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}

            {modal && (
				<Modal 
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
				/>
			)}
        </div>
    );
}

export default App;
