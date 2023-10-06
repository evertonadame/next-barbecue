import { tv } from 'tailwind-variants';
import Spin from '../Spin';

const button = tv({
  base: 'button',
  variants: {
    color: {
      primary: 'primary',
      outline: 'outline',
    },
    loading: {
      true: 'loading',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof button.variants.color;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant, children, loading = false, ...props }: ButtonProps) => {
  return (
    <button className={button({ color: variant, loading })} {...props}>
      {children}
      {loading ? <Spin /> : null}
    </button>
  );
};

export default Button;
