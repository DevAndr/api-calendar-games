export default () => ({
    port: process.env.PORT || 3030,
    database: {
        host: process.env.MONGO_HOST,
        dbName: process.env.MONGO_DB_NAME,
    }
});