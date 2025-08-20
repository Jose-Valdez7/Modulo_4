import 'package:flutter/material.dart';
import 'databaseHelper.dart';
import 'product.dart';

class ProductForm extends StatefulWidget{
  const ProductForm({super.key});

  @override
  State<StatefulWidget> createState() {
    return ProductFormState();
  }
}

 class ProductFormState extends State<ProductForm> {

  @override
  Widget build(BuildContext context) {
    final nameController = TextEditingController();
    final priceController = TextEditingController();
    final descriptionController = TextEditingController();
    final emailController = TextEditingController();

    return Scaffold(appBar: AppBar(
      title:const Text("Lista de Productos"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child:Column (
          children: <Widget>[
            TextField(
              controller: nameController,
              decoration: const InputDecoration(labelText: 'Nombre producto'),
            ),
            TextField(
              controller: priceController,
              decoration: const InputDecoration(labelText: 'Precio'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: descriptionController,
              decoration: const InputDecoration(labelText: 'Descripcion'),
              keyboardType: TextInputType.text,
            ),
            TextField(
              controller: emailController,
              decoration: const InputDecoration(labelText: 'Correo electrónico'),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: (){
                final product = Product(id: DateTime.now().millisecondsSinceEpoch, 
                name: nameController.text, 
                price: double.parse(priceController.text), 
                description: descriptionController.text,
                email: emailController.text,
                );
                DatabaseHelper().insertProduct(product);
                print('Producto ingreso en base de datos: ${product.name}');
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text("Producto anadido!!")),
                  );
                  Navigator.pop(context,true);
              },
              child: const Text('GRABAR'),
            ),
          ],
        ),
      ),
    );
 }
}