// Import the framework and instantiate it
import Fastify from 'fastify';

import Controller from './controller.js'

const fastify = Fastify({ logger: true });

// Declare a route
fastify.register(Controller)

// Run the server!
try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
