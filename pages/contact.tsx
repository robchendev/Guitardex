import {
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import Wrapper from "../components/Wrapper";
import { FieldError, Control } from "react-hook-form";

type ContactForm = {
  name?: string;
  email?: string;
  topic?: "" | "Inquiry" | "Tab / Sheet Music" | "Sponsorship" | "Other";
  message?: string;
  privacy?: boolean;
};

type ErrorConfig = {
  type: "required" | "pattern" | "selectedNone";
  msg: string;
};

type FormItemConfig = {
  errors?: FieldError;
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
  value?: string | boolean;
};

const FormElement = ({ controlName, placeholder, onChange, value }: FormElementConfig) => {
  switch (controlName) {
    case "name":
    case "email":
      return <Input placeholder={placeholder} onChange={onChange} />;
    case "topic":
      return (
        <Select placeholder="-- Select Topic --" onChange={onChange}>
          <option value="Inquiry">Inquiry</option>
          <option value="Tab / Sheet Music">Tab / Sheet Music</option>
          <option value="Sponsorship">Sponsorship</option>
          <option value="Other">Other</option>
        </Select>
      );
    case "message":
      return <Textarea placeholder={placeholder} onChange={onChange} value={value as string} />;
    case "privacy":
      return (
        <Checkbox onChange={onChange} isChecked={value as boolean}>
          I agree to the Privacy Policy
        </Checkbox>
      );
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
          placeholder={controlName.slice(0, 1).toUpperCase() + controlName.slice(1)}
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
    formState: { errors, defaultValues },
    getValues,
    reset,
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSending(true);
    console.log("Submitted Data: ", data);
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        topic: data.topic,
        message: data.message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const { error } = await res.json();
    if (error) {
      console.log(error);
      setFailure(true);
      setIsSending(false);
      return;
    }
    setIsSending(false);
    setSuccess(true);
    setFailure(false);
    reset();
  };

  if (Object.keys(errors).length !== 0) {
    console.log("Errors: ", errors);
  }

  return (
    <Wrapper title="Contact Us">
      {!success && (
        <form
          className="flex justify-center w-full"
          name="contact"
          method="POST"
          data-netlify="true"
        >
          <VStack className="w-full lg:w-8/12" spacing={4}>
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

            {/* Done: Topic */}
            <FormItem
              errors={errors.topic}
              control={control}
              controlName="topic"
              rules={{
                validate: { selectedNone: () => getValues("topic") !== defaultValues?.topic },
              }}
              errorDef={[{ type: "selectedNone", msg: "Please select a topic." }]}
            />

            {/* Done: Message textarea */}
            <FormItem
              errors={errors.message}
              control={control}
              controlName="message"
              rules={{ required: true }}
              errorDef={[{ type: "required", msg: "This is required" }]}
            />

            {/* TODO: Privacy checkbox */}
            <FormItem
              errors={errors.privacy}
              control={control}
              controlName="privacy"
              rules={{ required: true }}
              errorDef={[{ type: "required", msg: "This is required" }]}
            />
            <button
              className={`px-4 py-2.5 rounded-md bg-carmine-soft ${
                !isSending && "hover:bg-carmine-hard transition ease-in duration-300"
              }`}
              onClick={handleSubmit(onSubmit)}
              disabled={isSending}
            >
              {isSending ? "Submitting..." : "Submit"}
            </button>
          </VStack>
        </form>
      )}
      {success && <p className="text-gold text-center">Your email has successfully been sent.</p>}
      {failure && (
        <p className="text-carmine-soft text-center mt-4">
          An error blocked the submission. If the error persists, contact us with your message at
          management@eddievdmeer.com
        </p>
      )}
    </Wrapper>
  );
};

export default Contact;
