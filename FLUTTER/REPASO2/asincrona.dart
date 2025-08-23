//future, async - await

void main(){
  // print('Operacion 1');
  // Future.delayed(Duration(seconds: 3), ()=>print("Operacion 2 asincrona"));
  // print('Operacion 3');
  // print('Operacion 4');
  // print('Operacion 5');

  print("Estoy en mi casa");
  pedirPizza();
  print('Viendo la television');
}

Future<String> prepararPizza(){
  return Future.delayed(Duration(seconds: 5),()=>"Pizza entregada");
}

void pedirPizza() async{
  print("Llamando a la pizzeria");

  final mensaje = await prepararPizza();
  print(mensaje);

  print("A comer la pizza");
}

