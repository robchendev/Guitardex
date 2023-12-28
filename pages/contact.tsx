import {
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  Textarea,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import Wrapper from "../components/Wrapper";
import { FieldError, Control } from "react-hook-form";
import Link from "next/link";
import { Library } from "../types/dynamic/common";
import { useRouter } from "next/router";

type Topic = "" | "General Inquiry" | "Content Request" | "Report Issue" | "Other";

type ContactForm = {
  name?: string;
  email?: string;
  topic?: Topic;
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
  register: (name: string, RegisterOptions?) => { onChange; onBlur; name; ref };
  title?: string;
};

type FormElementConfig = {
  controlName: keyof ContactForm;
  placeholder: string;
  onChange: () => void;
  value?: string | boolean;
};

const FormElement = ({ controlName, placeholder, onChange, value }: FormElementConfig) => {
  // console.log(controlName, value);
  switch (controlName) {
    case "name":
    case "email":
      return <Input placeholder={placeholder} onChange={onChange} />;
    case "topic":
      return (
        <Select placeholder="-- Select Topic --" onChange={onChange} value={value as string}>
          <option value="General Inquiry">Inquiry</option>
          <option value="Content Request">Content Request</option>
          <option value="Report Issue">Report Issue</option>
          <option value="Other">Other</option>
        </Select>
      );
    case "subject":
      return <Input placeholder={placeholder} onChange={onChange} value={value as string} />;
    case "category":
      return (
        <Select
          placeholder="-- Select Module Library --"
          onChange={onChange}
          value={value as string}
        >
          <option value="t">Techniques</option>
          <option value="a">Audio Production</option>
        </Select>
      );
    case "id":
      return (
        <Input placeholder="Module ID" type="number" onChange={onChange} value={value as string} />
      );
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

const FormItem = ({
  errors,
  control,
  controlName,
  rules,
  errorDef,
  register,
  title,
}: FormItemConfig) => (
  <FormControl isInvalid={!!errors}>
    <Controller
      control={control}
      rules={rules}
      {...register(controlName)}
      name={controlName}
      render={({ field: { onChange, value } }) => (
        <>
          {title && <span>{title}</span>}
          <FormElement
            controlName={controlName}
            placeholder={controlName.slice(0, 1).toUpperCase() + controlName.slice(1)}
            onChange={onChange}
            value={value}
          />
        </>
      )}
    />
    {errorDef.map(
      (error: ErrorConfig, index: number) =>
        errors?.type === error.type && <FormErrorMessage key={index}>{error.msg}</FormErrorMessage>
    )}
  </FormControl>
);

//  /?name_t=x.x.x&a=y.y.y
const decode = (encodedStr: string): ContactOptions => {
  const result: ContactOptions = {
    topic: "",
    subject: "",
    library: "",
    id: "",
  };
  let decodedArr: string[] = [];
  decodedArr = encodedStr.split("&");
  // console.log(decodedArr);
  for (const decoded of decodedArr) {
    const values = decoded.split("=");
    if (values.length === 2) {
      const control = values[0];
      const spacedString = values[1].replaceAll("_", " ");
      // console.log(control, spacedString);
      switch (control) {
        case "t":
          if (
            spacedString === "General Inquiry" ||
            spacedString === "Content Request" ||
            spacedString === "Report Issue" ||
            spacedString === "Other"
          )
            result.topic = spacedString;
          break;
        case "s":
          result.subject = spacedString;
          break;
        case "l":
          if (spacedString === "t" || spacedString === "a") {
            result.library = spacedString;
          }
          break;
        case "id":
          result.id = spacedString;
          break;
      }
    } else {
      console.error("query parameter is wrong format, should be x=y");
    }
  }
  // if (decodedArr.length > 2) {
  //   throw Error("There can only be 1 underscore in the URL");
  // } else if (decodedArr.length === 2) {
  //   result = createInitialGuitardex(decodeName(decodedArr[0]));
  //   decodeAll(decodedArr[1], result);
  // } else if (decodedArr.length === 1) {
  //   if (hasName) {
  //     result = createInitialGuitardex(decodeName(decodedArr[0]));
  //   } else {
  //     result = createInitialGuitardex("");
  //     decodeAll(decodedArr[0], result);
  //   }
  // } else {
  //   result = createInitialGuitardex("");
  // }
  return result;
};

type ContactOptions = {
  topic: Topic;
  subject: string;
  library: Library | "";
  id: string;
};

const Contact = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, defaultValues },
    getValues,
    setValue,
    reset,
    watch,
    register,
  } = useForm<ContactForm>({
    defaultValues: {
      email: "",
      topic: "",
      message: "",
    },
  });
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const router = useRouter();
  const location = router.pathname;

  const importOptions = (options: ContactOptions) => {
    try {
      const importStr = window.location.search.replace("?", "");
      router.replace(location);
      options = decode(importStr);
    } catch (error) {
      console.error("ran into an issue trying to import contact options");
    }
    return options;
  };

  useEffect(() => {
    let options: ContactOptions = {
      topic: "",
      subject: "",
      library: "",
      id: "",
    };
    if (window.location.search.includes("?")) {
      options = importOptions(options);
    }
    if (options) {
      if (options.topic) {
        setValue("topic", options.topic);
      }
      if (options.subject) {
        setValue("subject", options.subject);
      }
      if (options.library) {
        setValue("category", options.library);
      }
      if (options.id) {
        setValue("id", options.id);
      }
    }
  }, []);

  const onSubmit = async (data: ContactForm) => {
    setIsSending(true);
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: data.email,
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

  const resetFormState = () => {
    setIsSending(false);
    setSuccess(false);
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
          <VStack className="w-full lg:w-8/12" spacing={2}>
            {/* DONE: Name */}
            {/* <FormItem
              errors={errors.name}
              control={control}
              register={register}
              title="Name"
              controlName="name"
              rules={{ required: true, pattern: /^[a-zA-Z ]*$/g }}
              errorDef={[
                { type: "required", msg: "Name is required" },
                { type: "pattern", msg: "Name must only contain letters and spaces" },
              ]}
            /> */}

            {/* DONE: Email */}
            <FormItem
              errors={errors.email}
              control={control}
              register={register}
              title="Email"
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
              register={register}
              title="Topic"
              controlName="topic"
              rules={{
                validate: { selectedNone: () => getValues("topic") !== defaultValues?.topic },
              }}
              errorDef={[{ type: "selectedNone", msg: "Please select a topic." }]}
            />

            {/* Done: Subject */}
            {watchTopic !== "Report Issue" && watchTopic !== "Content Request" && (
              <FormItem
                errors={errors.subject}
                control={control}
                register={register}
                title="Subject"
                controlName="subject"
                rules={{ required: true }}
                errorDef={[{ type: "required", msg: "Subject is required." }]}
              />
            )}

            {/* Done: Category (appears if Topic is "Report Issue" */}
            {(watchTopic === "Report Issue" || watchTopic === "Content Request") && (
              <FormItem
                errors={errors.category}
                control={control}
                register={register}
                title="Module Library"
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
                register={register}
                title="Module ID"
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
              register={register}
              title="Message"
              controlName="message"
              rules={{ required: true }}
              errorDef={[{ type: "required", msg: "Message is required" }]}
            />

            {/* Done: Privacy checkbox */}
            {/* <FormItem
              errors={errors.privacy}
              control={control}
              register={register}
              controlName="privacy"
              rules={{ required: true }}
              errorDef={[{ type: "required", msg: "This is required" }]}
            /> */}
            <Button
              className={`px-4 py-2.5 rounded-md bg-carmine-soft bg-purple ${
                !isSending && "hover:bg-carmine-hard transition ease-in duration-300"
              }`}
              onClick={handleSubmit(onSubmit)}
              disabled={isSending}
            >
              {isSending ? "Submitting..." : "Submit"}
            </Button>
          </VStack>
        </form>
      )}
      {success && (
        <div className="flex items-center flex-col">
          <p className="text-gold text-center mb-4">Your email has successfully been sent.</p>

          <Button
            className={"px-4 py-2.5 rounded-md bg-carmine-soft bg-purple"}
            onClick={() => resetFormState()}
            disabled={isSending}
          >
            Send a new form
          </Button>
        </div>
      )}
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
