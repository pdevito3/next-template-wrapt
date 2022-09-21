import { useEffect } from "react";
import { interpret } from "xstate";
import { autosaveMachine } from "./AutosaveMachine";

interface AutosaveProps {
  handleSubmission: any;
  isDirty: boolean;
  isValid?: boolean;
  formFields: any;
  debounceDelayMs?: number;
  isActive?: boolean;
}

// TODO add proper typescript
// TODO build debounce into the machine
// export function useAutosave({
//   handleSubmission,
//   isDirty,
//   isValid = true,
//   formFields,
//   debounceDelayMs = 1500,
//   isActive = true,
// }: AutosaveProps) {
//   const configuredAutosaveMachine = autosaveMachine.withConfig({
//     services: {
//       autosave: () => handleSubmission,
//     },
//   });

//   const [state, send] = useMachine(configuredAutosaveMachine);

//   // const autosaveService = interpret(configuredAutosaveMachine)
//   //   // .onTransition((state) => console.log(state.value))
//   //   .start();

//   useEffect(() => {
//     if (isDirty && isActive)
//       send({
//         type: "CHECK_FOR_CHANGES",
//         query: isDirty,
//       });
//   }, [isActive, isDirty, send]);

//   useEffect(() => {
//     let timeout = setTimeout(() => {});

//     if (isValid && isActive)
//       timeout = setTimeout(() => {
//         send({
//           type: "CHECK_IF_FORM_IS_VALID",
//           query: isValid,
//         });
//       }, debounceDelayMs);

//     return () => clearTimeout(timeout);
//   }, [isValid, formFields, debounceDelayMs, send, isActive]);
// }

// TODO add proper typescript
// TODO build debounce into the machine
export function useAutosave({
  handleSubmission,
  isDirty,
  isValid = true,
  formFields,
  debounceDelayMs = 1500,
  isActive = true,
}: AutosaveProps) {
  const configuredAutosaveMachine = autosaveMachine.withConfig({
    services: {
      autosave: () => handleSubmission,
    },
  });

  // const [state, send] = useMachine(configuredAutosaveMachine);

  const autosaveService = interpret(configuredAutosaveMachine)
    .onTransition((state) => console.log(state.value))
    .start();

  useEffect(() => {
    if (isDirty && isActive)
      autosaveService.send({
        type: "CHECK_FOR_CHANGES",
        query: isDirty,
      });
  }, [isActive, isDirty, autosaveService]);

  useEffect(() => {
    let timeout = setTimeout(() => {});

    if (isValid && isActive)
      timeout = setTimeout(() => {
        autosaveService.send({
          type: "CHECK_IF_FORM_IS_VALID",
          query: isValid,
        });
      }, debounceDelayMs);

    return () => clearTimeout(timeout);
  }, [isValid, formFields, debounceDelayMs, isActive, autosaveService]);
}
