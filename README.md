# Clínica Veterinaria – Angular

Aplicación web para la gestión de una clínica veterinaria, desarrollada con **Angular** y **TypeScript** como evaluación parcial del curso *Desarrollo de Interfaces 3*.

## Problema que resuelve

La clínica tenía un proceso de atención lento: los clientes debían llamar para agendar citas, no existía control digital de los horarios y no había historial de las mascotas atendidas. Esta aplicación permite:

1. Registrar nuevas mascotas y sus dueños.
2. Agendar y visualizar citas disponibles en un calendario.
3. Consultar el historial de atención de cada mascota.

## Funcionalidades

- **Autenticación:** inicio de sesión simulado y guard que protege las rutas de mascotas y citas.
- **Mascotas:** formulario reactivo con validaciones (nombre, especie, raza, fecha de nacimiento y datos del dueño) y listado.
- **Citas:** calendario mensual con horarios libres/ocupados, formulario de nueva cita y cancelación. Un horario ocupado no puede agendarse dos veces.
- **Historial:** citas de cada mascota con motivo, estado y diagnóstico, filtro por estado y registro de la atención.

## Tecnologías

- Angular (arquitectura con módulos, `standalone: false`)
- TypeScript (interfaces, clases, servicios y funciones tipadas, POO)
- RxJS (`BehaviorSubject`, `combineLatest`)
- ReactiveForms
- Pipes y directiva personalizados
- Datos guardados en el navegador (`localStorage` / `sessionStorage`), sin backend

## Estructura del proyecto

```
src/app/
├── auth/
│   ├── guards/            auth-guard.ts
│   ├── login/             login-component (.ts / .html)
│   ├── services/          auth-service.ts
│   └── auth-module.ts
├── mascotas/
│   ├── registro-mascota/  formulario de registro
│   ├── lista-mascotas/    listado de mascotas
│   ├── historial-mascota/ historial por mascota
│   ├── services/          mascota-service.ts
│   └── mascotas-module.ts
├── citas/
│   ├── calendario/        agenda mensual y horarios
│   ├── formulario-cita/   nueva cita
│   ├── services/          cita-service.ts
│   └── citas-module.ts
├── shared/
│   ├── models/            Mascota, Dueno, Cita
│   ├── pipes/             estadoCita, fechaCita
│   ├── directives/        appResaltarCitaProxima
│   └── shared-module.ts
├── app-module.ts
├── app-routing-module.ts
└── app.ts / app.html
```

### Elementos personalizados de Angular

| Elemento | Nombre | Uso |
|---|---|---|
| Pipe | `estadoCita` | Muestra el estado de la cita con ícono (⏳ Pendiente, ✅ Atendida, ❌ Cancelada) |
| Pipe | `fechaCita` | Formatea la fecha y hora en español |
| Directiva | `appResaltarCitaProxima` | Resalta las citas que ocurren en las próximas 24 horas |
| Guard | `authGuard` | Redirige al login si no hay sesión iniciada |

## Requisitos previos

- [Node.js](https://nodejs.org) versión LTS (se recomienda 20 o superior)
- npm (viene con Node.js)
- Angular CLI:

```bash
npm install -g @angular/cli
```

Para verificar las versiones instaladas:

```bash
node -v
npm -v
ng version
```

## Instalación

```bash
git clone https://github.com/TU_USUARIO/clinica-veterinaria.git
cd clinica-veterinaria
npm install
```

## Ejecución

```bash
ng serve
```

Abrir en el navegador: **http://localhost:4200**

La aplicación se recompila automáticamente al guardar cambios. Para detener el servidor se usa `Ctrl + C`.

Si el puerto 4200 está ocupado:

```bash
ng serve --port 4300
```

### Generar la versión de producción

```bash
ng build
```

Los archivos se generan en la carpeta `dist/`.

## Credenciales de prueba

El inicio de sesión es **simulado** (no hay backend): los usuarios están definidos en `auth-service.ts`.

| Usuario | Clave |
|---|---|
| `admin` | `clinica123` |
| 

## Pruebas

### Pruebas automáticas

```bash
ng test
```

### Pruebas manuales (flujo completo)

| # | Caso | Pasos | Resultado esperado |
|---|---|---|---|
| 1 | Protección de rutas | Sin iniciar sesión, abrir `/citas` | Redirige a `/login` |
| 2 | Login incorrecto | Ingresar `admin` con clave `123456` | Muestra "Usuario o clave incorrectos." |
| 3 | Validación del login | Dejar la clave con menos de 6 caracteres | Muestra el mensaje de validación y deshabilita el botón |
| 4 | Login correcto | Ingresar `admin` / `clinica123` | Entra a Mascotas y aparece el menú |
| 5 | Registrar mascota | Mascotas → Nueva mascota, completar datos válidos | La mascota aparece en el listado |
| 6 | Validar teléfono | Registrar con teléfono `123` | Muestra el error y no permite guardar |
| 7 | Agendar cita | Citas → elegir un día desde hoy → horario libre → mascota y motivo → Agendar | La cita aparece en el día y el horario pasa a "ocupado" |
| 8 | Horario ocupado | Intentar elegir el mismo horario | El botón del horario está deshabilitado |
| 9 | Registrar atención | Mascotas → Ver historial → Registrar atención → diagnóstico de 5 o más caracteres → Guardar | La cita pasa a "Atendida" con su diagnóstico |
| 10 | Filtrar historial | En el historial, elegir "Atendidas" | Solo se muestran las citas atendidas |
| 11 | Cancelar cita | En el calendario, pulsar "Cancelar" en una cita pendiente | La cita desaparece y el horario queda libre |
| 12 | Cerrar sesión | Pulsar "Cerrar sesión" y abrir `/mascotas` | Redirige a `/login` |

## Validaciones de formularios

| Campo | Regla |
|---|---|
| Nombre de la mascota | Obligatorio, mínimo 2 caracteres |
| Raza y fecha de nacimiento | Obligatorios |
| Nombre del dueño | Obligatorio, mínimo 3 caracteres |
| Teléfono | 9 dígitos y empieza con 9 |
| Email | Formato de correo válido |
| Motivo de la cita | Mínimo 5 caracteres |
| Diagnóstico | Mínimo 5 caracteres |
| Clave de acceso | Mínimo 6 caracteres |

## Notas

- Los datos se guardan en el navegador. Si se borran los datos del sitio, se pierden las mascotas y citas registradas.
- La sesión se guarda en `sessionStorage`, así que se cierra al cerrar la pestaña.
- Horarios de atención configurados: 9, 10, 11, 12, 14, 15, 16 y 17 horas.

## Integrantes

- LOZANO MELENDEZ HECTOR MILKO
- CHAUCA PEREZ OMAR DANIEL
- LLACSAHUANGA MUÑOZ OWEN DEL PIERO

Curso: Desarrollo de Interfaces 3 · IDAT
