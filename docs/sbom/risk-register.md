# Matriz de Riesgos de Dependencias

Fecha: 2025-11-05

Criterios: Probabilidad (P) 1-5, Impacto (I) 1-5, Puntaje = P × I. Umbral de acción: ≥ 8.

| Paquete            | Versión | Uso/rol            | P   | I   | Puntaje | Decisión | Acción                                                                                   |
| ------------------ | ------- | ------------------ | --- | --- | ------- | -------- | ---------------------------------------------------------------------------------------- |
| express            | 4.18.2  | HTTP framework     | 2   | 5   | 10      | Mitigar  | Mantener 4.18.x al día; evaluar Express 5.x con pruebas cuando sea oportuno.             |
| socket.io          | 4.7.2   | Tiempo real (WS)   | 3   | 4   | 12      | Mitigar  | Mantener 4.x al día; alinear con cliente 4.7.2; revisar avisos de seguridad transitivos. |
| mocha              | 10.2.0  | Unit testing (dev) | 1   | 2   | 2       | Aceptar  | Mantener al día.                                                                         |
| @cucumber/cucumber | 10.9.0  | BDD (dev)          | 1   | 2   | 2       | Aceptar  | Mantener al día.                                                                         |
| eslint             | 8.57.1  | Linting (dev)      | 1   | 2   | 2       | Aceptar  | Mantener al día.                                                                         |

Notas:

- Priorizar la revisión de avisos de `npm audit` sobre dependencias runtime (Express/Socket.IO) y aplicar `npm audit fix` cuando sea seguro.
- Las herramientas de desarrollo no impactan runtime, pero pueden afectar la cadena de CI. Mantener versiones estables.
