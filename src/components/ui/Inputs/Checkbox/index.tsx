import { type InputHTMLAttributes } from 'react';

type CheckboxProps = {
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ id, ...props }: CheckboxProps) => {
  return <input id={id} type="checkbox" className="checkbox" {...props} />;
};

export default Checkbox;
