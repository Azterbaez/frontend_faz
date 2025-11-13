import { useEffect, useState } from "react";
import TablaProductos from '../components/producto/TablaProductos';
import { Container, Col, Row, Button } from 'react-bootstrap';
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';
import ModalEdicionProducto from '../components/producto/ModalEdicionProducto';
import ModalEliminacionProducto from "../components/producto/ModalEliminacionProducto";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });
  const generarPDFProductos = () => {
  
    const doc = new jsPDF();

    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Listado de Productos", doc.internal.gageSize.getWidth() / 2, 18, { aling: "center" });
  

  const columnas = ["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"];
  const filas = productosFiltrados.map((producto) => [
    producto.id_producto,
    producto.nombre_producto,
    producto.descripcion_producto,
    producto.id_categoria,
    `C$ ${producto.precio_unitario}`,
    producto.stock,
  ]);

  const totalPaginas = "{total_pages_count_string}";
  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPaginas);
  }

  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 40,
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 2},
    margins: { top: 20, left: 14, right: 14 },
  columnStyles: {
    0: { cellWidth: 'auto' },
    1: { cellWidth: 'auto' },
    2: { cellWidth: 'auto' },
  },
  pageBreak: "auto",
  rowPageBreak: "auto",

  didDrawPage: function (data) {

        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagia = doc.internal.pageSize.getWidthe();

        const numeroPagina = doc.internal.getNumeroOfPages();

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const piePagina = 'Página ${numeroPagina} de ${totalPaginas}';
        doc.text(piePagina, anchoPagia / 2 + 15, alturaPagina - 10, { align: "center" });
      },
});

// Guardar el PDF con un nombre basado en la fecha actual
const fecha = new Date();
const dia = String(fecha.getDate()).padStart(2, '0');
const mes = String(fecha.getMonth() + 1).padStart(2, '0');
const anio = fecha.getFullYear();
const nombreArchivo = 'Productosos_${dia}${mes}${anio).pdf';

doc.save(nombreArchivo);

const generarPDFDetalleProducto = (producto) => {
const pdf = new jsPDF();
}
const anchoPagina = pdf.internal.pageSize.getWidth();
// Encabezado
pdf.setFillColor(28, 41, 51);
pdf.rect(0, 0, 220, 30, 'F');
pdf.setTextColor(255, 255, 255);
pdf.setFontSize(22);
pdf.text(producto.nombre_producto, anchoPagina / 2, 18, { align: "center" });

let posicionY = 50;
if (producto, imagen) {
const propiedadesImagen = pdf.getImageProperties(producto.imagen);
const anchoImagen = 100;
const altoImagen = (propiedadesImagen.height * anchoImagen) / propiedadesImagen.width;
const posicionX = (anchoPagina - anchoImagen) / 2;

pdf.addImage(producto.imagen, JPEG, posictonX, 46, anchoImagen, altoImagen);
posiciony  = 40 + altoImagen + 10;
}
pdf.setTextColor(8, 9, 8);
pdf.setFontSize(14);

pdf.text("Descripción: ${producto.descripcion_producto}", anchoPagina /2, posiciony, {align: "center" });
 pdf.text("Categoría: ${producto.id_categoria}", anchoPagina / 2, posiciony + 16, { align: "center" });
pdf.text("Precio: C$ ${ producto.precio_unitario}", anchoPagina / 2, posiciony + 20, { align: "center" });
pdf.text("Stock: ${ producto.stock }", anchoPagina / 2, posiciony + 30, {align: "center" });
pdf.save("${producto.nombre_producto}.pdf");
}

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [productoEditado, setProductoEditado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 13;

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarproducto/${productoEditado.id_producto}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditado)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar');
      setMostrarModalEdicion(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al editar producto:", error);
      alert("No se pudo actualizar el producto.");
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarproducto/${productoAEliminar.id_producto}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) throw new Error('Error al eliminar');
      setMostrarModalEliminar(false);
      setProductoAEliminar(null);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");
      if (!respuesta.ok) throw new Error("Error al obtener los productos");
      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto)
    );
    setProductosFiltrados(filtrados);
  };

  const agregarProducto = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproducto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });

      if (!respuesta.ok) throw new Error('Error al guardar');

      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
      });
      setMostrarModal(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("No se pudo guardar el producto.");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Productos</h4>
      <Row>
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setMostrarModal(true)}>
            + Nuevo Producto
          </Button>
        </Col>
       <Col lg = {3} md = {4} sm = {4} xs  = {5}>
      <Button
            className="mb-3"
            onClick={generarPDFProductos}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Generar reporte PDF
          </Button>
        </Col>
     <Col className="generar reporte">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => generarPDFDetalleProducto(producto)}
                >
                  <i className="bi bi-file-earmark-pdf"></i> PDF
                </Button>
              </Col>
      </Row>


      <TablaProductos
        productos={productosPaginados}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={productos.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
      />
      <ModalEdicionProducto
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        productoEditado={productoEditado}
        setProductoEditado={setProductoEditado}
        guardarEdicion={guardarEdicion}
      />
      <ModalEliminacionProducto
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        producto={productoAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};



export default Productos;
