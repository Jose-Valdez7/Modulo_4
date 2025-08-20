import 'package:flutter_test/flutter_test.dart';
import 'package:lista_clientes/databaseHelper.dart';
import 'package:lista_clientes/product.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';

void main() {
  // Inicializar Sqflite FFI
  sqfliteFfiInit();

  //cambia la fabrica de base de datos a la de FFI
  databaseFactory = databaseFactoryFfi;

  late DatabaseHelper databaseHelper;

  setUp(() {
    databaseHelper = DatabaseHelper();
  });

  test('Insert product', () async {
    var product = Product(
      id: 1,
      name: 'TestProduct',
      price: 9.99,
      description: 'Description 1');
    await databaseHelper.insertProduct(product);

    var products = await databaseHelper.getProducts();
    //Recorrer lista de procuctos e imprimir en consola
    for (var product in products) {
      print('ID: ${product.id} - Nombre: ${product.name} - Precio: ${product.price} - Descripción: ${product.description}');
    }
  });

  test('Update product', () async {
    var product = Product(
      id: 1,
      name: 'Update Product',
      price: 229.99,
      description: 'Upadate Description 1');
    await databaseHelper.updateProduct(product);

    var products = await databaseHelper.getProducts();
    for (var product in products) {
      print('ID: ${product.id} - Nombre: ${product.name} - Precio: ${product.price} - Descripción: ${product.description}');
    }
  });

  test('Delete product', () async {
    await databaseHelper.deleteProduct(1);
    var products = await databaseHelper.getProducts();
    for (var product in products) {
      print('ID: ${product.id} - Nombre: ${product.name} - Precio: ${product.price} - Descripción: ${product.description}');
    }
  });
}