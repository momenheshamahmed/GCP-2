declare module "leaflet-textpath" {
  import * as L from "leaflet";

  module "leaflet" {
    interface Polyline {
      setText(text: string | null, options?: TextPathOptions): this;
    }

    interface TextPathOptions {
      repeat?: boolean;
      center?: boolean;
      below?: boolean;
      offset?: number;
      orientation?: number | "flip" | "perpendicular";
      attributes?: Record<string, string>;
    }
  }
}
