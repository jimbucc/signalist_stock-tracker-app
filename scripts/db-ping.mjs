import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI not set');

(async () => {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    try {
        await client.connect();
        const admin = client.db().admin();
        const ping = await admin.ping();
        const dbs = await admin.listDatabases();
        console.log('MongoDB ping ok:', ping);
        console.log('Database names:', dbs.databases.map(d => d.name));
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exitCode = 1;
    } finally {
        await client.close();
    }
})();