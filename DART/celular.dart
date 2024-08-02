import 'dispositivo_electronico.dart';
import 'computador.dart';

class Celular extends DispositivoElectronico{
  Celular(super.codigo,super.marca);
  
  @override
  void imprimir(){
  print("Celular codigo: $codigo y marca: $marca");
  }

  @override
  registrarInventario() {
    print("Registrando inventario: Celular codigo: $codigo y marca: $marca");
  }
}

void main(){
  final compu=Computador(512,12,"Lenovo");
  final celu=Celular(22,"Samsung");

  compu.registrarInventario();
  celu.registrarInventario();
}