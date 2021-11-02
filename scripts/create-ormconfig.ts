import '../src/config';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';
import { getTypeormConfig } from '../src/config/ormconfig';

async function build(): Promise<void> {
  const child = spawn('yarn', ['build']);
  let error = '';
  for await (const chunk of child.stderr) {
    error += chunk;
  }
  const exitCode = await new Promise(promiseResolve => {
    child.on('close', promiseResolve);
  });

  if (exitCode) {
    throw new Error(`subprocess error exit ${exitCode}, ${error}`);
  }
}

async function generateOrmConfig(): Promise<void> {
  await build();

  const { autoLoadEntities, ...typeormConfig } = getTypeormConfig();

  const dbOptions = JSON.stringify({
    ...typeormConfig,
    synchronize: false,
    namingStrategy: 'new NamingStrategy()',
    entities: [resolve(process.cwd() + '/dist/**/*.entity.js')],
  }).replace(`"new NamingStrategy()"`, 'new NamingStrategy()');

  const file = `const { NamingStrategy } = require('./dist/src/typeorm-naming-strategy'); module.exports = ${dbOptions};`;

  await fs.writeFile(resolve(process.cwd() + '/ormconfig.js'), file);
}

generateOrmConfig().then();
