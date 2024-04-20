import { Db, MongoClient } from "mongodb";

let db = new Db();
let client = new MongoClient('mongodb://127.255.255.255:25555');

export async function up(_db, _client) {
  db = _db; client = _client;

  db.createCollection("NewCollection")
};

export async function down(_db, _client) {
  db = _db; client = _client;

  db.dropCollection("NewCollection");
};