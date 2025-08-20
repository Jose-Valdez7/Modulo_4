import 'package:flutter/material.dart';
import 'databaseHelper.dart';
import 'product.dart';

class ProductList extends StatefulWidget{
  const ProductList({super.key});

  @override
  State<StatefulWidget> createState() {
    return _ProductListState();
  }
}

 class _ProductListState extends State<ProductList> {
  late Future<List<Product>> _productList;

  @override
  void initState() {
    super.initState();
    _loadProducts();
  }

  void _loadProducts() {
    setState(() {
      _productList = DatabaseHelper().getProducts();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(
      title:const Text("Lista de Productos"),
      ),
      body: FutureBuilder<List<Product>>(
        future: _productList,
        builder:(context, snapshot){
          if(snapshot.connectionState == ConnectionState.waiting){
            return const Center(child: CircularProgressIndicator());
          } else if(snapshot.hasError){
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if(!snapshot.hasData || snapshot.data!.isEmpty){
            return const Center(
                child: Text('No hay productos'));
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index){
                final product = snapshot.data![index];
                return ListTile(
                  title: Text(product.name),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(product.description),
                      Text('Precio: \$${product.price}'),
                      Text('Email: ${product.email}'),
                    ],
                  ),
                );
              },
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(onPressed: () async {
        final result = await Navigator.pushNamed(context,'/add');
        if (result == true){
          _loadProducts(); //recarga la lsita de producots
        }
      },
      child: const Icon(Icons.add),
      ),
    );
 }
}
