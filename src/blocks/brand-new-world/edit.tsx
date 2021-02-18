import * as React from "react";

import { BlockEditProps } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";
import { BrandNewWorldAttrs } from "./attributes";
import Inspector from "./inspector";
import { OtterEditProps } from "~/src/types/utility";
import { useState, useEffect } from "@wordpress/element";
import { createIdBlock } from "~/src/helpers/create-id";

const edit: React.FunctionComponent<BlockEditProps<BrandNewWorldAttrs>> = ({
  attributes,
  setAttributes,
  clientId
}) => {
  console.log(attributes);
  const [number, setNumber] = useState<number>(0);

  useEffect( () => {
    setAttributes({
      id: createIdBlock('wp-block-themeisle-blocks-brand-new-world', clientId)
    })
  }, [ clientId ])

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
