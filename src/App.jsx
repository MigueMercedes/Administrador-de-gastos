import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import Filtros from './components/Filtros';
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import { generarId }  from './helpers/index.js'


function App() {
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto]);

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
        if(presupuestoLS > 0) {
            setIsValidPresupuesto(true)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos]);

    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0 ) {
            setModal(true);

		    setTimeout(() => {
    			setAnimarModal(true);
            }, 500);
        }
    }, [gastoEditar]);

    useEffect(() => {
        if(filtro){
            // Filtrar gastos por categoría
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
    }, [filtro]);

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
            setGastoEditar({})
        } else {
            // Nuevo Gasto
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);    
        }

        setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const EliminarGasto = (id) => {
        const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
        setGastos(gastosActualizados);
    }

    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                setGastos={setGastos}
                gastos={gastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros 
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />
                        <ListadoGastos 
                            setGastoEditar={setGastoEditar}
                            gastos={gastos}
                            EliminarGasto={EliminarGasto}
                            gastosFiltrados={gastosFiltrados}
                            filtro={filtro}
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
                    setGastoEditar={setGastoEditar}
				/>
			)}
        </div>
    );
}

export default App;
