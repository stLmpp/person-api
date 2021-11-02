import { Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { configureApp } from './main';

let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    configureApp(nestApp);
    await nestApp.init();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (event, context, callback) => {
  const server = await bootstrapServer();
  return server(event, context, callback);
};
