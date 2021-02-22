import { InspectorControls } from "@wordpress/block-editor";
import { BlockEditProps } from "@wordpress/blocks";
import { PanelBody, RangeControl, TextControl } from "@wordpress/components";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Inspector } from "../../types/utility";

import { BrandNewWorldAttrs } from "./attributes";

type BrandnewWorldInspector = Inspector<BrandNewWorldAttrs> & {
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
};

const inspector: React.FunctionComponent<BrandnewWorldInspector> = ({
  attributes,
  setAttributes,
  number,
  setNumber,
}) => {
  return (
    <div>
      <InspectorControls>
        <PanelBody>
          <TextControl
            value={attributes.text || ""}
            onChange={(value) => setAttributes({ text: value })}
          />
          <TextControl
            value={number}
            onChange={(value) => setNumber(Number(value))}
          />
          <RangeControl
            value={number}
            onChange={(value) => setNumber(value || 0)}
          />
        </PanelBody>
      </InspectorControls>
    </div>
  );
};

export default inspector;
