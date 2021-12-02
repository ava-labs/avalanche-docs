import conf from 'nconf';
import express from 'express';
import AvalancheAPI from './json-rpc-client';
import ResponseObject from './model/ResponseObject';

const config = conf.file({ file: 'config.json' });
const app = express();
const port = config.get('port');

app.use(express.json());
app.post('/', (req, res) => {
	  console.log('POST Data: ', req.body);
	  const reqData = req.body;
	  AvalancheAPI.post(reqData.data.method, reqData.data.params, reqData.data.chain).then((result) => {
		      res.status(200).json(ResponseObject.setter(reqData,result,200));
		    }).catch((err) => {
			        res.status(500).json({error: err.message});
			      });
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
