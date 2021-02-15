import * as React from "react";

import { BlockEditProps } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";
import { BrandNewWorldAttrs } from "./attributes";
import Inspector from "./inspector";

const edit: React.FunctionComponent<BlockEditProps<BrandNewWorldAttrs>> = ({
  attributes,
  setAttributes,
}) => {
  console.log(attributes);
  return (
    <div>
      <Inspector attributes={attributes} setAttributes={setAttributes} />
      <RichText
        value={attributes.text}
        onChange={(value) => setAttributes({ text: value })}
      />
    </div>
  );
};

export default edit;
