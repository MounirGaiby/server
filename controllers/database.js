const mysql = require("mysql2/promise");
const { dbConfig } = require("../config");

async function getConnection() {
  try {
    const pool = await mysql.createPool(dbConfig);
    console.log("Connected!");
    return pool;
  } catch (err) {
    console.error("Error connecting to the database: ", err);
    throw err;
  }
}

const checkQuery =
  "select * from informations_entreprise where ice = ? or rc = ?";
const query1 =
  "INSERT INTO informations_entreprise (raison_sociale, annee_creation, forme_juridique , activite_principale , siege_sociale , appartenance_groupe,nom_maison_mere,nom_gerant, ice , rc) VALUES (?, ?, ?, ?,?,?,?,?,?,?)";

const query2 =
  "INSERT INTO references_bancaires (id_entreprise,nom_banque,nom_contact,telephone) VALUES (?,?,?,?)";

const query3 =
  "INSERT INTO references_commerciales (id_entreprise,nom_entreprise,nom_contact,telephone,date_debut_relation) VALUES (?,?,?,?,?)";

const query4 =
  "INSERT INTO interlocuteur (id_entreprise,nom_interlocuteur,telephone,fonction,adresse_main) VALUES (?,?,?,?,?)";

const query5 =
  "insert into fichiers (id_entreprise,nom_fichier,type_fichier,contenu_fichier) VALUES (?,?,?,?)";

async function insertData(data, files) {
  let connection;
  try {
    let rows = [];
    const pool = await getConnection();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // check if it exits
    const [checkRow] = await connection.execute(checkQuery, [
      data[0].ice,
      data[0].rc,
    ]);
    if (checkRow.length > 0) {
      console.log("ICE or RC already used");
      return { success: false, message: "Le ICE ou RC est deja utilise" };
    }

    // insert rows into the first table
    for (key in data[0]) {
      rows.push(data[0][key]);
    }
    const [result] = await connection.execute(query1, rows);
    //getting id
    const [rowData] = await connection.execute("SELECT LAST_INSERT_ID() AS id");
    const insertedId = rowData[0].id;
    // 2
    for (const obj of data[1]) {
      rows = [];
      for (key in obj) {
        rows.push(obj[key]);
      }
      await connection.execute(query2, [insertedId, ...rows]);
    }

    //3
    for (const obj of data[2]) {
      rows = [];
      for (key in obj) {
        rows.push(obj[key]);
      }
      await connection.execute(query3, [insertedId, ...rows]);
    }
    //4
    rows = [];
    for (key in data[3]) {
      rows.push(data[3][key]);
    }
    await connection.execute(query4, [insertedId, ...rows]);

    //5 files inserts
    for (const file of files) {
      const data = [insertedId, file.originalname, file.mimetype, file.buffer];
      await connection.execute(query5, data);
    }

    //commiting inserts
    await connection.commit();
    console.log("All inserts were successful!");
    return { success: true };
  } catch (error) {
    console.error(error);
    if (connection) {
      await connection.rollback();
    }
    return { success: false, message: "Probleme dans l'insertion des donnees" };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { getConnection, insertData };
