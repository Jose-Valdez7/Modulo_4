import 'package:flutter/material.dart';
import 'package:lista_clientes/pages/Routes.dart';
import 'package:lista_clientes/pages/clientList_pages.dart';
import 'package:lista_clientes/pages/home_page.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const HomePage(),
      routes: {
        Routes.listarClientes:(context)=> ClientlistPages(),
      },
    );
  }
}
