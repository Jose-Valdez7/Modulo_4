import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/tarea.dart';

class DatabaseHelper {
  // Creamos una sola instancia de DatabaseHelper (patrón Singleton)
  static final DatabaseHelper _instance = DatabaseHelper._internal();

  // El "factory" garantiza que siempre devolvemos la misma instancia
  factory DatabaseHelper() => _instance;

  // Aquí guardaremos la conexión a la base de datos
  static Database? _database;

  // Constructor privado para que no se pueda crear más de un DatabaseHelper
  DatabaseHelper._internal();

  // Getter para obtener la base de datos
  Future<Database> get database async {
    // Si ya existe la conexión, la devolvemos
    if (_database != null) return _database!;

    // Si no existe, la inicializamos
    _database = await _initDatabase();
    return _database!;
  }

  // Inicializa la base de datos
  Future<Database> _initDatabase() async {
    // Obtenemos la ruta donde se guardan las bases de datos en el dispositivo
    String path = join(await getDatabasesPath(), 'tarea.db');

    // Abrimos o creamos la base de datos
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) {
        // Si la base de datos no existe, creamos la tabla "Tareas"
        return db.execute(
          'CREATE TABLE Tarea(id INTEGER PRIMARY KEY, title TEXT, description TEXT, status TEXT, fechaVencimiento TEXT)',
        );
      },
    );
  }


  // Insertar un nuevo libro en la base de datos
  Future<int> insertTarea(Tarea tarea) async {
    final db = await database;

    // Insertamos el libro convirtiéndolo a mapa (Tarea.toMap())
    // Si ya existe un libro con el mismo id, lo reemplaza
    return await db.insert('Tarea', tarea.toMap(),
        conflictAlgorithm: ConflictAlgorithm.replace);
  }

  // Obtener todos los libros de la base de datos
  Future<List<Tarea>> getTareas() async {
    final db = await database;

    // Traemos todos los registros de la tabla "Tareas"
    final List<Map<String, dynamic>> maps = await db.query('Tarea');

    // Convertimos cada mapa en un objeto Tarea
    return List.generate(maps.length, (i) {
      return Tarea(
        id: maps[i]['id'],
        title: maps[i]['title'],
        description: maps[i]['description'],
        status: maps[i]['status'],
        fechaVencimiento: DateTime.parse(maps[i]['fechaVencimiento']),
      );
    });
  }


  // Actualizar un libro existente
  Future<int> updateTarea(Tarea tarea) async {
    final db = await database;

    return await db.update(
      'Tarea',
      tarea.toMap(),
      where: 'id = ?',
      whereArgs: [tarea.id],
    );
  }
  // Eliminar un libro por su id
  Future<void> deleteTarea(int id) async {
    final db = await database;
    await db.delete(
      'Tarea',
      where: 'id = ?',
      whereArgs: [id],
    );
  }  
}
