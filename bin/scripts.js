#!/usr/bin/env node
'use strict';

process.on('unhandledRejection', err => {
  throw err;
});

const { spawnSync } = require('child_process');
const path = require('path');
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(x => x === 'build' || x === 'start' || x === 'test');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

console.log(process.execPath,
  nodeArgs
    .concat(path.resolve(__dirname, '../scripts/', script))
    .concat(args.slice(scriptIndex + 1)),
  { stdio: 'inherit' });

if (!['build', 'start', 'test'].includes(script)) {
  const result = spawnSync(
    process.execPath,
    nodeArgs
      .concat(path.resolve(__dirname, '../scripts/', script))
      .concat(args.slice(scriptIndex + 1)),
    { stdio: 'inherit' }
  );

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'La construcción falló porque el proceso finalizó demasiado pronto. ' +
        'Esto probablemente significa que el sistema se quedó sin memoria o que alguien llamó ' +
        '`kill -9` al proceso.'
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'La construcción falló porque el proceso finalizó demasiado pronto. ' +
        'Alguien podría haber llamado `kill` o `killall`, o el sistema podría ' +
        'Estaré cerrando'
      );
    }
    process.exit(1);
  }
  process.exit(result.status);
} else {
  console.log(`Escritura desconocida "${script}".`);
  console.log('¿Quizás necesites actualizar los scripts de reacción?');
}
