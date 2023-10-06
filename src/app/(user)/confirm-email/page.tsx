"use client";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/Inputs/InputText";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  code: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ code }) => {
    if (!isLoaded) return;

    try {
      setIsLoading(true);

      const completedSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });

      await setActive({
        session: completedSignUp.createdSessionId,
      });

      router.push("/");
    } catch (err: any) {
      setError(err?.errors[0]?.message ?? "Erro ao fazer seu cadastro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="code"
        label="Código de verificação"
        placeholder="Código de verificação ex: 123456"
        {...register("code", {
          required: true,
        })}
        error={errors.code}
      />
      {error && <p className="form-error">{error}</p>}
      <div className="buttons-wrapper">
        <Button type="submit" loading={isLoading}>
          Confirmar
        </Button>
        <p className="alternative-link">
          Já possui uma conta?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:text-blue-600">
            Faça login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
