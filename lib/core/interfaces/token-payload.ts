interface TokenPayload {
    _id: string;
    exp?: number;
    accessTypes?: string[];
    name?: string;
    userId?: number;
  }
  
  export default TokenPayload;