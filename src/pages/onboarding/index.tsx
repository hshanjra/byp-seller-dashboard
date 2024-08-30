import OnboardingForm from "@/components/forms/OnboardingForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";

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

      {/* TODO:Make multi-step form */}
      <div>
        {/* <h3 className="text-xl font-semibold">
          Let's get started. Which of these best describes you?
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          We'll help you get set up based on your business needs.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mt-5">
          <Button className="w-full rounded-xl" variant={"outline"}>
            I'm just starting
          </Button>
          <Button className="w-full rounded-xl" variant={"outline"}>
            I'm already selling on other platforms
          </Button>
        </div> */}

        {/* Next/Prev */}

        {/* <div className="flex items-center justify-between mt-10">
          <Button
            variant={"ghost"}
            size={"sm"}
            className="flex items-center gap-4"
          >
            <ChevronLeft />
            Back
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="flex items-center gap-4"
          >
            Next
            <ChevronRight />
          </Button>
        </div> */}
      </div>
    </section>
  );
}

export default OnboardingPage;
