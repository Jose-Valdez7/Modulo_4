import 'package:flutter/material.dart';
import 'package:lista_clientes/pages/Routes.dart';

class HomePage extends StatelessWidget{
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.orange,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          MaterialButton(
            onPressed: () {
              Navigator.pushNamed(context, Routes.listarClientes);
            },
            color: const Color.fromARGB(255, 161, 92, 24),
            child: const Text("LISTAR CLIENTES"),
          )
        ],
      ),
    );
  }

}