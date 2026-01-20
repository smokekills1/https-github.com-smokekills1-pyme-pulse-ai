
# 🚀 Guía de Inicio Rápido: PYME-Pulse AI

Esta guía explica el funcionamiento de la infraestructura de tu proyecto para la entrega final.

## 1. Arquitectura de la API
Para este proyecto de fin de curso, hemos implementado una **Arquitectura de Intermediario Seguro (Proxy)**:

1.  **Interfaz (Frontend)**: Los archivos en la raíz y la carpeta `/components`. Es la parte visual que utiliza el usuario.
2.  **Servidor (Backend)**: El archivo `api/ai.ts`. Es una función que se ejecuta en los servidores de Vercel.
3.  **Seguridad**: La clave privada (`API_KEY`) de Google Gemini nunca se envía al navegador del usuario. Se mantiene protegida y oculta en el servidor.

## 2. Ubicación de la API en producción
Una vez que despliegues el proyecto en Vercel, tu servidor responderá en la siguiente dirección:
`https://tu-proyecto.vercel.app/api/ai`

## 3. Configuración de la Clave Secreta (Paso Obligatorio)
Para que el sistema de IA funcione correctamente, debes configurar la variable de entorno:
1. Accede a tu panel de control en **Vercel**.
2. Ve a la sección **Settings (Configuración) -> Environment Variables (Variables de Entorno)**.
3. Crea una nueva variable llamada `API_KEY` y pega tu código obtenido de Google AI Studio.

## 4. Comandos para Desarrollo Local
Si deseas realizar pruebas en tu ordenador:
```bash
npm install
npm run dev
```
*Nota: Para que funcione en local, deberías crear un archivo secreto llamado `.env` con la línea `API_KEY=tu_clave_aqui`, aunque lo más recomendable es probarlo directamente una vez desplegado en Vercel.*

---
**Puntos clave para la presentación:**
- "Hemos priorizado la seguridad mediante una capa intermedia que protege los activos digitales de la empresa."
- "La arquitectura serverless permite escalar el servicio sin costes fijos de mantenimiento."
