import 'package:flutter/material.dart';
import 'package:navigation/pages/routes.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          MaterialButton(
            onPressed: () {
              /*final route = MaterialPageRoute(builder: (ctx) {
                return const ProductsPage();
              });
              Navigator.push(context, route);*/
              Navigator.pushNamed(context, Routes.products);
            },
            color: Colors.blue,
            child: const Text("IR A PAGINA 2"),
          ),
          MaterialButton(
            onPressed: () {
              /*final route=MaterialPageRoute(builder: (ctx){
                return const CustomersPage();
              });*/
              //Navigator.push(context, route);
              Navigator.pushNamed(context, Routes.customers);
            },
            color: Colors.green,
            child: const Text("IR A CLIENTES"),
          ),
          MaterialButton(
            onPressed: () {
              Navigator.pushNamed(context, Routes.listview);
            },
            color: const Color.fromARGB(255, 161, 92, 24),
            child: const Text("IR A LIST BASICO"),
          ),
          MaterialButton(
            onPressed: () {
              Navigator.pushNamed(context, Routes.productsList);
            },
            color: const Color.fromARGB(255, 161, 92, 24),
            child: const Text("IR A LISTA DE PRODUCTOS"),
          )
        ],
      ),
    );
  }
}
