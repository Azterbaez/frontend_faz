import {Table, Spinner} from 'react-bootstrap';

const TablaProductos= ({ Productos, cargado }) => {

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
                        <th>nombre_producto </th>
                        <th>descripcion_producto</th>
                        <th>primer_apellido</th>
                        <th>id_categoria</th>
                        <th>precio_unitario</th>
                        <th>stock</th>
                        <th>imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Productos.map((producto) => (
                        <tr key={producto.id_producto}>
                            <td>{producto.id_producto}</td>
                            <td>{producto.nombre_producto}</td>
                            <td>{producto.descripcion_producto}</td>                           
                            <td>{producto.id_categoria}</td>
                            <td>{producto.precio_unitario}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.imagen}</td>
                            <td>Acción</td>
                        </tr>
                    ))}


                </tbody>
            </Table >
        </>
    );
}
export default TablaProductos;