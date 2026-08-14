import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type ModalConfirmProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirm: () => void | Promise<void>;
};

export default function ModalConfirm({
  open,
  setOpen,
  handleConfirm,
}: ModalConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтвердите сохранение</DialogTitle>

          <DialogDescription />
        </DialogHeader>

        <DialogFooter className="flex gap-16">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="bg-red-600 text-white w-30"
          >
            Отмена
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            className="w-30 bg-blue-600 text-white"
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
