import 'package:biblioteca/models/tarea.dart';
import 'package:biblioteca/services/database__helper..dart';
import 'package:flutter/material.dart';

class EditTareaPage extends StatefulWidget {
  final Tarea tarea;
  const EditTareaPage({super.key, required this.tarea});

  @override
  State<EditTareaPage> createState() => _EditTareaPageState();
}

class _EditTareaPageState extends State<EditTareaPage> {
  // Controladores para leer lo que el usuario escribe en los inputs
  late TextEditingController titleController; // Controla el campo "Título"
  late TextEditingController descripcionController; // Controla el campo "Autor"
  late TextEditingController
      fechaVencimientoController; // Controla el campo "Nota"

  // Estado inicial del Dropdown (Pendiente o Leído)
  late String status;

  @override
  void initState() {
    super.initState();
    // Inicializamos los controladores con los datos del libro que se va a editar
    titleController = TextEditingController(text: widget.tarea.title);
    descripcionController =
        TextEditingController(text: widget.tarea.description);
    fechaVencimientoController = TextEditingController(
      text: "${widget.tarea.fechaVencimiento.year}-"
          "${widget.tarea.fechaVencimiento.month.toString().padLeft(2, '0')}-"
          "${widget.tarea.fechaVencimiento.day.toString().padLeft(2, '0')}",
    );
    status = widget.tarea.status;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Barra superior con el título de la pantalla
      appBar: AppBar(
        title: const Text('Editar Tarea'),
      ),

      // Cuerpo principal con padding de 16 px

      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          child: Column(
            children: [
              // Campo para ingresar el título del libro
              TextFormField(
                controller: titleController,
                decoration: const InputDecoration(labelText: 'Título'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingresa el título';
                  }
                  return null;
                },
              ),

              // Campo para ingresar el autor del libro
              TextFormField(
                controller: descripcionController,
                decoration: const InputDecoration(labelText: 'Descripción'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingresa el autor';
                  }
                  return null;
                },
              ),

              // Dropdown para elegir el estado del libro (Leído o Pendiente)
              DropdownButtonFormField<String>(
                value: status, // Valor inicial
                items: const [
                  'Pendiente',
                  'Completado',
                ]
                    .map((s) => DropdownMenuItem(
                          value: s,
                          child: Text(s),
                        ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    status = value!; // Cambia el estado seleccionado
                  });
                },
                decoration: const InputDecoration(labelText: 'Estado'),
              ),

              // Widget para elegir la fecha
              TextFormField(
                controller: fechaVencimientoController,
                readOnly: true, // evita que el usuario escriba manualmente
                decoration: const InputDecoration(
                  labelText: 'Fecha de Vencimiento',
                  suffixIcon: Icon(Icons.calendar_today), // icono de calendario
                ),
                onTap: () async {
                  // Abrir el DatePicker
                  DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000), // Fecha mínima
                    lastDate: DateTime(2100), // Fecha máxima
                  );

                  if (pickedDate != null) {
                    // Formato YYYY-MM-DD
                    String formattedDate =
                        "${pickedDate.year}-${pickedDate.month.toString().padLeft(2, '0')}-${pickedDate.day.toString().padLeft(2, '0')}";

                    // Guardar en el controlador
                    setState(() {
                      fechaVencimientoController.text = formattedDate;
                    });
                  }
                },
              ),

              const SizedBox(height: 20), // Espacio antes del botón

              // Botón para actualizar el libro en la base de datos
              ElevatedButton(
                onPressed: () async {
                  final updatedTarea = Tarea(
                      id: widget.tarea.id, // Mantenemos el mismo id
                      title: titleController.text,
                      description: descripcionController.text,
                      status: status,
                      fechaVencimiento:
                          fechaVencimientoController.text.isNotEmpty
                              ? DateTime.parse(fechaVencimientoController.text)
                              : widget.tarea.fechaVencimiento);
                  await DatabaseHelper().updateTarea(updatedTarea);
                  // Volvemos a la pantalla anterior enviando "true" (éxito)
                  Navigator.pop(context, true);
                },
                child: const Text('ACTUALIZAR'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
