export const createIdBlock = (prefix: string, clientId: string) => {
   return prefix + clientId.substr( 0, 8 );
}


