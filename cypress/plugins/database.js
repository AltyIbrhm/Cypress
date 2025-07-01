const mysql = require('mysql2/promise');
const { Pool } = require('pg');
const { MongoClient } = require('mongodb');

// Database configurations
const dbConfigs = {
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'qualitest_careers',
    port: process.env.MYSQL_PORT || 3306
  },
  postgres: {
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DATABASE || 'qualitest_careers',
    port: process.env.PG_PORT || 5432
  },
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    database: process.env.MONGODB_DATABASE || 'qualitest_careers'
  }
};

// Database connections cache
let connections = {};

/**
 * Get MySQL connection
 */
async function getMySQLConnection() {
  if (!connections.mysql) {
    connections.mysql = await mysql.createConnection(dbConfigs.mysql);
  }
  return connections.mysql;
}

/**
 * Get PostgreSQL connection
 */
async function getPostgresConnection() {
  if (!connections.postgres) {
    connections.postgres = new Pool(dbConfigs.postgres);
  }
  return connections.postgres;
}

/**
 * Get MongoDB connection
 */
async function getMongoConnection() {
  if (!connections.mongodb) {
    const client = new MongoClient(dbConfigs.mongodb.url);
    await client.connect();
    connections.mongodb = client.db(dbConfigs.mongodb.database);
  }
  return connections.mongodb;
}

/**
 * Close all database connections
 */
async function closeConnections() {
  if (connections.mysql) {
    await connections.mysql.end();
    connections.mysql = null;
  }
  if (connections.postgres) {
    await connections.postgres.end();
    connections.postgres = null;
  }
  if (connections.mongodb) {
    await connections.mongodb.client.close();
    connections.mongodb = null;
  }
}

module.exports = (on, config) => {
  // MySQL Tasks
  on('task', {
    async mysqlQuery(query, params = []) {
      try {
        const connection = await getMySQLConnection();
        const [rows] = await connection.execute(query, params);
        return { success: true, data: rows };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async mysqlInsert(table, data) {
      try {
        const connection = await getMySQLConnection();
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        
        const [result] = await connection.execute(query, values);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async mysqlUpdate(table, data, where) {
      try {
        const connection = await getMySQLConnection();
        const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
        const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        
        const values = [...Object.values(data), ...Object.values(where)];
        const [result] = await connection.execute(query, values);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async mysqlDelete(table, where) {
      try {
        const connection = await getMySQLConnection();
        const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
        const query = `DELETE FROM ${table} WHERE ${whereClause}`;
        
        const values = Object.values(where);
        const [result] = await connection.execute(query, values);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  });

  // PostgreSQL Tasks
  on('task', {
    async pgQuery(query, params = []) {
      try {
        const client = await getPostgresConnection();
        const result = await client.query(query, params);
        return { success: true, data: result.rows };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async pgInsert(table, data) {
      try {
        const client = await getPostgresConnection();
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        
        const result = await client.query(query, values);
        return { success: true, data: result.rows[0] };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async pgUpdate(table, data, where) {
      try {
        const client = await getPostgresConnection();
        const setClause = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ');
        const whereClause = Object.keys(where).map((key, index) => `${key} = $${Object.keys(data).length + index + 1}`).join(' AND ');
        const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause} RETURNING *`;
        
        const values = [...Object.values(data), ...Object.values(where)];
        const result = await client.query(query, values);
        return { success: true, data: result.rows };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  });

  // MongoDB Tasks
  on('task', {
    async mongoFind(collection, query = {}) {
      try {
        const db = await getMongoConnection();
        const result = await db.collection(collection).find(query).toArray();
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async mongoInsert(collection, document) {
      try {
        const db = await getMongoConnection();
        const result = await db.collection(collection).insertOne(document);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async mongoUpdate(collection, filter, update) {
      try {
        const db = await getMongoConnection();
        const result = await db.collection(collection).updateOne(filter, { $set: update });
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    async mongoDelete(collection, filter) {
      try {
        const db = await getMongoConnection();
        const result = await db.collection(collection).deleteOne(filter);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  });

  // Utility Tasks
  on('task', {
    async closeDatabaseConnections() {
      await closeConnections();
      return null;
    },

    async resetTestData() {
      try {
        // Reset test data in all databases
        const mysql = await getMySQLConnection();
        const pg = await getPostgresConnection();
        const mongo = await getMongoConnection();

        // Clear test applications
        await mysql.execute('DELETE FROM applications WHERE email LIKE "%test%"');
        await pg.query('DELETE FROM applications WHERE email LIKE $1', ['%test%']);
        await mongo.collection('applications').deleteMany({ email: { $regex: /test/ } });

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  });

  return config;
}; 