# SBOM de la Aplicación

Inventario mínimo de componentes para este proyecto (Node.js / Express + Socket.IO, CommonJS).

Fecha: 2025-11-05

## 1) Inventario (SBOM mínimo)

Origen: `npm ls --depth=0` (top-level) y `package.json`.

| Paquete            | Versión instalada | Licencia | Alcance |
| ------------------ | ----------------- | -------- | ------- |
| express            | 4.18.2            | MIT      | runtime |
| socket.io          | 4.7.2             | MIT      | runtime |
| @cucumber/cucumber | 10.9.0            | MIT      | dev     |
| mocha              | 10.2.0            | MIT      | dev     |
| eslint             | 8.57.1            | MIT      | dev     |

Notas:

- Las versiones reflejan el estado instalado actualmente. Se deben validar breaking changes antes de actualizar.
- El cliente de Socket.IO 4.7.2 se carga por CDN en `index.html`.

## 2) Observaciones de riesgo (resumen)

- Backend en Express 4.18.x estable.
- Socket.IO 4.7.x alineado con el cliente 4.7.2.
- Herramientas de desarrollo: Mocha (unit), Cucumber (BDD), ESLint (linting) obligatorios según el estándar.

Para detalles de riesgo por paquete y acciones sugeridas, ver `docs/sbom/risk-register.md`.

Nota: El cliente Socket.IO 4.7.2 por CDN hereda la licencia MIT del proyecto Socket.IO.
