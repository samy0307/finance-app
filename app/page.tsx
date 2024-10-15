import MainContentTop from "@/components/mainContentTop/MainContentTop";
import MainContentBottom from "@/components/mainContentBottom/MainContentBottom";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <MainContentTop />
      <MainContentBottom />
    </div>
  );
}
