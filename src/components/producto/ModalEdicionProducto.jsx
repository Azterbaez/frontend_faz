import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrar,
  setMostrar,
  productoEditado,
  setProductoEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreProducto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre_producto"
              value={productoEditado?.nombre_producto}
              onChange={manejarCambio}
              placeholder="Ej: Taladro eléctrico"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion_producto"
              value={productoEditado?.descripcion_producto}
              onChange={manejarCambio}
              placeholder="Descripción del producto (máx. 100 caracteres)"
              maxLength={100}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="idCategoria">
            <Form.Label>ID Categoría</Form.Label>
            <Form.Control
              type="number"
              name="id_categoria"
              value={productoEditado?.id_categoria}
              onChange={manejarCambio}
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
              value={productoEditado?.precio_unitario}
              onChange={manejarCambio}
              placeholder="Ej: 49.99"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={productoEditado?.stock}
              onChange={manejarCambio}
              placeholder="Ej: 100"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={productoEditado?.imagen}
              onChange={manejarCambio}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={!productoEditado?.nombre_producto.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
