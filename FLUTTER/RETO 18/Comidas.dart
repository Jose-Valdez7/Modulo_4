void main(){
  List<String> comidasFavoritas=['Bolon','Encebollado','Tigrillo','Tonga','Hamburguesa'];
  print(comidasFavoritas);

  comidasFavoritas.add('Pizza');
  print(comidasFavoritas);

  comidasFavoritas.remove('Pizza');
  print(comidasFavoritas);
  print(comidasFavoritas[2]);

  List<List<String>> menuSemanal = [
    // Lunes
    ["Avena con frutas", "Pollo a la plancha", "Sopa de verduras"],
    // Martes
    ["Huevos revueltos", "Hamburguesa", "Ensalada César"],
    // Miércoles
    ["Tostadas francesas", "Pizza Margherita", "Sandwich de pavo"],
    // Jueves
    ["Smoothie verde", "Sushi Variado", "Pasta alfredo"],
    // Viernes
    ["Pancakes", "Lasagna Bolognesa", "Tacos"],
    // Sábado
    ["Bagel con salmón", "Parrillada", "Ceviche"],
    // Domingo
    ["Waffles", "Paella Valenciana", "Crema de champinones"]
  ];
  
  print("\n Consultando almuerzo del martes...");
  String almuerzoMartes = menuSemanal[1][1]; // Martes (índice 1), Almuerzo (índice 1)
  print("   ✓ Almuerzo del martes: $almuerzoMartes");
  
  print("\n Cambiando cena del viernes...");
  String cenaAnterior = menuSemanal[4][2];
  menuSemanal[4][2] = "Salmón a la parrilla";
  print("   ✓ Cena anterior del viernes: $cenaAnterior");
  print("   ✓ Nueva cena del viernes: ${menuSemanal[4][2]}");
  
  print("\n Mostrando menú semanal completo...");
  List<String> diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  List<String> tiposComida = ["Desayuno", "Almuerzo", "Cena"];
  
  for (int dia = 0; dia < menuSemanal.length; dia++) {
    print("\n   📅 ${diasSemana[dia]}:");
    for (int comida = 0; comida < menuSemanal[dia].length; comida++) {
      print("      ${tiposComida[comida]}: ${menuSemanal[dia][comida]}");
    }
  }
 }