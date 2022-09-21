// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.Autosave": {
      type: "done.invoke.Autosave";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Autosave": {
      type: "error.platform.Autosave";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {
    autosave: "done.invoke.Autosave";
  };
  missingImplementations: {
    actions: never;
    services: "autosave";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    cancelSave: "DEBOUNCE_SAVE" | "SAVE" | "xstate.stop";
    saveAfterDelay: "CHECK_IF_FORM_IS_VALID";
  };
  eventsCausingServices: {
    autosave: "RETRY" | "SAVE";
  };
  eventsCausingGuards: {
    isDirty: "CHECK_FOR_CHANGES";
    isValid: "CHECK_IF_FORM_IS_VALID";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "autosaveFailed"
    | "autosaveSuccessful"
    | "autosaving"
    | "cleanForm"
    | "dirtyForm"
    | "invalidForm"
    | "unknown"
    | "validForm";
  tags: never;
}
