import {
  Heading,
  ListItem,
  OrderedList,
  UnorderedList,
  chakra,
} from "@chakra-ui/react";

import { RenderElementProps } from "slate-react";

const BlockquoteStyle: React.CSSProperties | undefined = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type) {
    case "block-quote":
      return (
        <chakra.blockquote
          style={BlockquoteStyle}
          borderLeftWidth={"10px"}
          borderLeftColor={"gray.200"}
          {...attributes}
        >
          {children}
        </chakra.blockquote>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return (
        <Heading as="h2" size="2xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h3" size="lg" {...attributes}>
          {children}
        </Heading>
      );
    case "youtube":
      // https://jkrsp.com/slate-js-youtube-embeds/
      return (
        <div {...attributes} contentEditable={false}>
          <iframe
            src={`https://www.youtube.com/embed/${element.videoId}`}
            aria-label="Youtube video"
            frameBorder="0"
            width={"400px"}
            height={"250px"}
          ></iframe>
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};
