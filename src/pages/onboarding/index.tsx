import OnboardingForm from "@/components/forms/OnboardingForm";
import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";

function OnboardingPage() {
  return (
    <section className="bg-white px-7 py-5 shadow-2xl rounded-xl w-full max-w-md md:max-w-7xl mt-5 overflow-hidden">
      {/* Title */}
      <div className="mb-3 flex items-center gap-x-3 justify-center">
        <Store size={25} />
        <h1 className="text-xl font-bold">Setup Seller Account</h1>
      </div>

      <Separator className="mb-3" />
      <OnboardingForm />
    </section>
  );
}

export default OnboardingPage;
