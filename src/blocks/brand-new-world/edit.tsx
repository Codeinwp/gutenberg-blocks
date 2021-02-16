import * as React from "react";

import { BlockEditProps } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";
import { BrandNewWorldAttrs } from "./attributes";
import Inspector from "./inspector";
import { OtterEditProps } from "~/src/types/utility";
import { useState } from "@wordpress/element";

const edit: React.FunctionComponent<BlockEditProps<BrandNewWorldAttrs>> = ({
  attributes,
  setAttributes,
}) => {
  console.log(attributes);
  const [number, setNumber] = useState<number>(0);

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
