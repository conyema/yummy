const http = require('http');
const app = require('./app');

/**
 * 	normalizePort returns a valid port whether provided as string
 * 	or number
 */

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

/**
 * 	errorHandler checks some common system errors and handles them properly
 */
const errorHandler = error => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated priviledges.`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use.`);
			process.exit(1);
			break;
		default:
			throw error;
	}
};

//	create an HTTP Express server
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
	const address = server.address();
	const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
	console.log(`server listening on ${bind}`);
});

server.listen(port);
