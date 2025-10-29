import React, { useState } from 'react';
import {Table, Spinner} from 'react-bootstrap';
import BotonOrden from '../ordenamiento/botonOrden';

const TablaClientes = ({ clientes, cargado }) => {
     const [orden, setOrden] = useState({ campo: "id_cliente", direccion: "asc" });
        const manejarOrden = (campo) => {
            setOrden((prev) => ({
                campo,
                direccion:
                    prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
            }));
        };
    
        const clientesOrdenadas = [...clientes].sort((a, b) => {
            const valorA = a[orden.campo];
            const valorB = b[orden.campo];
    
            if (typeof valorA === "number" && typeof valorB === "number") {
                return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
            }
    
            const comparacion = String(valorA).localeCompare(String(valorB));
            return orden.direccion === "asc" ? comparacion : -comparacion;
        });
    

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
                        <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
                            ID
                        </BotonOrden>

                        <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
                            primer_nombre 1 
                        </BotonOrden>

                        <BotonOrden campo="segundo_nombre" orden={orden} manejarOrden={manejarOrden}>
                            segundo_nombre 
                        </BotonOrden>
                        <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
                            primer_apellido 
                        </BotonOrden>
                        <BotonOrden campo="segundo_apellido" orden={orden} manejarOrden={manejarOrden}>
                            segundo_apellido 
                        </BotonOrden>
                        <BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
                            celular 
                        </BotonOrden>
                         <BotonOrden campo="direccion" orden={orden} manejarOrden={manejarOrden}>
                            direccion 
                        </BotonOrden>
                        <BotonOrden campo="cedula" orden={orden} manejarOrden={manejarOrden}>
                            cedula 
                        </BotonOrden>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesOrdenadas.map((cliente) => (
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.primer_nombre}</td>
                            <td>{cliente.segundo_nombre}</td>
                            <td>{cliente.primer_apellido}</td>
                            <td>{cliente.segundo_apellido}</td>
                            <td>{cliente.celular}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.cedula}</td>
                            <td>Acción</td>
                        </tr>
                    ))}


                </tbody>
            </Table >
        </>
    );
}
export default TablaClientes;