import { Collection, Db, MongoClient } from "mongodb";

export default class MongoService {
  static collections: { migrations?: Collection };
  private static client: MongoClient;
  private static db: Db;
  private static isConnected: boolean;
  private static lastConnection: number;
  private static lastCommand: number;

  private static async initClientConfigs() {
    this.client.addListener("connectionReady", () => (this.isConnected = true));

    this.client.addListener(
      "connectionClosed",
      () => (this.isConnected = false)
    );

    this.client.addListener(
      "commandStarted",
      () => (this.lastCommand = Date.now())
    );

    await this.client.connect();
  }

  static async connectToDatabase(): Promise<any> {
    if (this.isConnected) return this.collections;

    this.client = new MongoClient(process.env.DB_CONN_STRING ?? "");
    await this.initClientConfigs();

    this.db = this.client.db(process.env.DB_NAME);
    this.collections.migrations = this.db.collection("Migrations");

    if (!this.lastConnection) {
      this.lastConnection = Date.now();
      console.info(
        `Initial connection to database:\n`,
        `Name: ${this.db.databaseName}\n`,
        `Collections: ${this.collections}\n`
      );
    }

    return this.collections;
  }
}
