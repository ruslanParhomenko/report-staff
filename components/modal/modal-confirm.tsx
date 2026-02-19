import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ModalConfirm({
  open,
  setOpen,
  handleConfirm,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            cancel
          </Button>
          <Button onClick={handleConfirm}>confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
