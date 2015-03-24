
var fs = require('fs');
var mocha = require('mocha');
var assert = require('assert');
var postcss = require('postcss');
var prefix = require('..');

var src = [
  '.hello {}', 
  '.bass-hello {}',
  '@media (--small) { .hello {} }',
  '#hi.hello {}',
  '#hi .hello {}',
  '.hi .hello {}',
  '.hi.hello {}',
  '[type=text].hello {}',
  '.hello[type=text]{}'
].join('\n');

var css = postcss()
  .use(prefix({ prefix: 'test-' }))
  .process(src)
  .css;

console.log(css);

var replaceBass = postcss()
  .use(prefix({ prefix: 'two-', replace: '.bass-' }))
  .process(src)
  .css;

console.log(replaceBass);

