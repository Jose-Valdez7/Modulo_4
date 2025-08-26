import 'package:biblioteca/views/add_tarea_page.dart';
import 'package:biblioteca/widgets/home_page..dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
     title: 'Mi Tareas',
      home: const HomePage(),
      theme: ThemeData(primarySwatch: Colors.blue),
      routes: {
        '/add': (context) => const AddTareaPage(),
      },
    );
  }
}
