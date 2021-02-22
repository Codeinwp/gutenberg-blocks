import { useEffect, useState } from "react";

export const createCustomIdHook = (prefix: string) => {
  const useId = (clientId: string, attrId?: string )  => {
    const [ id, setId ] = useState<string | undefined>( attrId );
   
    useEffect(() => {
      if ( id === undefined ) {
        setId( prefix + clientId.substr(0, 8) );
      }
   }, [attrId]);

   return id
  };

  return useId
};
