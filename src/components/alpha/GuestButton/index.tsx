import Button from "@/components/ui/Button";
import InputText from "@/components/ui/Inputs/InputText";
import { useState } from "react";
import { useForm, type SubmitHandler, set } from "react-hook-form";
import type { Barbecue, GuestModel } from "@/types/barbecue";
import priceFormatter from "@/utils/priceFormatter";
import Modal from "@/components/ui/Modal";
import Checkbox from "@/components/ui/Inputs/Checkbox";

type Inputs = {
  name: string;
};

type AddGuestProps = {
  price: Barbecue["price"];
  barbecueId: string;
  guests: GuestModel[];
  setGuests: (newGuest: GuestModel) => void;
};

const AddGuest = ({ price, barbecueId, guests, setGuests }: AddGuestProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { drinkIncluded, drinkNotIncluded } = price;

  const priceOptions = [
    {
      value: price.drinkNotIncluded,
      name: `${priceFormatter.format(drinkNotIncluded)} (sem bebidas inclusas)`,
    },
    {
      value: price.drinkIncluded,
      name: `${priceFormatter.format(drinkIncluded)} (com bebidas inclusas)`,
    },
  ];

  const [selected, setSelected] = useState(priceOptions[0]);

  const onSubmit: SubmitHandler<Inputs> = async (fields) => {
    try {
      setIsLoading(true);
      const newGuest: GuestModel = {
        id: `${guests.length + 1}`,
        name: fields.name,
        contribution: selected.value,
        paid: false,
      };

      const data: Pick<Barbecue, "guests"> = {
        guests: [...guests, newGuest],
      };

      await fetch(`/api/barbecues/${barbecueId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      setOpenModal(false);
      reset();
      setGuests(newGuest);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-5 w-full">
        <Button onClick={() => setOpenModal(true)}>Adicionar convidado</Button>
      </div>
      <Modal isOpen={openModal} closeModal={() => setOpenModal(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            id="name"
            label="Nome"
            placeholder="Pedro"
            {...register("name", {
              required: true,
            })}
            error={errors.name}
          />
          <div>
            <span className="text-lg font-bold">Contribuição</span>
            {priceOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-4 mt-5">
                <Checkbox
                  id={option.name}
                  name={option.name}
                  checked={selected.value === option.value}
                  onChange={() => setSelected(option)}
                />
                <label htmlFor={option.name}>
                  <span className="text-sm">{option.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading}>
              Adicionar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddGuest;
