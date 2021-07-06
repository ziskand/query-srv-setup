const gremlin = require('gremlin');
const traversal = gremlin.process.AnonymousTraversalSource.traversal;
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;

const DB_URL = process.env.DB || 'ws://localhost:8182/gremlin';
const MAX_RETRIES = 10;

const wait = (timeout) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

const client = (async (url) => {
    for (let i = 0; i <= MAX_RETRIES; i++) {
        try {
            return traversal().withRemote(new DriverRemoteConnection(url));
        } catch (err) {
            const timeout = Math.pow(2, i);
            console.log("retry in ", timeout);
        }
    }

    return null;
})(DB_URL);

module.exports = {
    client
}