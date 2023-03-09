import { FormControl, FormErrorMessage, HStack, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import Wrapper from "../components/Wrapper";
import { FieldError, Control } from "react-hook-form";

type ContactForm = {
  name?: string;
  email?: string;
};

type ErrorConfig = {
  type: "required" | "pattern";
  msg: string;
};

type FormItemConfig = {
  errors: FieldError;
  control: Control<ContactForm, any>;
  controlName: keyof ContactForm;
  rules: Omit<
    RegisterOptions<ContactForm, "name">,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  errorDef: ErrorConfig[];
};

type FormElementConfig = {
  controlName: keyof ContactForm;
  placeholder: string;
  onChange: () => void;
  value: string;
};

const FormElement = ({ controlName, placeholder, onChange, value }: FormElementConfig) => {
  switch (controlName) {
    case "name":
    case "email":
      return <Input placeholder={placeholder} onChange={onChange} value={value} />;
    // TODO: topic
    // TODO: message
    // TODO: privacy
    default:
      return <Input value="Element not implemented" disabled />;
  }
};

const FormItem = ({ errors, control, controlName, rules, errorDef }: FormItemConfig) => (
  <FormControl isInvalid={!!errors}>
    <Controller
      control={control}
      name={controlName}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <FormElement
          controlName={controlName}
          placeholder="Name"
          onChange={onChange}
          value={value}
        />
      )}
    />
    {errorDef.map(
      (error: ErrorConfig, index: number) =>
        errors?.type === error.type && <FormErrorMessage key={index}>{error.msg}</FormErrorMessage>
    )}
  </FormControl>
);

const Contact = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    // not doing anything with the data yet, just log it to console.
    console.log("Submitted Data: ", data);

    // TODO: Leave this to me, I'll implement a hook
    // fetch("/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: new URLSearchParams(data).toString(),
    // })
    //   .then(() => console.log("Form successfully submitted"))
    //   .catch((error) => alert(error));
  };

  console.log(errors);

  return (
    <Wrapper title="Contact Us">
      <div className="flex justify-center w-full">
        <form className="w-8/12" name="contact" method="POST" data-netlify="true">
          <VStack spacing={4}>
            <HStack w="full" alignItems="flex-start">
              {/* DONE: Name */}
              <FormItem
                errors={errors.name}
                control={control}
                controlName="name"
                rules={{ required: true, pattern: /^[a-zA-Z ]*$/g }}
                errorDef={[
                  { type: "required", msg: "Name is required" },
                  { type: "pattern", msg: "Name must only contain letters and spaces" },
                ]}
              />

              {/* DONE: Email */}
              <FormItem
                errors={errors.email}
                control={control}
                controlName="email"
                rules={{ required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g }}
                errorDef={[
                  { type: "required", msg: "Email is required" },
                  { type: "pattern", msg: "Email must be valid" },
                ]}
              />
            </HStack>

            {/* TODO: Dropdown select */}
            {/* --- Your code here --- */}

            {/* TODO: Message textarea */}
            {/* --- Your code here --- */}

            {/* TODO: Privacy checkbox */}
            {/* --- Your code here --- */}

            <button
              className="px-4 py-2.5 rounded-md bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-300"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </VStack>
        </form>
      </div>
    </Wrapper>
  );
};

export default Contact;
