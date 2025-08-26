import 'package:biblioteca/models/tarea.dart';
import 'package:biblioteca/services/database__helper..dart';
import 'package:biblioteca/views/edit_tarea_page.dart';
import 'package:biblioteca/widgets/tarea_title.dart';
import 'package:flutter/material.dart';

/// Pantalla principal de la aplicación.
/// Muestra todos los libros guardados y permite agregar, editar o eliminar.
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<StatefulWidget> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Lista futura de libros que se obtiene desde la base de datos
  late Future<List<Tarea>> _tareaList;

  @override
  void initState() {
    super.initState();
    // Inicializamos la lista de libros al cargar la pantalla
    _refreshList();
  }

  /// Método para refrescar la lista de libros desde la base de datos
  void _refreshList() {
    setState(() {
      _tareaList = DatabaseHelper().getTareas();
    });
  }

  /// Método para eliminar un libro y actualizar la lista
  void _deleteTarea(int id) async {
    await DatabaseHelper().deleteTarea(id);
    _refreshList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Barra superior con el título de la app
      appBar: AppBar(
        title: const Text('Mis Tareas'),
      ),

      // El cuerpo depende de si la lista de libros ya fue cargada
      body: FutureBuilder<List<Tarea>>(
        future: _tareaList, // futuro que se está esperando
        builder: (context, snapshot) {
          // Mientras se cargan los datos, mostramos un spinner
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          // Si no hay datos o está vacío
          else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No hay tareas...'));
          }
          // Si hay datos, mostramos la lista de libros
          else {
            return ListView(
              children: snapshot.data!.map((tarea) {
                return TareaTitle(
                  tarea: tarea,
                  // Cuando se elimina un libro, lo quitamos de la BD
                  onDelete: () => _deleteTarea(tarea.id!),
                  // Cuando se edita, abrimos la pantalla de edición
                  onEdit: () async {
                    final result = await Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => EditTareaPage(tarea: tarea),
                      ),
                    );
                    // Si al volver de la edición el resultado es true, refrescamos
                    if (result == true) {
                      _refreshList();
                    }
                  },
                );
              }).toList(),
            );
          }
        },
      ),

      // Botón flotante para añadir un nuevo libro
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          // Abre la pantalla para añadir libros (ruta '/add')
          final result = await Navigator.pushNamed(context, '/add');
          // Si se agregó un libro, refrescamos la lista
          if (result == true) {
            _refreshList();
          }
        },
        child: const Icon(Icons.add), // Icono de "+"
      ),
    );
  }
}
