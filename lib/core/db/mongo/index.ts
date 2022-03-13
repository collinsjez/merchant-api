import { Db, MongoClient } from "mongodb";
import mongoose from "mongoose";
import { MONGODB_URI, MONGO_DEVELOPMENT } from "../../config/environment";
import { DatabaseConnectionError } from "../../exceptions/database-connection-error.exception";
import { MONGODB_URL } from "../../utils/secrets";
const connStr = 'mongodb://localhost:27017';
const dbName = "inversify-express-example";

class MongooseConnector {

    connect() {
        const {
          MONGO_USER,
          MONGO_PASSWORD,
          MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
      }
}

export default MongooseConnector

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static getConnection(result: (connection: any) => void) {
    if (this.isConnected) {
      return result(this.db);
    } else {
      this.connect((error, db: Db) => {
        return result(this.db);
      });
    }
  }

  private static connect(result: (error: any, db: Db) => void) {
    
    MongoClient.connect(connStr, (err, client) => {
      this.db = client == undefined ? new MongoClient(connStr).db(dbName)  : client.db(dbName);
      this.isConnected = true;
      return result(err, this.db);
    });
  }
}

export class DbServer {

  private connect(): void {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env; //`mongodb://coronsaye:Cr3d1tPasz@cluster0-shard-00-00.zkvrl.mongodb.net:27017,cluster0-shard-00-01.zkvrl.mongodb.net:27017,cluster0-shard-00-02.zkvrl.mongodb.net:27017/merchant?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true`
    mongoose.connect(`mongodb+srv://coronsaye:Cr3d1tPasz@cluster0.zkvrl.mongodb.net/merchant?retryWrites=true&w=majority`,{
      keepAlive: true,
      socketTimeoutMS: 5000, 
      connectTimeoutMS: 5000
    });

    const connection = mongoose.connection;

    console.log(connection);

    connection.on("connected", () => {
      console.log("Mongo Connection Established Successfully");
    });

    connection.on("reconnected", () => {
      console.log("Mongo Connection Reestablished Successfully");
    });

    connection.on("disconnected", () => {
      console.log("Mongo Server Connection is lost");
      console.log("Trying to reconnect to Mongo...");
      setTimeout(() => {
       this.connect();
      }, 3000);
    });

    connection.on("closed", () => {
      console.log("Mongo Connection is Closed");
    });

    connection.on("error", (error: Error) => {
      console.log("Mongo Connection Error: " + error);
    });
  }

  init(): void {

    

    const run = async() => {
      await this.connect();
    };

    run().catch(error => {throw new DatabaseConnectionError()});

  }
}



