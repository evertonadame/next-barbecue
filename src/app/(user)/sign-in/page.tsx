"use client";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/Inputs/InputText";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const AuthUser = () => {
  const [error, setError] = useState<string | null>(null);
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (!isLoaded) return;
    setIsLoading(true);

    try {
      const completedSignIn = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({
        session: completedSignIn.createdSessionId,
      });

      router.push("/");
    } catch (err: any) {
      setError(err?.errors[0]?.message ?? "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="email"
        label="Email"
        placeholder="e-mail"
        {...register("email", {
          required: true,
        })}
        error={errors.email}
      />
      <InputText
        {...register("password", {
          required: true,
        })}
        id="password"
        label="Senha"
        placeholder="senha"
        type="password"
        error={errors.password}
      />
      {error && <p className="form-error">{error}</p>}
      <div className="buttons-wrapper">
        <Button type="submit" loading={isLoading}>
          Entrar
        </Button>
        <p className="alternative-link">
          Não possui uma conta?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:text-blue-700">
            Cadastre-se
          </Link>
        </p>
      </div>
    </form>
  );
};

export default AuthUser;
