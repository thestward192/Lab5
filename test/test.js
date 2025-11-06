var val = require("../libs/unalib");
var assert = require("assert");

describe("unalib", function () {
  describe("funcion is_valid_phone", function () {
    it("deberia devolver true para 8297-8547", function () {
      assert.equal(val.is_valid_phone("8297-8547"), true);
    });

    it("deberia devolver false para 8297p-8547", function () {
      assert.equal(val.is_valid_phone("8297p-8547"), false);
    });
  });

  describe("funcion is_valid_url_image", function () {
    it("deberia devolver true para http://image.com/image.jpg", function () {
      assert.equal(val.is_valid_url_image("http://image.com/image.jpg"), true);
    });

    it("deberia devolver true para http://image.com/image.gif", function () {
      assert.equal(val.is_valid_url_image("http://image.com/image.gif"), true);
    });

    it("deberia devolver false para URL sin extension de imagen", function () {
      assert.equal(
        val.is_valid_url_image("https://example.com/notimage"),
        false,
      );
    });
  });

  describe("funcion is_valid_yt_video", function () {
    it("deberia devolver true para https://www.youtube.com/watch?v=qYwlqx-JLok", function () {
      assert.equal(
        val.is_valid_yt_video("https://www.youtube.com/watch?v=qYwlqx-JLok"),
        true,
      );
    });

    it("deberia devolver true para https://youtu.be/Tx9zMFodNtA?list=RDTx9zMFodNtA", function () {
      assert.equal(
        val.is_valid_yt_video(
          "https://youtu.be/Tx9zMFodNtA?list=RDTx9zMFodNtA",
        ),
        true,
      );
    });

    it("deberia devolver false para video que no es YouTube", function () {
      assert.equal(val.is_valid_yt_video("https://vimeo.com/123456"), false);
    });
  });

  describe("funcion validateImageUrl (seguridad)", function () {
    it("deberia devolver true para imagen válida", function () {
      assert.equal(val.validateImageUrl("https://example.com/image.jpg"), true);
    });

    it("deberia devolver false para URL con localhost", function () {
      assert.equal(val.validateImageUrl("http://localhost/image.jpg"), false);
    });
  });

  describe("funcion validateVideoUrl (seguridad)", function () {
    it("deberia devolver true para video de YouTube válido", function () {
      assert.equal(
        val.validateVideoUrl("https://www.youtube.com/watch?v=qYwlqx-JLok"),
        true,
      );
    });

    it("deberia devolver false para video que no es de YouTube", function () {
      assert.equal(val.validateVideoUrl("https://vimeo.com/123456"), false);
    });
  });

  describe("funcion detectXSSPatterns", function () {
    it("deberia devolver true para script tag", function () {
      assert.equal(val.detectXSSPatterns("<script>alert(1)</script>"), true);
    });

    it("deberia devolver false para texto normal", function () {
      assert.equal(val.detectXSSPatterns("Hola mundo"), false);
    });
  });
});

describe("funcion validateMessage - Bloqueo de scripts", function () {
  it("deberia bloquear script de inyeccion en mensaje", function () {
    var scriptMalicioso = "<script>alert('inyeccion de script');</script>";
    var input =
      '{"nombre":"Hacker","mensaje":"' +
      scriptMalicioso +
      '","color":"#000000"}';

    var result = JSON.parse(val.validateMessage(input));

    // Verificar que el mensaje fue bloqueado
    assert.equal(result.mensaje, "Contenido bloqueado por seguridad");
    assert.equal(result.color, "#FF0000");
  });

  it("deberia bloquear script con alert en mensaje", function () {
    var input =
      '{"nombre":"Usuario","mensaje":"<script>alert(\\"XSS\\");</script>","color":"#000000"}';

    var result = JSON.parse(val.validateMessage(input));

    assert.equal(result.mensaje, "Contenido bloqueado por seguridad");
    assert.equal(result.color, "#FF0000");
  });

  it("deberia bloquear javascript: URL en mensaje", function () {
    var input =
      '{"nombre":"Usuario","mensaje":"javascript:alert(\\"XSS\\")","color":"#000000"}';

    var result = JSON.parse(val.validateMessage(input));

    assert.equal(result.mensaje, "Contenido bloqueado por seguridad");
    assert.equal(result.color, "#FF0000");
  });

  it("deberia permitir mensaje normal sin scripts", function () {
    var input = '{"nombre":"Juan","mensaje":"Hola mundo","color":"#000000"}';

    var result = JSON.parse(val.validateMessage(input));

    assert.equal(result.mensaje, "Hola mundo");
    assert.equal(result.color, "#000000");
  });
});
