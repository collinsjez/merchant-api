"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbServer = exports.MongoDBConnection = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const database_connection_error_exception_1 = require("../../exceptions/database-connection-error.exception");
const connStr = 'mongodb://localhost:27017';
const dbName = "inversify-express-example";
class MongooseConnector {
    connect() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env;
        mongoose_1.default.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
}
exports.default = MongooseConnector;
class MongoDBConnection {
    static getConnection(result) {
        if (this.isConnected) {
            return result(this.db);
        }
        else {
            this.connect((error, db) => {
                return result(this.db);
            });
        }
    }
    static connect(result) {
        mongodb_1.MongoClient.connect(connStr, (err, client) => {
            this.db = client == undefined ? new mongodb_1.MongoClient(connStr).db(dbName) : client.db(dbName);
            this.isConnected = true;
            return result(err, this.db);
        });
    }
}
exports.MongoDBConnection = MongoDBConnection;
MongoDBConnection.isConnected = false;
class DbServer {
    connect() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env; //`mongodb://coronsaye:Cr3d1tPasz@cluster0-shard-00-00.zkvrl.mongodb.net:27017,cluster0-shard-00-01.zkvrl.mongodb.net:27017,cluster0-shard-00-02.zkvrl.mongodb.net:27017/merchant?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true`
        mongoose_1.default.connect(`mongodb+srv://coronsaye:Cr3d1tPasz@cluster0.zkvrl.mongodb.net/merchant?retryWrites=true&w=majority`, {
            keepAlive: true,
            socketTimeoutMS: 5000,
            connectTimeoutMS: 5000
        });
        const connection = mongoose_1.default.connection;
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
        connection.on("error", (error) => {
            console.log("Mongo Connection Error: " + error);
        });
    }
    init() {
        const run = () => __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
        });
        run().catch(error => { throw new database_connection_error_exception_1.DatabaseConnectionError(); });
    }
}
exports.DbServer = DbServer;
