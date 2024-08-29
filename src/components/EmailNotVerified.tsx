import { Info } from "lucide-react";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

function EmailNotVerified() {
  return (
    <MaxWidthWrapper className="mt-20">
      <section className="flex flex-col md:flex-row items-center justify-center border rounded-xl bg-destructive/5 border-destructive p-4 gap-2">
        <Info size={20} className="text-destructive" />
        <p className="text-destructive font-semibold text-base tracking-wide">
          Your email is not verified. Please check your email for verification
          link. Did not received a verification email?{" "}
        </p>
        <Button
          variant={"link"}
          size={"sm"}
          className="rounded-xl text-primary"
        >
          Resend email{" "}
        </Button>
      </section>
    </MaxWidthWrapper>
  );
}

export default EmailNotVerified;
