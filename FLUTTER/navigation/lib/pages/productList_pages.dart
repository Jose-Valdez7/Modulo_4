import 'package:flutter/material.dart';
import 'package:navigation/pages/product_pages.dart';

class ProductListPages extends StatelessWidget {
  final List<Product> products = [
    Product(
        name: "Producto 1",
        price: 10.0,
        descriptions: "Descripcion del Producto 1"),
        Product(
        name: "Producto 2",
        price: 20.0,
        descriptions: "Descripcion del Producto 2"),
        Product(
        name: "Producto 3",
        price: 30.0,
        descriptions: "Descripcion del Producto 3"),
        Product(
        name: "Producto 4",
        price: 40.0,
        descriptions: "Descripcion del Producto 4"),
        Product(
        name: "Producto 5",
        price: 50.0,
        descriptions: "Descripcion del Producto 5"),
        Product(
        name: "Producto 6",
        price: 60.0,
        descriptions: "Descripcion del Producto 6"),
        Product(
        name: "Producto 7",
        price: 70.0,
        descriptions: "Descripcion del Producto 7"),
        Product(
        name: "Producto 8",
        price: 80.0,
        descriptions: "Descripcion del Producto 8"),
  ];

  ProductListPages({super.key});

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
        backgroundColor: Colors.blue,
      ),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context,index){
          return ListTile(
            title: Text(products[index].name),
            subtitle: Text(products[index].descriptions),
            trailing: Text('\$${products[index].price.toStringAsFixed(2)}'),
          );
        },
        ),
    );
  }
}
