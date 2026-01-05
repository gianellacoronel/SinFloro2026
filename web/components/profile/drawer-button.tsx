import { useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function DrawerButton({
  handleClick,
  isWalletLoading,
  isConfirming,
  text,
}: {
  handleClick: () => void;
  isWalletLoading: boolean;
  isConfirming: boolean;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger>
            {text}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>¿Estás segura que quieres {text}?</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={handleClick}
                disabled={isWalletLoading || isConfirming}
              >
                Aceptar
              </Button>
              <DrawerClose>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:block">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>{text}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>¿Estás segura que quieres {text}?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleClick}
                disabled={isWalletLoading || isConfirming}
              >
                Aceptar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
