'use strict';

const assert = require('assert');
const val = require('../../libs/unalib');
const { Given, When, Then } = require('@cucumber/cucumber');

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
