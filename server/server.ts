import * as express from 'express';
import { Application } from 'express';
import bodyParser = require('body-parser');
import { validatePostalCode } from './postal-code-validation.routes';

const app: Application = express();
app.use(bodyParser.json());

app.route('/api/zipTest').get(validatePostalCode);

const httpServer: any = app.listen(8000, () => {
  console.log(`HTTP REST API Server running at http://localhost:${httpServer.address().port}`);
});
