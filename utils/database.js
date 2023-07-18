import * as SQLite from "expo-sqlite";

// Create or open the database connection
const db = SQLite.openDatabase("little_lemon");

// Function to create the database and tables (if they don't exist)
const createDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, itemName TEXT, price FLOAT, description TEXT, image TEXT, category TEXT)",
      [],
      () => {
        console.log("Database and table created successfully");
      },
      (_, error) => {
        console.log("Error creating database:", error);
      }
    );
  });
};

// Function to insert data into the database
const insertDataAndGetResult = (data) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO menu (itemName, price, description, image, category) VALUES (?, ?, ?, ?, ?)",
        [
          data.itemName,
          data.price,
          data.description,
          data.image,
          data.category,
        ],
        (_, { insertId }) => {
          tx.executeSql(
            "SELECT * FROM menu WHERE id = ?",
            [insertId],
            (_, { rows }) => {
              const insertedData = rows.item(0);
              resolve(insertedData);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to fetch data from the database
const checkAndRetrieveData = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM menu",
        [],
        (_, { rows }) => {
          const data = rows._array;
          console.log("inside db", rows._array);
          if (data.length > 0) {
            resolve(data);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const selectItemsByCategories = (categories) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const placeholders = categories.map(() => "?").join(",");
      const categoryNames = categories.map((category) => category);
      console.log("Category Names:", categoryNames);
      const query = `SELECT * FROM menu WHERE category IN (${placeholders})`;
      console.log("Query:", query);
      tx.executeSql(
        query,
        categoryNames,
        (tx, results) => {
          const items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          console.log("Items: ", items);
          resolve(items);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
};

export {
  createDatabase,
  insertDataAndGetResult,
  checkAndRetrieveData,
  selectItemsByCategories,
};
