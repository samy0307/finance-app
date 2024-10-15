import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import DemoPage from "@/app/transactions/TransactionForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dialoge() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="grid justify-center">
          Push for new Transactions
          <div className="flex justify-center p-10">
            <FontAwesomeIcon icon={faPlus} className="h-8" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center underline">
            Transactions
          </DialogTitle>
          <DialogDescription>
            <DialogClose asChild />
            <DemoPage />
            <DialogClose />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
