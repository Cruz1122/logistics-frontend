# Sistema de Gestión Logística - Frontend

Este es el frontend para el Sistema de Gestión Logística, una aplicación web completa construida con React. Proporciona una interfaz de usuario intuitiva para interactuar con los microservicios del backend, permitiendo una gestión fluida de usuarios, inventario, pedidos y seguimiento de entregas en tiempo real.

---

## **Tecnologías**

-   **Framework:** React 19 con Vite para una experiencia de desarrollo rápida.
-   **Gestión de Estado:** Redux Toolkit, con `redux-persist` para mantener el estado entre sesiones.
-   **Enrutamiento:** React Router v7 para un enrutamiento declarativo y protegido.
-   **Cliente HTTP:** Axios para realizar peticiones a la API Gateway del backend.
-   **Mapas y Geolocalización:** Google Maps API, integrada a través de `@react-google-maps/api`, para mostrar mapas y trazar rutas.
-   **Comunicación en Tiempo Real:** Socket.IO Client para recibir actualizaciones de ubicación en vivo desde el `geo-service`.
-   **Componentes de UI:** Una combinación de componentes personalizados e iconos de `react-icons` y `antd`.
-   **Notificaciones:** `react-toastify` para notificaciones amigables y no intrusivas.
-   **Autenticación:** Manejo de JWT (JSON Web Tokens) en el lado del cliente para una gestión de sesiones segura.

---

## **Funcionalidades**

La aplicación frontend se divide en varios módulos clave:

### **1. Autenticación**
-   **Inicio de Sesión y Registro:** Flujos seguros para el registro e inicio de sesión de usuarios.
-   **Autenticación de Dos Factores (2FA):** Soporte para recibir códigos de verificación por Email o SMS.
-   **Verificación de Correo Electrónico:** Un flujo para confirmar el email del usuario después del registro.
-   **Gestión de Contraseñas:**
    -   Restablecer de forma segura una contraseña olvidada mediante un código por email.
    -   Cambiar la contraseña actual desde el perfil de usuario.
-   **Rutas Protegidas:** El acceso a diferentes partes de la aplicación está restringido según el estado de autenticación y los permisos asignados al usuario.

### **2. Paneles Principales**
-   **Página de Inicio:** Una página de bienvenida con un buscador de códigos de seguimiento y acceso rápido al inicio de sesión/registro.
-   **Dashboard:** Un panel central donde los usuarios pueden acceder a diferentes módulos de gestión según sus roles y permisos.
-   **Perfil de Usuario:** Una página dedicada para que los usuarios vean la información de su cuenta y cierren sesión.

### **3. Módulos de Gestión (CRUD)**
La aplicación incluye paneles de gestión completos para todas las entidades principales del sistema, permitiendo a los usuarios autorizados Crear, Leer, Actualizar y Eliminar registros:
-   Gestión de Usuarios
-   Gestión de Roles y Permisos
-   Gestión de Categorías, Productos y Proveedores
-   Gestión de Estados y Ciudades
-   Gestión de Almacenes e Inventario (stock de Producto-Almacén)
-   Gestión de Pedidos y Repartidores

### **4. Geolocalización y Seguimiento**
-   **Seguimiento en Tiempo Real:** Una vista de mapa que muestra la ubicación en vivo de un repartidor, actualizada en tiempo real mediante WebSockets.
-   **Mapa de Vista Global:** Una vista administrativa que muestra las ubicaciones de todas las entregas activas, almacenes y pedidos pendientes en un solo mapa.
-   **Información de Ruta:** El mapa de seguimiento muestra la distancia y el tiempo de viaje estimados entre el repartidor y el destino.

### **5. Reportes**
-   **Descarga de Reportes:** Los usuarios con los permisos adecuados pueden descargar reportes de entrega en formatos **PDF** y **Excel** directamente desde el panel de gestión.

---

## **Cómo Ejecutar el Frontend**

### Prerrequisitos

- Docker
- Docker Compose

### **Pasos**

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Cruz1122/logistics-frontend.git
    cd logistics-frontend
    ```

2.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto, copiándolo de `.env.example`. Llena con los valores necesarios, especialmente la URL del API Gateway del backend.


3.  **Construir y ejecutar los servicios:**
    ```bash
    docker-compose up --build
    ```
    Este comando construirá la imagen de Docker para el frontend y lo iniciará. La aplicación será accesible en `http://localhost:5173`.
