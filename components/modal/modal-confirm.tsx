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

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>

          <Button type="button" onClick={handleConfirm}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
