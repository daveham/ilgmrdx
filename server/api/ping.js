import { queue as Queue } from 'node-resque';
const debug = require('debug')('app:api-ping');

export default function configureApi(router) {
  router.route('/ping')
    .post((req, res, next) => {
      const { category } = req.body;
      if (category === 'task') {
        debug('performing ping via task');

        const connectionDetails = {
          pkg: 'ioredis',
          host: '127.0.0.1',
          password: null,
          port: 6379,
          database: 0
          // namespace: 'resque',
          // looping: true,
          // options: {password: 'abc'},
        };
        const queue = new Queue({ connection: connectionDetails });
        queue.on('error', (error) => { debug(error); });

        queue.connect(() => {
          queue.enqueue('math', 'ping');
          res.json({ msg: 'enqueued' });
        });

      } else {
        debug('unexpected ping category', category);
        res.status(404).json({ error: 'unexpected ping category' });
      }
    });
}
