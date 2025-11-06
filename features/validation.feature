Feature: Validación segura de mensajes del chat
  Como usuario del chat
  Quiero que los mensajes peligrosos sean bloqueados
  Para evitar inyecciones de scripts y contenido malicioso

  Scenario: Bloquear script de inyección
    Given un nombre "Hacker" y un mensaje "<script>alert('XSS')</script>"
    When valido el mensaje
    Then el resultado debe indicar "Contenido bloqueado por seguridad"

  Scenario: Aceptar mensaje de texto normal
    Given un nombre "Juan" y un mensaje "Hola mundo"
    When valido el mensaje
    Then el resultado debe indicar "Hola mundo"
