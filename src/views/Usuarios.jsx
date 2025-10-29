import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TablaUsuario from "../components/usuarios/TablaUsuario";
import ModalRegistroUsario from "../components/usuarios/ModalRegistroUsuario";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [usuariosFiltradas, setUsuariosFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        usuario: '',
        contrasena: ''
    });

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtradas = usuarios.filter(
            (usuarios) =>
                usuarios.usuarios.toLowerCase().includes(texto) ||
                usuarios.contrasena.toLowerCase().includes(texto)
        );
        setUsuariosFiltradas(filtradas);
    };

      const obtenerUsuarios = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/usuarios");

            if (!respuesta.ok) {
                throw new Error("Error al obtener las usuarios");
            }
            const datos = await respuesta.json();

            setUsuarios(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    const agregarUsuario = async () => {
        if (!nuevoUsuario.usuario.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3000/api/registrarUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoUsuario)
            });

            if (!respuesta.ok) throw new Error('Error al guardar');

            // Limpiar y cerrar
            setNuevoUsuario({ usuario: '', contraseña: '' });
            setMostrarModal(false);
            await obtenerUsuarios(); // Refresca la lista
        } catch (error) {
            console.error("Error al agregar Usuario:", error);
            alert("No se pudo guardar el usuario. Revisa la consola.");
        }
    };




  

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <Row>
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                    <Col className="text-end">

                        <Button
                            variant="primary"
                            onClick={() => setMostrarModal(true)}
                        >
                            + Nueva Usuario
                        </Button>
                    </Col>

                </Row>
                <TablaUsuario
                    Usuarios={usuariosFiltradas}
                    cargando={cargando} />

                <ModalRegistroUsario
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevoUsuario={nuevoUsuario}
                    manejarCambioInput={manejarCambioInput}
                    agregarUsuario={agregarUsuario}
                />
            </Container>
        </>
    );
}

export default Usuarios;