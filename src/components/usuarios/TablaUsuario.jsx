import { Table, Button, Spinner } from "react-bootstrap";

const TablaUsuarios = ({
  usuarios,
  cargando,
  onEditar,      // (usuario) => void
  onEliminar,    // (usuario) => void
}) => {
  if (cargando) {
    return (
      <div className="d-flex justify-content-center py-4">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!usuarios?.length) {
    return <p className="text-muted">No hay usuarios registrados.</p>;
  }

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <tr key={u.id_usuario}>
            <td>{u.id_usuario}</td>
            <td>{u.usuario}</td>
            <td className="text-nowrap">
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => onEditar(u)}
              >
                Editar
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onEliminar(u)}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaUsuarios;
