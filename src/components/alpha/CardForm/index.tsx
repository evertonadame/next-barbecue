import Button from "@/components/ui/Button";
import InputText from "@/components/ui/Inputs/InputText";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Barbecue } from "@/types/barbecue";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { KeyedMutator } from "swr";

type Inputs = {
  name: string;
  date: string;
  description: string;
  priceDrinkIncluded: string;
  priceDrinkNotIncluded: string;
};

type CreateBarbecueFormProps = {
  closeModal: () => void;
  handleMutate: (newBarbecues: Barbecue[]) => Promise<void>;
};

const BarbecueForm = ({
  closeModal,
  handleMutate,
}: CreateBarbecueFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!userId) return console.error("User not found");

    try {
      setIsLoading(true);
      const barbecue: Omit<Barbecue, "id"> = {
        name: data.name,
        date: new Date(data.date).toISOString(),
        description: data.description,
        amountRaised: 0,
        userId,
        guests: [],
        price: {
          drinkIncluded: Number(data.priceDrinkIncluded),
          drinkNotIncluded: Number(data.priceDrinkNotIncluded),
        } as unknown as Barbecue["price"],
      };

      const response = await fetch("/api/barbecues/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(barbecue),
      });

      const newBarbecue = await response.json();

      closeModal();
      handleMutate([newBarbecue]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="name"
        label="Nome"
        placeholder="Nome do churras"
        {...register("name", {
          required: true,
        })}
        error={errors.name}
      />
      <InputText
        id="date"
        label="Data"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        {...register("date", {
          required: true,
        })}
        error={errors.date}
      />
      <InputText
        id="description"
        label="Descrição"
        placeholder="Informações adicionais ex: Churras de aniversário do João"
        {...register("description")}
        error={errors.description}
      />
      <InputText
        id="price-drink-included"
        label="Valor com bebida inclusa"
        type="tel"
        placeholder="ex: 10"
        {...register("priceDrinkIncluded", {
          required: true,
        })}
        error={errors.priceDrinkIncluded}
      />
      <InputText
        id="price-drink-not-included"
        label="Valor sem bebida inclusa"
        type="tel"
        placeholder="ex: 20"
        {...register("priceDrinkNotIncluded", {
          required: true,
        })}
        error={errors.priceDrinkNotIncluded}
      />

      <Button type="submit" loading={isLoading}>
        Concluir
      </Button>
    </form>
  );
};

export default BarbecueForm;
