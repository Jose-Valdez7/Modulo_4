# 🛍️ Catálogo de Productos - Página Web

Una página web moderna y responsiva para mostrar un catálogo de productos con diseño atractivo y funcionalidades interactivas.

## 📋 Características

- ✅ **Diseño Responsivo**: Se adapta perfectamente a dispositivos móviles, tablets y computadoras
- ✅ **Navegación Suave**: Scroll suave entre secciones
- ✅ **Menú Móvil**: Navegación hamburguesa para dispositivos móviles
- ✅ **Animaciones**: Efectos visuales atractivos y transiciones suaves
- ✅ **Tarjetas de Productos**: Diseño moderno con hover effects
- ✅ **Formulario de Newsletter**: Suscripción funcional
- ✅ **Notificaciones**: Sistema de notificaciones para acciones del usuario
- ✅ **Optimización**: Lazy loading de imágenes y animaciones optimizadas

## 🚀 Cómo Usar

### 1. Abrir la Página
Simplemente abre el archivo `index.html` en tu navegador web favorito:
- Chrome
- Firefox
- Safari
- Edge

### 2. Navegación
- **Header**: Navegación fija con enlaces a las secciones
- **Hero Section**: Sección principal con llamada a la acción
- **Productos**: Catálogo de productos con imágenes y precios
- **Footer**: Información de contacto y enlaces útiles

### 3. Funcionalidades Interactivas
- **Agregar al Carrito**: Haz clic en los botones para simular agregar productos
- **Ver Detalles**: Explora los detalles de cada producto
- **Newsletter**: Suscríbete con tu email
- **Enlaces Sociales**: Conecta con redes sociales

## 📁 Estructura de Archivos

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este archivo
```

## 🎨 Personalización

### Cambiar Productos
Edita el archivo `index.html` en la sección de productos:

```html
<div class="product-card">
    <div class="product-image">
        <img src="tu-imagen.jpg" alt="Nombre del Producto">
    </div>
    <div class="product-info">
        <h3>Nombre del Producto</h3>
        <p class="product-description">Descripción del producto</p>
        <div class="product-price">
            <span class="price">$99.99</span>
        </div>
        <button class="btn-add-cart">
            <i class="fas fa-shopping-cart"></i>
            Agregar al Carrito
        </button>
    </div>
</div>
```

### Cambiar Colores
Modifica las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
    --text-color: #333;
    --background-color: #f8f9fa;
}
```

### Agregar Más Productos
Simplemente copia y pega el bloque de `product-card` y modifica:
- Imagen del producto
- Nombre del producto
- Descripción
- Precio
- Precio anterior (opcional)

## 📱 Responsive Design

La página se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: 3 columnas de productos
- **Tablet**: 2 columnas de productos
- **Mobile**: 1 columna de productos

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript**: Interactividad y animaciones
- **Font Awesome**: Iconos
- **Google Fonts**: Tipografía Poppins

## 🌟 Características Avanzadas

### Animaciones
- Fade in al hacer scroll
- Hover effects en tarjetas
- Transiciones suaves
- Efecto parallax en hero section

### Interactividad
- Menú móvil funcional
- Notificaciones toast
- Validación de formularios
- Smooth scrolling

### Optimización
- Lazy loading de imágenes
- CSS optimizado
- JavaScript modular
- Código limpio y comentado

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda para personalizar la página, puedes:

1. Revisar los comentarios en el código
2. Modificar los estilos en `styles.css`
3. Agregar funcionalidades en `script.js`

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**¡Disfruta tu nueva página web de catálogo! 🎉**
