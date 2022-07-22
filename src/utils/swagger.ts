import { Express, Request, Response} from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { version } from '../../package.json';

const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
          title: "Microservice 1",
          version,
        },
        components: {
          securitySchemas: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    apis: ['./src/routes.ts'],
}

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const swaggerDoc = (app: Express, port: number) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });

    console.info(`API Documenet is availble on http://localhost:${port}/api-docs.`);
};

export default swaggerDoc;