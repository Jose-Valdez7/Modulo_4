abstract class DispositivoElectronico{
  int codigo;
  String marca;

  DispositivoElectronico(this.codigo,this.marca);

  registrarInventario();

  void imprimir(){
  print("Dispositivo Electronico codigo: $codigo y marca: $marca");
  }
}