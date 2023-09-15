import { useState, useEffect } from 'react';
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';


const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar}) => {

    const [id, setId] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [gasto, setGasto] = useState({
        nombre: '',
        cantidad: 0,
        categoria: '',
    });
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setGasto(gastoEditar)
            setId(gastoEditar.id)
        }
    }, []);

    const handleOcultarModalClick = () => {
        
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const alMenosUnaEstaVacia = Object.values(gasto).some(propiedad => !propiedad);
        
        if(alMenosUnaEstaVacia) {
            setMensaje('Todos los campos son obligatorios');

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }
        
        guardarGasto(gasto, id, fecha);
    }


    return ( 
        <>
            <div className="modal">
                <div className="cerrar-modal">
                    <img 
                        src={CerrarBtn} 
                        alt="Cerrar" 
                        onClick={handleOcultarModalClick}
                    />
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className={`formulario ${animarModal ? "animar" : "cerrar"}`}
                >
                    <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                    {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                    <div className="campo">
                        <label 
                            htmlFor="nombre"
                        >   Nombre Gasto
                        </label>

                        <input 
                            id='nombre'
                            type='text'
                            placeholder='Escribe el Nombre del Gasto' 
                            value={gasto.nombre}
                            onChange={ e => setGasto({...gasto, nombre: e.target.value})}
                        />
                    </div>

                    <div className="campo">
                        <label 
                            htmlFor="cantidad"
                        >   Cantidad
                        </label>

                        <input 
                            id='cantidad'
                            type='number'
                            placeholder='Escribe la Cantidad del Gasto'
                            value={gasto.cantidad}
                            onChange={ e => setGasto({...gasto, cantidad: Number(e.target.value)})}
                        />
                    </div>

                    <div className="campo">
                        <label 
                            htmlFor="categoria"
                        >   Categoría
                        </label>

                        <select 
                            id="categoria"
                            value={gasto.categoria}
                            onChange={ e => setGasto({...gasto, categoria: e.target.value})}
                        >
                            <option value="">-- Seleccione --</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos">Gastos</option>
                            <option value="lujos">Lujos</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>
                        </select>

                        <input 
                            type="submit" 
                            value={gastoEditar.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}
                        />
                    </div>
                </form>
            </div>
        </>
     );
}
 
export default Modal;