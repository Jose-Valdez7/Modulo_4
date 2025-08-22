void main (){
  List<String> ciudadades=['Quito','Guayaquil','Cuenca','Loja','Quito'];
  print(ciudadades);

  //ciudadades.add(10);
  print(ciudadades[1]);

  ciudadades.add('Esmeraldas');
  print(ciudadades);

  ciudadades.remove("Esmeraldas");
  print(ciudadades);

  List<List<int>> numeros = [
    [1,2,3],
    [4,5,6],
  ];
  print(numeros[0][1]);

  List<Ciudad> ciudadadesObj=[
    Ciudad('Quito', 20000),
    Ciudad('Cuenca', 1000),
    Ciudad('Ambato', 85000),  
  ];

  print(ciudadadesObj[0].nombre);
  print(ciudadadesObj[1].poblacion);

  ciudadadesObj.add(Ciudad("Loja", 60000));

  for(var ciudad in ciudadadesObj){
    print("${ciudad.nombre}, ${ciudad.poblacion}");
  };
}

class Ciudad{
  String? nombre;
  int? poblacion;

  Ciudad(this.nombre,this.poblacion);
}