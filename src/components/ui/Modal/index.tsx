import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

const Modal = ({ children, isOpen, closeModal }: ModalProps) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="modal-dialog"
          open={isOpen}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="overlay" />
          </Transition.Child>

          <div className="modal-container">
            <div className="transition-wrapper">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-panel">
                  <button
                    type="button"
                    className="absolute top-4 right-4 cursor-pointer w-6 h-6 z-10"
                    onClick={closeModal}
                  >
                    <Image
                      src="/icons/close.svg"
                      alt="w-full h-full"
                      width={30}
                      height={30}
                      className="close-icon"
                    />
                  </button>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
