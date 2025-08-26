
import 'package:biblioteca/models/tarea.dart';
import 'package:flutter/material.dart';

/// Este widget representa la "tarjeta" visual de un libro.
/// Muestra el título, autor, estado, y permite editar o eliminar el libro.
class TareaTitle extends StatelessWidget {
  // Libro que se mostrará en la tarjeta
  final Tarea tarea;
  // Función que se ejecutará cuando se presione el botón de eliminar
  final VoidCallback onDelete;
  // Función que se ejecutará cuando se presione el botón de editar
  final VoidCallback onEdit;

  // Constructor: obliga a pasar un `Tarea`, y las funciones `onDelete` y `onEdit`
  const TareaTitle({
    super.key,
    required this.tarea,
    required this.onDelete,
    required this.onEdit,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      // Margen alrededor de la tarjeta (separación con otros elementos)
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      child: ListTile(
        // Muestra el título del libro
        title: Text(tarea.title),
        // Muestra  y estado en el subtítulo, en varias líneas
        subtitle: Text(
          'Descripción: ${tarea.description} \n'
          'Fecha Vencimiento: ${tarea.fechaVencimiento.toString().split(' ')[0]} \n'
          'Estado: ${tarea.status}',
        ),
        // Permite que el subtítulo use hasta 3 líneas
        isThreeLine: true,
        // Parte derecha del ListTile: botones de acción
        trailing: Row(
          mainAxisSize:
              MainAxisSize.min, // Ajusta el tamaño del Row al contenido
          children: [
            // Botón para editar el libro
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: onEdit, // Ejecuta la función recibida
            ),
            // Botón para eliminar el libro
            IconButton(
              icon: const Icon(Icons.delete),
              onPressed: onDelete, // Ejecuta la función recibida
            ),
          ],
        ),
      ),
    );
  }
}
