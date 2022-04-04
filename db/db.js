require("dotenv").config();

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString:
      "postgres://rdfjyggm:3QnYRRG62fBrZeHZpqATEsQn5b6R0LMM@kashin.db.elephantsql.com/rdfjyggm",
  });

  //apenas testando a conexão
  const client = await pool.connect();

  client.release();

  //guardando para usar sempre o mesmo
  global.connection = pool;
  return pool.connect();
}

const getMessages = async () => {
  const client = await connect();
  const res = await connection
    .query("SELECT * FROM messages")
    .then((res) => {
      client.release();
      return res;
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
  return res.rows;
};

const sendMessage = async (user_id, username, message) => {
  const client = await connect();
  const queryStr = "INSERT INTO messages VALUES ($1, $2, NOW()::timestamp, $3)";
  const values = [user_id, username, message];
  await client
    .query(queryStr, values)
    .then((res) => {
      client.release();
      return res;
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
};

module.exports = {
  getMessages,
  sendMessage,
};
