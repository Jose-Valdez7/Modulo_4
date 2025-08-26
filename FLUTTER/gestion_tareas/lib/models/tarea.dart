class Tarea {
  final int id;
  final String title;
  final String description;
  final DateTime fechaVencimiento; 
  final String status;

//Fecha de vencimiento: La fecha límite para completar la tarea, en formato YYYY-
//MM-DD.
  Tarea({
    required this.id,
    required this.title,
    required this.description,
    required this.fechaVencimiento,
    required this.status,
  });



  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'fechaVencimiento': fechaVencimiento.toIso8601String(),
      'status': status,
    };
  }
}
