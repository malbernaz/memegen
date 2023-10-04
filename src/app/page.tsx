import { Designer } from "@/components/Designer";
import { DesignerProvider } from "@/stores/designer";

export default function Home() {
  return (
    <DesignerProvider>
      <Designer />
    </DesignerProvider>
  );
}
