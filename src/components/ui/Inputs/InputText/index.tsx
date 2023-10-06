import { type LegacyRef, forwardRef } from 'react';
import { type FieldError } from 'react-hook-form';

type InputTextProps = {
  id: string;
  label: string;
  error?: FieldError;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = forwardRef(
  ({ id, label, error, errorMessage, ...props }: InputTextProps, ref: LegacyRef<HTMLInputElement>) => {
    const errorText = errorMessage?.length ? errorMessage : 'Campo obrigatório.';

    return (
      <div className="input-wrapper">
        {label ? (
          <label htmlFor={id} className="label">
            {label}
          </label>
        ) : null}
        <input ref={ref} id={id} type="text" className="input" {...props} />
        {error ? <span className="error-message">{errorText}</span> : null}
      </div>
    );
  },
);

InputText.displayName = 'InputText';

export default InputText;
