'use client';
import { OramaSearchBox } from "@orama/react-components";
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';

const searchBoxConfig = {
  "resultsMap": {
    "title": "title",
    "description": "content"
  }
};

export default function CustomSearchDialog(props: SharedProps) {
  return (
    <OramaSearchBox
      index={{
        endpoint: "https://cloud.orama.run/v1/indexes/build-avax-network-j5catx",
        api_key: "1J1RCcZwUUdw8CRIgMhUfFUoGJHeSmXe",
      }}
      {...searchBoxConfig}
      {...props}
    />
  );
}