class Coordenada{
  int x;
  int y;
  int? z;

  Coordenada(this.x,this.y);

  Coordenada.origen():x=0,y=0{ //punto medio para que se inicialice antes del cuerpo del constructor y no inicie en nulo
  
  }
}