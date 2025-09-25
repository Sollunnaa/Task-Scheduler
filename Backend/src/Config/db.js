import pg from "pg";
import dotenv from "dotenv";

dotenv.config({path: '../.env'});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT version()");
    console.log("PostgreSQL Version:", res.rows[0].version);
  }finally {
    client.release();
  } 

  getPgVersion().catch((err) => console.error("Error executing query", err.stack));
}

export default pool;