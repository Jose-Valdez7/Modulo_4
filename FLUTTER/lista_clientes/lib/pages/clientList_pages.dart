import 'package:flutter/material.dart';
import 'package:lista_clientes/pages/clientes.dart';

class ClientlistPages extends StatelessWidget {
  final List<Clientes> clientes = [
    Clientes(codigo: 001, cedula: "1782934561", name: "Juan Andrade"),
    Clientes(codigo: 002, cedula: "1902834571", name: "Pamela Valencia"),
    Clientes(codigo: 003, cedula: "0927384152", name: "Alexandra Rodriguez"),
    Clientes(codigo: 004, cedula: "3546289012", name: "Pablo Duque"),
    Clientes(codigo: 005, cedula: "5632717719", name: "Jose Chaco"),
    Clientes(codigo: 006, cedula: "0923812314", name: "Ismael Vaca"),
    Clientes(codigo: 007, cedula: "1309293823", name: "Angely Rengifo"),
    Clientes(codigo: 008, cedula: "8973231341", name: "Xioamara Loor"),
    Clientes(codigo: 009, cedula: "0912371414", name: "Stegany Suares"),
    Clientes(codigo: 010, cedula: "7612731481", name: "Eduardo Quiroz"),
  ];

  ClientlistPages({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back),
        ),
        backgroundColor: Colors.orange,
      ),
      body: ListView.builder(
        itemCount: clientes.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(clientes[index].name),
            subtitle: Text(clientes[index].codigo.toString()),
            trailing: Text(clientes[index].cedula),
            leading: const Icon(
              Icons.add_to_queue,
              color: Colors.blue,
            ),
          );
        },
      ),
    );
  }
}
