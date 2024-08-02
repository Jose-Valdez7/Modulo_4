import 'celular.dart';
import 'dispositivo_electronico.dart';

class Computador extends DispositivoElectronico{
  int capacidadDisco;

  Computador(this.capacidadDisco,super.codigo,super.marca);

  @override
  void imprimir(){
  print("Computador codigo: $codigo, marca: $marca y capacidad del disco:$capacidadDisco Gb");
  }

  @override
  registrarInventario() {
    print("Registrando inventario: Computador codigo: $codigo, marca: $marca y capacidad del disco:$capacidadDisco Gb");
  }
}

void main(){
  final compu=Computador(512,12,"Lenovo");
  final cel=Celular(15,"Xiaomi");
  compu.imprimir();
  cel.imprimir();
}