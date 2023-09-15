import { useState, useEffect } from 'react';
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidadPresupuesto}) => {
    const [mensaje, setMensaje] = useState();    
    
    const handlePresupuesto = (e) => {
        e.preventDefault()

        if(!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto valido');
            return;
        } 
        
        setMensaje('');
        setIsValidadPresupuesto(true);
        
    }

    return ( 
        <div className="contenedor-presupuesto contenedor sombra">
            
            <form 
                className="formulario"
                onSubmit={handlePresupuesto}
            >
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    
                    <input 
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Agregar Presupuesto"
                        value={presupuesto}
                        onChange={ (e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Agregar" 
                />

                {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}
            </form>
        </div>
     );
}
 
export default NuevoPresupuesto;