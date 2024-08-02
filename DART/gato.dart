import 'animal.dart';

class Gato extends Animal{
  
  @override
  void dormir(){
    print("GATO DORMILON");
  }

}

void main(){
  final gato=Gato();
  gato.dormir();
}