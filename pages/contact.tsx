import {
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Select,
  VStack,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
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
  value: string | boolean;
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
      return <Textarea placeholder={placeholder} onChange={onChange} value={value} />;
    case "privacy":
      return (
        <Checkbox onChange={onChange} value={value}>
          I agree to the Privacy Policy
        </Checkbox>
      );
    default:
      return <Input value="Element not implemented" disabled />;
  }
  // TODO: privacy
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
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Submitted Data: ", data);
  };

  if (Object.keys(errors).length !== 0) {
    console.log("Errors: ", errors);
  }

  return (
    <Wrapper title="Contact Us">
      <form className="flex justify-center w-full" name="contact" method="POST" data-netlify="true">
        <VStack className="w-8/12" spacing={4}>
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

          {/* Done: Topic */}
          <FormItem
            errors={errors.topic}
            control={control}
            controlName="topic"
            rules={{
              validate: { selectedNone: () => getValues("topic") !== defaultValues.topic },
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
            className="px-4 py-2.5 rounded-md bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-300"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </VStack>
      </form>
    </Wrapper>
  );
};

export default Contact;
