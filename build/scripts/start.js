const logger = require('../lib/logger')

const PORT = process.env.PORT || 8080;
logger.info('Starting server...')
require('../../server/main').listen(PORT, () => {
  logger.success('Server is running at http://localhost:' + PORT)
})
