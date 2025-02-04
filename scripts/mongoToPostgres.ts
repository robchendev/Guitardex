import { MongoClient, Db, Collection } from "mongodb";
import { Pool, QueryResult } from "pg";

// Define types for MongoDB documents
interface MongoDocument {
  _id: string; // MongoDB ID
  name: string;
  value: number;
}

// Define types for PostgreSQL rows
interface PostgresRow {
  id: string;
  name: string;
  value: number;
}

// MongoDB configuration
const mongoURI = "your_mongodb_uri";
const mongoDBName = "your_mongodb_database_name";
const mongoCollectionName = "your_collection_name";

// PostgreSQL configuration
const pgConfig = {
  user: "your_postgres_user",
  host: "your_postgres_host",
  database: "your_postgres_database",
  password: "your_postgres_password",
  port: 5432,
};

// Main function for data migration
const migrateData = async (): Promise<void> => {
  // Initialize MongoDB client
  const mongoClient = new MongoClient(mongoURI);
  let mongoDB: Db;
  let mongoCollection: Collection<MongoDocument>;

  // Initialize PostgreSQL client
  const pgPool = new Pool(pgConfig);

  try {
    // Connect to MongoDB
    await mongoClient.connect();
    console.log("Connected to MongoDB");

    mongoDB = mongoClient.db(mongoDBName);
    mongoCollection = mongoDB.collection<MongoDocument>(mongoCollectionName);

    // Fetch documents from MongoDB
    const documents: MongoDocument[] = await mongoCollection.find({}).toArray();
    console.log(`Fetched ${documents.length} documents from MongoDB`);

    // Map MongoDB documents to PostgreSQL schema
    const mappedData: PostgresRow[] = documents.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      value: doc.value,
    }));

    // PostgreSQL insert query with conflict handling
    const query =
      "INSERT INTO your_table_name (id, name, value) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING";

    // Insert documents into PostgreSQL
    for (const data of mappedData) {
      await pgPool.query(query, [data.id, data.name, data.value]);
    }

    console.log("Data migration completed successfully");
  } catch (error) {
    console.error("Error during data migration:", error);
  } finally {
    // Close connections
    await mongoClient.close();
    await pgPool.end();
    console.log("Connections closed");
  }
};

// Execute the migration
migrateData().catch((err) => {
  console.error("Unhandled error:", err);
});
