NextComponentType;
import "next/types";

declare module "next/types" {
  interface NextComponentType {
    isPublic: boolean;
  }
  interface NextPage {
    isPublic: boolean;
  }
}
