CREATE DATABASE gestion_biblioteca;

CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150),
    correo VARCHAR(100),
    tipo_usuario ENUM('Estudiante', 'Profesor')
);

CREATE TABLE Categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100)
);


CREATE TABLE Libro (
    id_libro INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150),
    isbn VARCHAR(20),
    año_publicacion INT,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);


CREATE TABLE Ejemplar (
    id_ejemplar INT PRIMARY KEY AUTO_INCREMENT,
    id_libro INT,
    codigo_unico VARCHAR(50),
    FOREIGN KEY (id_libro) REFERENCES Libro(id_libro)
);


CREATE TABLE Prestamo (
    id_prestamo INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_ejemplar INT,
    fecha_prestamo DATE,
    fecha_devolucion_prevista DATE,
    fecha_devolucion_real DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_ejemplar) REFERENCES Ejemplar(id_ejemplar)
);

INSERT INTO Usuario (nombre, correo, tipo_usuario) VALUES
('Ana Torres', 'ana.torres@uni.edu', 'Estudiante'),
('Carlos Mejía', 'carlos.mejia@uni.edu', 'Profesor'),
('Laura Gómez', 'laura.gomez@uni.edu', 'Estudiante'),
('Javier Ruiz', 'javier.ruiz@uni.edu', 'Profesor'),
('Sofía Martínez', 'sofia.martinez@uni.edu', 'Estudiante');

select * from Usuario;

INSERT INTO Categoria (nombre_categoria) VALUES
('Ciencia Ficción'),
('Historia'),
('Tecnología');

select * from Categoria;

INSERT INTO Libro (titulo, isbn, año_publicacion, id_categoria) VALUES
('Dune', '9780441172719', 1965, 1),
('Sapiens', '9780062316110', 2011, 2),
('Clean Code', '9780132350884', 2008, 3);

select * from Libro;

INSERT INTO Ejemplar (id_libro, codigo_unico) VALUES
(1, 'DUNE001'),
(1, 'DUNE002'),
(2, 'SAPIENS001'),
(2, 'SAPIENS002'),
(3, 'CC001'),
(3, 'CC002');

select * from Ejemplar;

-- Importante: Asegúrate de que los IDs referenciados existen
INSERT INTO Prestamo (id_usuario, id_ejemplar, fecha_prestamo, fecha_devolucion_prevista, fecha_devolucion_real) VALUES
(1, 1, '2025-08-01', '2025-08-15', '2025-08-10'),
(2, 3, '2025-07-20', '2025-08-03', '2025-08-01'),
(3, 2, '2025-08-20', '2025-09-05', NULL),
(4, 4, '2025-08-25', '2025-09-10', NULL),
(5, 5, '2025-08-28', '2025-09-12', NULL);

select * from Prestamo;


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
WHERE 
    p.fecha_devolucion_real IS NULL;


SELECT 
    c.nombre_categoria,
    l.titulo,
    e.codigo_unico AS ejemplar
FROM 
    Ejemplar e
JOIN Libro l ON e.id_libro = l.id_libro
JOIN Categoria c ON l.id_categoria = c.id_categoria
WHERE 
    e.id_ejemplar NOT IN (
        SELECT id_ejemplar
        FROM Prestamo
        WHERE fecha_devolucion_real IS NULL
    );


SELECT 
    u.nombre AS usuario,
    COUNT(p.id_prestamo) AS cantidad_prestamos
FROM 
    Usuario u
LEFT JOIN Prestamo p ON u.id_usuario = p.id_usuario
GROUP BY u.id_usuario, u.nombre
ORDER BY cantidad_prestamos DESC;


SELECT DISTINCT 
    l.titulo
FROM 
    Prestamo p
JOIN Ejemplar e ON p.id_ejemplar = e.id_ejemplar
JOIN Libro l ON e.id_libro = l.id_libro
WHERE 
    p.fecha_devolucion_real IS NULL;





