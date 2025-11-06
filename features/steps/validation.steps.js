'use strict';

const assert = require('assert');
const val = require('../../libs/unalib');
const { Given, When, Then } = require("cucumber");

let nombre;
let mensaje;
let resultado;

Given('un nombre {string} y un mensaje {string}', function (n, m) {
  nombre = n;
  mensaje = m;
});

When('valido el mensaje', function () {
  const input = JSON.stringify({ nombre, mensaje, color: '#000000' });
  resultado = JSON.parse(val.validateMessage(input));
});

Then('el resultado debe indicar {string}', function (textoEsperado) {
  assert.strictEqual(resultado.mensaje, textoEsperado);
});

Given("el usuario abre la aplicación", function () {
	// ...existing step code...
});
When("el usuario ingresa datos inválidos", function () {
	// ...existing step code...
});
Then("debe ver un mensaje de error", function () {
	// ...existing step code...
});
Then("el resultado debe ser exitoso", function () {
	// ...existing step code...
});
