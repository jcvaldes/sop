import express from 'express';
import DocumentDispatched from './controller';
import mdw from '../../middlewares/authentication';

const app = express();

app.get('/', [mdw.verifyToken], DocumentDispatched.Fetch);
app.get('/:id', [mdw.verifyToken], DocumentDispatched.FetchOne);
app.post('/', [mdw.verifyToken], DocumentDispatched.Create);
app.put('/:id', [mdw.verifyToken], DocumentDispatched.Update);
app.delete('/:id', [mdw.verifyToken], DocumentDispatched.Delete);

export default app;
