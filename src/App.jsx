import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Importar componente Encabezado.
import Encabezado from "./components/navegacion/Encabezado";

//Importar las vistas.
import Login from "./views/login";
import Inicio from "./views/Inicio";
import Usuarios from "./views/Usuarios";
import Cliente from "./views/Clientes";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import Empleados from "./views/Empleados";
import Categorias from "./views/Categorias";
import Productos from "./views/Productos";
import Catalogo from "./views/Catalogo";

//Importar archivo de estilos.
import "./App.css";

const App = () =>{
  return (
    <Router>
      <Encabezado />a
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Usuarios" element={<Usuarios />} />
          <Route path="/Clientes" element={<Cliente />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/Categorias" element={<Categorias />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;