import { InspectorControls } from "@wordpress/block-editor";
import { BlockEditProps } from "@wordpress/blocks";
import { PanelBody, TextControl } from "@wordpress/components";
import * as React from "react";
import { BrandNewWorldAttrs } from "./attributes";

interface Inspector
  extends Pick<
    BlockEditProps<BrandNewWorldAttrs>,
    "attributes" | "setAttributes"
  > {}

const inspector: React.FunctionComponent<Inspector> = ({
  attributes,
  setAttributes,
}) => {
  return (
    <div>
      <InspectorControls>
        <PanelBody>
          <TextControl
            value={attributes.text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </PanelBody>
      </InspectorControls>
    </div>
  );
};

export default inspector;
