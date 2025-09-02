import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

/**
 * @param {boolean} on - Whether the modal is currently displayed.
 * @param {string[]} inputs - List of input names to be displayed.
 * @param {(fields: Record<string,string>) => void} handleSubmit - Called with fields on submit.
 * @param {() => void} [onClose] - Close handler (backdrop click, X button, or Escape).
 * @param {string} [title="Form"] - Modal title text.
 */
export default function ModalForm({ on = false, inputs = [], handleSubmit, onClose, title = "Form" }) {
  // Build an object like { username: "", email: "" }
  const buildState = () => Object.fromEntries(inputs.map((n) => [n, ""]));
  const [fields, setFields] = useState(buildState);

  useEffect(() => {
    // Reset fields when inputs change or modal toggles
    setFields(buildState());
    // Handle Escape to close
    function onKey(e) {
      if (e.key === "Escape" && on && onClose) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, on]);

  function submit(e) {
    e.preventDefault();
    handleSubmit(fields);
  }

  if (!on) return null; // detach from DOM when hidden

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="modal-title" className={styles.title}>
          {title}
        </h2>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.inputs}>
            {inputs.map((name) => (
              <div className={styles.input_container} key={name}>
                <label className={styles.label} htmlFor={`input-${name}`}>
                  {name}
                </label>
                <input
                  id={`input-${name}`}
                  className={styles.input}
                  type="text"
                  value={fields[name] ?? ""}
                  onChange={(e) =>
                    setFields((s) => ({ ...s, [name]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>

          <button className={styles.submit_btn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
