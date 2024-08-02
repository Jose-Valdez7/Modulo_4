class mensaje{
  void saludar(String nombre,String apellido,String apodo){//parametro posicional deben pasar todo
    print('Hola $nombre $apellido, $apodo');
  }
  void darBienvenida (String nombre,String apellido,String? apodo){
    print('Hola $nombre $apellido, $apodo');
  } 

  void despedirse({String nombre="",String? apodo}){//parametro nombrado es opcional
    print('Hola $nombre, $apodo');
  }

  void animar({required String nombre,required String apellido,String? apodo}){//parametro nombrado con required es obligatorio
    print('Hola $nombre $apellido, $apodo');
  }
}

void main(){
  final msj=mensaje();
  msj.saludar("Juan", 'Perez', "");
  msj.darBienvenida("Juan", "Valdez", null);
  msj.darBienvenida("Juan", "Valdez", "El Flaco");
  msj.despedirse(nombre:"Juan",apodo:"sd");
  msj.animar(apellido: "Diaz",nombre: "Pepito");//asi el orden no importa
}