# Imagen base liviana: nginx sobre Alpine Linux
FROM nginx:alpine

LABEL maintainer="David Bernabé Wuscovi" \
      description="Parcial 2 - Ingeniería de Software (ISTEA): gestor de tareas estático"

# Copia los archivos estáticos al directorio que sirve nginx
COPY index.html styles.css app.js resumen.js /usr/share/nginx/html/

EXPOSE 80

# nginx en primer plano para que el contenedor siga en ejecución
CMD ["nginx", "-g", "daemon off;"]
