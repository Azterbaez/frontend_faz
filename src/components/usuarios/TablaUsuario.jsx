import {Table, Spinner} from 'react-bootstrap';

const TablaUsuario = ({ Usuarios, cargado }) => {

    if (cargado)
        return (
            <>

                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </>

        );
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>usuario </th>
                        <th>contraseña</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Usuarios.map((usuario) => (
                        <tr key={usuario.id_Usuario}>
                            <td>{usuario.id_Usuario}</td>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.contraseña}</td>

                            <td>Acción</td>
                        </tr>
                    ))}


                </tbody>
            </Table >
        </>
    );
}
export default TablaUsuario;