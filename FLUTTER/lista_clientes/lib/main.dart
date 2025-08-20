import 'package:flutter/material.dart';
import 'package:lista_clientes/product_form.dart';
import 'package:lista_clientes/product_list.dart';
import 'package:path/path.dart';
import 'databaseHelper.dart';

void main() {
  var dbHelper1 = DatabaseHelper();
  var dbHelper2 = DatabaseHelper();
  
  if (dbHelper1 == dbHelper2) {
    print('DatabaseHelper es un singleton');
  } else {
    print('DatabaseHelper no es un singleton');
  }
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const ProductList(),
      routes: {
        '/add': (context) => const ProductForm(),
      },
    );
  }
}
