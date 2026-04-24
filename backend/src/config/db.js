import pg from "pg";
import ENV from "../utils/ENV.js";

const { Pool } = pg;
const { host, port, user, password, database_name } = ENV.database;

const db = new Pool({
  host,
  port,
  user,
  password,
  database: database_name,
});

const checkConnect = async () => {
  try {
    const client = await db.connect();
    console.log(`Database Connected successfully`);
    client.release();
  } catch (error) {
    console.error(`Error Connecting to database: ${error.message}`);
    process.exit(1);
  }
};

checkConnect();

export default db;
