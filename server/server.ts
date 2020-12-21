import * as express from 'express';
import { Application } from 'express';
import bodyParser = require('body-parser');
import { createProxyMiddleware } from 'http-proxy-middleware';
import { validatePostalCode } from './postal-code-validation.routes';

const app: Application = express();
app.use(bodyParser.json());
app.use('/api', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));

app.route('/api/interview-is-zip-valid').post(validatePostalCode);

const httpServer: any = app.listen(8000, () => {
  console.log(`HTTP REST API Server running at http://localhost:${httpServer.address().port}`);
});
