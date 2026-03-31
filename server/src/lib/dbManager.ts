import mongoose, { Connection } from 'mongoose';

class DBManager {
  private connections: Map<string, Connection> = new Map();
  private globalConnection: Connection | null = null;
  private readonly baseUri: string;

  constructor() {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI or MONGODB_URI env var not set');
    this.baseUri = uri.trim().replace(/\/*$/, '');

    const safeUri = this.baseUri.replace(/:\/\/.*@/, '://***@');
    console.log(`DBManager using MongoDB URI from environment: ${safeUri}`);
  }

  sanitizeDbName(userId: string): string {
    return `user_${userId}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  private buildUriForDb(dbName: string): string {
    const [uriWithoutQuery, query] = this.baseUri.split('?');
    const cleaned = uriWithoutQuery.replace(/\/*$/, '');
    const hostPortPart = cleaned.replace(/^(mongodb(?:\+srv)?:\/\/[^/]+)(?:\/.*)?$/, '$1');
    const connectionString = `${hostPortPart}/${dbName}${query ? `?${query}` : ''}`;
    return connectionString;
  }

  async getGlobalConnection(): Promise<Connection> {
    if (this.globalConnection) return this.globalConnection;
    const uri = this.buildUriForDb('global');
    console.log(`Connecting to global MongoDB: ${uri.replace(/:\/\/.*@/, '://***@')}`);
    this.globalConnection = await mongoose.createConnection(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`Global MongoDB connected`);
    return this.globalConnection;
  }

  async getUserConnection(userId: string): Promise<Connection> {
    const dbName = this.sanitizeDbName(userId);
    if (this.connections.has(dbName)) return this.connections.get(dbName)!;
    const uri = this.buildUriForDb(dbName);
    console.log(`Connecting to tenant DB: ${dbName} (${uri.replace(/:\/\/.*@/, '://***@')})`);
    const conn = await mongoose.createConnection(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`Tenant DB ${dbName} connected`);
    this.connections.set(dbName, conn);
    return conn;
  }
}

export default new DBManager();
