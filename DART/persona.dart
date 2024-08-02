class Persona{
  String? nombre;//acepta null
  int edad=0;//no acepta null tiene que dar valor
  double? estatura;

  
}

void main(){
  final p=Persona();
  p.nombre="Mario";
  p.edad=50;
  p.estatura=1.78;
  print("Nombre: ${p.nombre}");
  print("Edad: ${p.edad}");
  print("Estatura: ${p.estatura}");
}