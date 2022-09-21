import { FieldNamesMarkedBoolean, FieldValues } from "react-hook-form";

export function getSimpleDirtyFields(
  dirtyFields: FieldNamesMarkedBoolean<FieldValues>
) {
  return !!Object.keys(dirtyFields).length;
}
