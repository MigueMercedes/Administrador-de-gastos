import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({ presupuesto, setPresupuesto, isValidadPresupuesto, setIsValidadPresupuesto, gastos }) => {
    return ( 
        <>
            <header>
                <h1>Planificador de Gastos</h1>

                { isValidadPresupuesto ? (
                    <ControlPresupuesto 
                        gastos={gastos}
                        presupuesto={presupuesto}
                    />
                ): (
                    <NuevoPresupuesto 
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setIsValidadPresupuesto={setIsValidadPresupuesto}
                    />
                )}
            </header>
        </>
     );
}
 
export default Header;