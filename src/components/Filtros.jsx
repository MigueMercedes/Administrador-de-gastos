
const Filtros = ({filtro, setFiltro}) => {
    return ( 
        <div className="filtros sombra contenedor">
            <form>
                <div className="campo">

                    <label htmlFor="filtro">Filtrar Gastos</label>

                    <select 
                        id="filtro"
                        value={filtro}
                        onChange={ (e) => setFiltro(e.target.value)}
                    >
                        <option value="">-- Selecciona una Categoría --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="lujos">Lujos</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                </div>
            </form>
        </div>
     );
}
 
export default Filtros;