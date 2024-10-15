import { ModeToggle } from "../darkLightTheme/themeToggle";

export default function NavbarRight() {
  return (
    <div className="hidden sm:flex sm:justify-end">
      <ModeToggle />
    </div>
  );
}
