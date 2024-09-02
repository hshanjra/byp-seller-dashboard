import { useState } from "react";
import { motion } from "framer-motion";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OnboardingFormData,
  OnboardingSchema,
} from "@/validators/onboarding-validator";
import { CircleCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Form, FormControl } from "../ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/constants/form";
import {
  AccountTypeOptions,
  OnboardingFormDefaultValues,
  US_STATES,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import { Separator } from "../ui/separator";
import FileUploader from "../FileUploader";
import { cn } from "@/lib/utils";

type Inputs = OnboardingFormData;
const steps = [
  {
    id: "Step 1",
    name: "Seller Account Creation",
    fields: [],
  },

  {
    id: "Step 2",
    name: "Business Information",
    fields: [
      "firstName",
      "lastName",
      "email",
      "dateOfBirth",
      "ssn",
      "businessName",
      "ein",
      "businessEmail",
      "businessPhone",
      "businessLicense",
      "businessLicenseExp",
      "street",
      "city",
      "state",
      "zip",
      "country",
      "identityDocs",
    ],
  },
  {
    id: "Step 3",
    name: "Store Setup",
    fields: ["displayName", "about", "returnPolicy", "shippingPolicy"],
  },

  { id: "Step 4", name: "Bank Details", fields: [] },
];

function OnboardingForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const delta = currentStep - previousStep;

  const form = useForm<Inputs>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: OnboardingFormDefaultValues,
  });

  // Form elements
  // const errors = form.formState.errors;
  const accountType = form.watch("accountType");

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    form.reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="flex flex-col justify-between bg-white">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full gap-2 border-l-4 items-center text-sky-600 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  {/* <span className="text-sm font-medium text-sky-600 transition-colors">
                    {step.id}
                  </span> */}
                  <CircleCheck />
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div className="group flex w-full gap-2 border-l-4 items-center text-sky-600 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  {/* <span className="text-sm font-medium text-sky-600 transition-colors">
                    {step.id}
                  </span> */}
                  {/* <input type="radio" defaultChecked className=" h-5 w-5" /> */}
                  <RadioGroup>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="default"
                        checked
                        className="text-sky-600 border-sky-600 h-5 w-5"
                      />
                      <span>{step.name}</span>
                    </div>
                  </RadioGroup>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  {/* <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span> */}
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {/* <Separator className="mt-5" /> */}

      {/* Form */}
      <Form {...form}>
        <form className="mt-8 py-8" onSubmit={form.handleSubmit(processForm)}>
          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center flex-col gap-2 bg-slate-50 mb-3 border max-w-md mx-auto py-3 px-3 rounded-xl">
                <h3 className="text-md capitalize tracking-wide font-semibold">
                  Select An Account Type
                </h3>
                <CustomFormField
                  control={form.control}
                  name="accountType"
                  fieldType={FormFieldType.SKELETON}
                  renderSkeleton={(field) => (
                    <FormControl>
                      <RadioGroup
                        className="flex gap-6 items-center justify-center"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {AccountTypeOptions.map((option) => (
                          <div key={option} className="flex items-center gap-2">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </div>

              {accountType === "BUSINESS" && (
                <h3 className="text-base font-semibold leading-7 text-gray-900 text-center">
                  Continue to register as a business, or if you plan to sell a
                  large number of goods.
                </h3>
              )}

              <Separator className="my-5 opacity-30" />

              <h2 className="text-base font-semibold leading-7 text-gray-900">
                1. {accountType === "INDIVIDUAL" ? "Personal" : "Business"}{" "}
                Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide your{" "}
                {accountType === "INDIVIDUAL" ? "personal" : "business"}{" "}
                details.
              </p>

              {/* Individual */}
              {accountType === "INDIVIDUAL" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="ssn"
                        label="Social Security Number (SSN)*"
                        placeholder="AAA-GG-SSSS"
                        maxLength={9}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        placeholder="Select Date"
                      />
                    </div>

                    <div className="sm:col-span-3"></div>
                  </div>
                </motion.div>
              )}

              {/* Business */}
              {accountType === "BUSINESS" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Business Name/EIN */}
                    <div className="col-span-full">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="businessName"
                        label="Legal Business Name*"
                        placeholder="Your Legal Business Name"
                      />
                    </div>

                    {/* Business License */}
                    <div className="sm:col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="businessLicense"
                        label="Business License Number (optional)"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name="businessLicenseExp"
                        label="Business License Expiration Date (optional)"
                      />
                    </div>

                    {/* EIN */}
                    <div className="col-span-full">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="ein"
                        label="Employer Identification Number (EIN)*"
                        placeholder="12-3456789"
                        maxLength={9}
                        inputMode="numeric"
                      />
                    </div>

                    {/* Business Email and Phone Number */}
                    <div className="sm:col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.EMAIL_INPUT}
                        control={form.control}
                        name="businessEmail"
                        label="Business Email*"
                        placeholder="Enter business email"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="businessPhone"
                        label="Business Phone*"
                        placeholder="Enter business phone"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <Separator className="my-10 opacity-30" />

              {/* Identity Docs */}
              <div className="col-span-full">
                <h2
                  className={cn(
                    "text-base font-semibold leading-7 text-gray-900"
                  )}
                >
                  2. Identification & verification*
                </h2>
                <p className="text-sm my-2">
                  Please upload scanned copy of your <b>identification</b> or{" "}
                  <b>business</b> documents (USA Passport, Driver's License,
                  Photo ID etc.) Max 3 files.
                </p>
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SKELETON}
                  name="identityDocs"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <FileUploader
                        onChange={field.onChange}
                        files={field.value}
                        options={{
                          maxFiles: 3,
                          accept: {
                            "image/png": [".png"],
                            "image/jpeg": [".jpeg", ".jpg"],
                          },
                        }}
                      />
                    </FormControl>
                  )}
                />
              </div>

              <Separator className="my-10 opacity-30" />
              {/* Address fields */}
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  3. Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="country"
                      label="Country*"
                      disabled={true}
                    >
                      <SelectItem value="United States">
                        <p>United States</p>
                      </SelectItem>
                    </CustomFormField>
                  </div>

                  <div className="col-span-full">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="street"
                      label="Street address*"
                    />
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="city"
                      label="City*"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="state"
                      label="State*"
                      placeholder="Select a state"
                    >
                      {US_STATES.map((state, i) => (
                        <SelectItem key={i} value={state.value}>
                          <p>{state.name}</p>
                        </SelectItem>
                      ))}
                    </CustomFormField>
                  </div>

                  <div className="sm:col-span-2">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="zip"
                      label="ZIP / Postal code*"
                      inputMode="numeric"
                      placeholder="Your ZIP / Postal code"
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Store Setup
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please provide information about your store.
              </p>

              {/* TODO: add debounce and check unique store name, if store is exists show error */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="displayName"
                    label="Store Name*"
                    placeholder="XYZ Parts"
                  />
                </div>

                <div className="col-span-full">
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="about"
                    label="Enter about your store (This will visible on your store page)"
                    placeholder="We sell only genuine products"
                  />
                </div>

                <div className="col-span-full">
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="shippingPolicy"
                    label="Define your shipping policy terms"
                    placeholder=""
                  />
                </div>

                <div className="col-span-full">
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="returnPolicy"
                    label="Define your return policy terms"
                    placeholder=""
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>
            </>
          )}
        </form>
      </Form>

      {/* Navigation */}
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default OnboardingForm;
