import * as React from "react";

import { BlockEditProps } from "@wordpress/blocks";

import { BrandNewWorldAttrs } from "./attributes";
import Inspector from "./inspector";
import { useState, useEffect } from "@wordpress/element";
import { createCustomIdHook } from "../../helpers/customHooks";
import { RichText } from "@wordpress/block-editor";



const useIdHook = createCustomIdHook('wp-block-themeisle-blocks-brand-new-world-')

const edit: React.FunctionComponent<BlockEditProps<BrandNewWorldAttrs>> = ({
  attributes,
  setAttributes,
  clientId
}) => {
  console.log(attributes);
  const [number, setNumber] = useState<number>(0);
  const id = useIdHook(clientId, attributes.id)

  useEffect( () => {
    setAttributes({
      id: id
    })
  }, [id])

  useEffect( () => {
    console.log( id, clientId, attributes.id )
  }, [id, attributes.id, clientId])

  return (
    <div>
      <Inspector
        attributes={attributes}
        setAttributes={setAttributes}
        number={number}
        setNumber={setNumber}
      />
      <RichText
        value={attributes.text || ""}
        onChange={(value) => setAttributes({ text: value })}
      />
    </div>
  );
};

export default edit;
