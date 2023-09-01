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
import Link from "next/link";

type ContactForm = {
  name?: string;
  email?: string;
  topic?: "" | "General Inquiry" | "Content Request" | "Report Issue" | "Other";
  subject?: string;
  category?: string;
  id?: string;
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
          <option value="General Inquiry">Inquiry</option>
          <option value="Content Request">Content Request</option>
          <option value="Report Issue">Report Issue</option>
          <option value="Other">Other</option>
        </Select>
      );
    case "subject":
      return <Input placeholder={placeholder} onChange={onChange} />;
    case "category":
      return (
        <Select placeholder="-- Select Module Library --" onChange={onChange}>
          <option value="Techniques">Techniques</option>
          <option value="Audio Production">Audio Production</option>
        </Select>
      );
    case "id":
      return <Input placeholder="Module ID" type="number" onChange={onChange} />;
    case "message":
      return (
        <Textarea h={36} placeholder={placeholder} onChange={onChange} value={value as string} />
      );
    case "privacy":
      return (
        <Checkbox onChange={onChange} isChecked={value as boolean}>
          I agree to the{" "}
          <Link href="/privacy-policy" className="text-gold">
            Privacy Policy
          </Link>
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

// //  /?name_t=x.x.x&a=y.y.y
// const decode = (encodedStr: string): Guitardex => {
//   let result: Guitardex;
//   let decodedArr: string[] = [];
//   let hasName = false;
//   if (encodedStr.includes("_")) {
//     hasName = true;
//   }
//   decodedArr = encodedStr.split("_");
//   if (decodedArr.length > 2) {
//     throw Error("There can only be 1 underscore in the URL");
//   } else if (decodedArr.length === 2) {
//     result = createInitialGuitardex(decodeName(decodedArr[0]));
//     decodeAll(decodedArr[1], result);
//   } else if (decodedArr.length === 1) {
//     if (hasName) {
//       result = createInitialGuitardex(decodeName(decodedArr[0]));
//     } else {
//       result = createInitialGuitardex("");
//       decodeAll(decodedArr[0], result);
//     }
//   } else {
//     result = createInitialGuitardex("");
//   }
//   return result;
// };

const Contact = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, defaultValues },
    getValues,
    reset,
    watch,
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

  // const router = useRouter();
  // const location = router.pathname;
  // // console.log(router.query);
  // let hasUrl = false;
  // const importSave = (guitardex: Guitardex): Guitardex => {
  //   try {
  //     const importStr = window.location.search.replace("?", "");
  //     router.replace(location);
  //     guitardex = decode(importStr);
  //     for (const key of libraries as unknown as Library[]) {
  //       if (hasDupes(guitardex[key])) {
  //         throw new Error("Save has duplicate ID");
  //       }
  //     }
  //     hasUrl = true;
  //   } catch (error) {
  //     alert("Invalid save profile detected. Save will not be loaded.\n" + error);
  //   }
  //   return guitardex;
  // };

  const onSubmit = async (data: ContactForm) => {
    setIsSending(true);
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        topic: data.topic,
        subject: data.subject,
        category: data.category,
        id: data.id,
        message: data.message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const { error } = await res.json();
    if (error) {
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

  const watchTopic = watch("topic");

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

            {/* Done: Subject */}
            <FormItem
              errors={errors.subject}
              control={control}
              controlName="subject"
              rules={{ required: true }}
              errorDef={[{ type: "required", msg: "Subject is required." }]}
            />

            {/* Done: Category (appears if Topic is "Report Issue" */}
            {watchTopic === "Report Issue" && (
              <FormItem
                errors={errors.category}
                control={control}
                controlName="category"
                rules={{ required: true }}
                errorDef={[{ type: "required", msg: "Library is required." }]}
              />
            )}

            {/* Done: ID (appears if Topic is "Report Issue" */}
            {watchTopic === "Report Issue" && (
              <FormItem
                errors={errors.id}
                control={control}
                controlName="id"
                rules={{ required: true }}
                errorDef={[
                  { type: "required", msg: "Module ID is required. (eg. /t/12 ID is 12)" },
                ]}
              />
            )}

            {/* Done: Message textarea */}
            <FormItem
              errors={errors.message}
              control={control}
              controlName="message"
              rules={{ required: true }}
              errorDef={[{ type: "required", msg: "Message is required" }]}
            />

            {/* Done: Privacy checkbox */}
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
