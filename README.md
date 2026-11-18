# parcial2-v2-software

Parcial 2 de Ingeniería de Software (ISTEA, 2C-2026). Es un gestor de tareas web sencillo, armado como página estática HTML/CSS/JS y empaquetado en un contenedor Docker con `nginx:alpine`.

| Dato | Valor |
|---|---|
| Alumno | David Bernabé Wuscovi |
| Materia | Ingeniería de Software, 2.º cuatrimestre 2026 |
| Fecha | 18/11/2026 |

## Contenido del repositorio

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Página con la sección de bienvenida y el listado de tareas |
| `styles.css` | Estilos de la aplicación |
| `app.js` | Lógica del listado: agregar, completar y borrar tareas, guardadas en `localStorage` |
| `Dockerfile` | Imagen basada en `nginx:alpine` que sirve los archivos estáticos |
| `.dockerignore` | Excluye del contexto de build lo que no va en la imagen |
| `.gitignore` | Archivos que Git no versiona |

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado y en ejecución.
- Git, para clonar el repositorio.

## Construir e iniciar el contenedor

1. Clonar el repositorio y entrar a la carpeta:

   ```bash
   git clone https://github.com/<usuario>/parcial2-v2-software.git
   cd parcial2-v2-software
   ```

2. Construir la imagen:

   ```bash
   docker build -t parcial2-v2-software:1.0 .
   ```

3. Iniciar el contenedor en segundo plano y publicar el puerto 80 del contenedor en el 8080 del equipo:

   ```bash
   docker run -d --name parcial2-app -p 8080:80 parcial2-v2-software:1.0
   ```

4. Abrir <http://localhost:8080> en el navegador.

5. Comprobar el estado y detener el contenedor:

   ```bash
   docker ps --filter name=parcial2-app   # debe figurar "Up"
   docker logs parcial2-app               # accesos registrados por nginx
   docker stop parcial2-app && docker rm parcial2-app
   ```

## Flujo de trabajo con Git

| Paso | Rama | Commit |
|---|---|---|
| 1 | `main` | Estructura base: `README.md` y `.gitignore` |
| 2 | `main` | Archivos de la aplicación y `Dockerfile` |
| 3 | `feature-nueva-seccion` | Nueva sección: resumen de tareas y filtros por estado |
| 4 | `main` | Merge de `feature-nueva-seccion` (con `--no-ff`, para que el merge quede registrado en el historial) |

Para ver el historial con las ramas:

```bash
git log --oneline --graph --all
```
