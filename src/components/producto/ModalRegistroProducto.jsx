import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  agregarProducto,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreProducto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={nuevoProducto.nombre_producto}
              onChange={manejarCambioInput}
              placeholder="Ej: Taladro eléctrico"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={nuevoProducto.descripcion_producto}
              onChange={manejarCambioInput}
              placeholder="Descripción del producto (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="idCategoria">
            <Form.Label>Categoría (ID)</Form.Label>
            <Form.Control
              type="number"
              name="id_categoria"
              value={nuevoProducto.id_categoria}
              onChange={manejarCambioInput}
              placeholder="Ej: 1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="precioUnitario">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio_unitario"
              value={nuevoProducto.precio_unitario}
              onChange={manejarCambioInput}
              placeholder="Ej: 49.99"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={nuevoProducto.stock}
              onChange={manejarCambioInput}
              placeholder="Ej: 100"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={nuevoProducto.imagen}
              onChange={manejarCambioInput}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarProducto}
          disabled={!nuevoProducto.nombre_producto.trim()}
        >
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;
