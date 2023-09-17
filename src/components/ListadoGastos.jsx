import Gasto from "./Gasto";

const ListadoGastos = ({gastos, setGastoEditar, EliminarGasto, filtro, gastosFiltrados}) => {
    
    return ( 
        <div className="listado-gastos contenedor">
            {
                filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay gastos en esta categoría'}</h2>
                        {
                            gastosFiltrados.map( gasto => (
                                <Gasto 
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                EliminarGasto={EliminarGasto}
                                />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No Hay gastos aun'}</h2>
                        {
                            gastos.map( gasto => (
                                <Gasto 
                                    key={gasto.id}
                                    gasto={gasto}
                                    setGastoEditar={setGastoEditar}
                                    EliminarGasto={EliminarGasto}
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
     );
}
 
export default ListadoGastos;