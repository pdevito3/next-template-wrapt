import { actions, createMachine, send } from "xstate";

export const autosaveMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXA9rAhgNzADpUA7AaxMwHcSBiAYQAkBRegaQH0AxAeQCUOTZADkA4swDKiUAAdsAS3TzMJaSAAeiAIwBmAOx7CABgCsADnNa9+s1oAsdgDQgAnoju7CANjtm7AJjMvHVNgrz0AXwjnNCxcAkIANRwAG3kIAAIuTAAnAFtaCWRE5jU5WEVlVSQNRB0TO0IDHS8TI38ATjb-LSM9ZzcEOyMjbx1Ajv8dHUm-fzsomIxsfCJktMzs-NoAEWYAIR4AVWF6Zg4ikrKFJRU1TQQdX0IzJ70urT9JrS0BxHMTC89CYOqCTFpgvZFiBYisEgBJEh4VLpLK5ArXCq3aqgB4-Ow6QhdHQ-IL+EwmHSvP5Dd5EqbvLx+Lz+axmaGw+JETn4eQkKC0CAqIh8vCYMjc5ZczGVO41B4GQENCGQvSBIx+GkeLRE+rgvReLT+Ux2YEcqWrQg8vB8gVgHI5XKEGQpHDoABm6KtFoIMux90QisIyq8qvVmtcdXBhB+Wg+5nqVI6C2iMJ9kriqyyOHkKUgtD4zAAKnwAJp+qoBhBmIwdGMNLojDpMrpOSMIck6g0hTrgjx9SKp60ZuFgDKwVAAY0ncFg7tQKVoFbluO09kJxNJLIpVJ0Wp+uopVkNxoaZqH6cIO3kOXQLjR2yYrE48K43H4AFkOPCJBxEsgABl4R2ZccVqBBdAMYwAVsaw9FsBwaTMOsOjMMxWUmJ4eg6dpzUzBJ6DzHASAfDEanKWUwLxQIdR8CwVRBIwvCMPd2y8DpDHmZMplQuwTDgqJU0oCA4DUYdiHISgaFAqsjXMF5-E6DVbHCT4vC1diY0UqlOiCPQRnZC98LWFFNnRGT5XcfwaXBFCqXeWxk2Ygw8NHQhEWRDZSIs1cEFQrxvA44Y-CY5jPhpT5DA+Gt4K0SkCQ6HRXK5b18NtHzwNNMxCGGFkqVaDpPhadT23qRpk2ZMw9CNH4fGSy1h2zXNIAyvFdDrCEQjQlpG0UmlplGNTJkmAIwS0eqEkaidp1necUlaxBkMBNVGQpGssN+dtwVon5UL0XwjF8PwJqIa9b3vLY8gWiDgn8YNUOTew2hBCkNJ1LoDXY+Daw4rwTsIQiwGI7zyJuStLIg8EAsCfj6l2z55iQlimmNUwenY41dBO67wvbKwiVBB6oYhZM+kEiIgA */
  createMachine(
    {
      tsTypes: {} as import("./AutosaveMachine.typegen").Typegen0,
      // schema: {
      //   context: {} as {},
      //   events: {} as {},
      // },
      predictableActionArguments: true,
      id: "Autosave Machine",
      initial: "unknown",
      states: {
        unknown: {
          on: {
            CHECK_FOR_CHANGES: [
              {
                cond: "isDirty",
                target: "dirtyForm",
              },
              {
                target: "cleanForm",
              },
            ],
          },
        },
        validForm: {
          entry: "saveAfterDelay",
          exit: "cancelSave",
          on: {
            SAVE: {
              target: "autosaving",
            },
            DEBOUNCE_SAVE: {
              actions: "cancelSave",
              target: "unknown",
            },
          },
        },
        invalidForm: {
          always: {
            target: "unknown",
          },
        },
        autosaving: {
          invoke: {
            id: "Autosave",
            src: "autosave",
            onDone: [
              {
                target: "autosaveSuccessful",
              },
            ],
            onError: [
              {
                target: "autosaveFailed",
              },
            ],
          },
        },
        autosaveFailed: {
          on: {
            RETRY: {
              target: "autosaving",
            },
          },
        },
        autosaveSuccessful: {
          always: {
            target: "unknown",
          },
        },
        dirtyForm: {
          on: {
            CHECK_IF_FORM_IS_VALID: [
              {
                cond: "isValid",
                target: "validForm",
              },
              {
                target: "invalidForm",
              },
            ],
          },
        },
        cleanForm: {
          always: {
            target: "unknown",
          },
        },
      },
    },
    {
      services: {
        // autosave: () => alert("autosaving!"),
      },
      guards: {
        isDirty: (context, event) => Boolean(event.query),
        isValid: (context, event) => Boolean(event.query),
      },
      actions: {
        cancelSave: actions.cancel("saveDelay"),
        saveAfterDelay: send({ type: "SAVE" }, { delay: 0, id: "saveDelay" }),
      },
    }
  );
