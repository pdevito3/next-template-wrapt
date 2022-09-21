import React from "react";

export function useAutofocus(): (node: any) => void {
  const autofocusRef = React.useCallback((node: any) => {
    if (node !== null) {
      node?.focus();
    }
  }, []);
  return autofocusRef;
}
