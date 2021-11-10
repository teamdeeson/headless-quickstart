import { ReactElement } from "react";
import { ComponentProps } from "../ComponentProps";
import { MyComponentFragment } from "./__generated__/MyComponentFragment";

export type MyComponentProps = ComponentProps<
  MyComponentFragment,
  {
    optionalThing?: boolean;
  }
>;

export default function MyComponent({ field1, field2, optionalThing = false }: MyComponentProps): ReactElement {
  return (
    <div>
      {field1}
      {field2 && ` ${field2}`}
      {optionalThing && " (with optional thing)"}
    </div>
  );
}
