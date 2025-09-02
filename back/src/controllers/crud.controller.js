const db = require ('../config/conexion_DB');


class crudController {

    // put eliminar datos de la base de datos
    async actualizar(tabla, idCampo, id, data){
    try {
        const [resultado] = await db.query(
            `UPDATE ?? SET ? WHERE ?? = ?`,
            [tabla, data, idCampo, id]
        );

        if (resultado.affectedRows === 0) {
            throw new Error('Registro no encontrado');
        }

        return await this.obtenerUno(tabla, idCampo, id);

    } catch (error) {
        throw error;
    }
}






    //obtener los registros de una tabla
    async obtenerTodos(tabla){
        const [resultados] = await db.query(`SELECT * FROM ${tabla}`);
        return resultados;      
    }
//obtener un registro po ID

async obtenerUsuarios() {
        try {
            const [rows] = await db.query('SELECT * FROM Usuario');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // resto de métodos igual, usando db.query()



    // ... otros métodos existentes

async obtenerUno(tabla, idCampo, id){
    try {
        const [resultado] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`,[tabla, idCampo, id]);
        return resultado[0];
    }catch(error) {
        throw error;
    }
}

//crea un nuevo registro
async crear(tabla, data){
    try{
    const [resultado] = await db.query(`INSERT INTO ?? SET ?`,[tabla, data]);
        return { ...data, id: resultado.insertId };
    }catch(error) {
        throw error;
    }
}

//actualizar un registro por id
async actualizar(tabla, idCampo, id, data){
    try{
         const [resultado] = await db.query(`UPDATE ?? SET ? WHERE ?? = ?`,[tabla, data, idCampo, id]);// Las sentencias de MYSQL no puedden fallar 
         if (resultado.affectedRows === 0) {
            throw new Error('Registro no encontrado');
         }
        return await this.obtenerUno(tabla, idCampo, id);
        }catch(error) {
            throw error;
        }
    }
//Eliminar un registro por ID 
async eliminar(tabla, idCampo, id){
    try{
        const[resultado] = await db.query(`DELETE FROM  ?? WHERE ?? = ?`,[tabla, idCampo, id]);
        if (resultado.affectedRows === 0) {
            throw new Error('Registro no encontrado');
        }
        return { message: 'Registro eliminado exitosamente'};
        }catch(error) {
        throw error;
    }
    }

    // 1. Listar todos los préstamos activos (sin devolución real)
async prestamosActivos() {
    try {
        const [resultados] = await db.query(`
            SELECT 
                p.id_prestamo,
                u.nombre AS usuario,
                e.codigo_unico AS ejemplar,
                l.titulo AS libro,
                p.fecha_prestamo,
                p.fecha_devolucion_prevista
            FROM 
                Prestamo p
            JOIN Usuario u ON p.id_usuario = u.id_usuario
            JOIN Ejemplar e ON p.id_ejemplar = e.id_ejemplar
            JOIN Libro l ON e.id_libro = l.id_libro
            WHERE p.fecha_devolucion_real IS NULL
        `);
        return resultados;
    } catch (error) {
        throw error;
    }
}

// 2. Mostrar libros disponibles por categoría
async librosDisponiblesPorCategoria() {
    try {
        const [resultados] = await db.query(`
            SELECT 
                c.nombre_categoria,
                l.titulo,
                e.codigo_unico
            FROM 
                Ejemplar e
            JOIN Libro l ON e.id_libro = l.id_libro
            JOIN Categoria c ON l.id_categoria = c.id_categoria
            WHERE e.id_ejemplar NOT IN (
                SELECT id_ejemplar FROM Prestamo WHERE fecha_devolucion_real IS NULL
            )
        `);
        return resultados;
    } catch (error) {
        throw error;
    }
}

// 3. Cantidad de préstamos por usuario
async prestamosPorUsuario() {
    try {
        const [resultados] = await db.query(`
            SELECT 
                u.nombre AS usuario,
                COUNT(p.id_prestamo) AS cantidad_prestamos
            FROM 
                Usuario u
            LEFT JOIN Prestamo p ON u.id_usuario = p.id_usuario
            GROUP BY u.id_usuario, u.nombre
            ORDER BY cantidad_prestamos DESC
        `);
        return resultados;
    } catch (error) {
        throw error;
    }
}

// 4. Libros que están prestados actualmente
async librosPrestadosActualmente() {
    try {
        const [resultados] = await db.query(`
            SELECT DISTINCT 
                l.titulo
            FROM 
                Prestamo p
            JOIN Ejemplar e ON p.id_ejemplar = e.id_ejemplar
            JOIN Libro l ON e.id_libro = l.id_libro
            WHERE p.fecha_devolucion_real IS NULL
        `);
        return resultados;
    } catch (error) {
        throw error;
    }
}


}


module.exports = crudController;

