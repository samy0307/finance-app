import React from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import NavbarCenter from "./NavBarCenter";

export default function SandwichMenu() {
  return (
    <div className="sm:hidden">
      <Drawer direction="left">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent className="sm:hidden">
          <NavbarCenter />
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
