import {
  createTsForm,
  createUniqueFieldSchema,
  useDescription,
  useTsController,
} from "@ts-react/form";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AddressFields, { AddressSchema } from "./AddressForm";
import { getUsers } from "./api";

type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const TextField = ({ type = "string" }: { type?: string }) => {
  const { field, error } = useTsController<string>();
  const { label } = useDescription();
  return (
    <>
      <label> {label} </label>
      <input
        style={{
          padding: 10,
          margin: 20,
        }}
        type={type}
        value={field.value}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      />
      {error?.errorMessage && (
        <span style={{ color: "red" }}>{error?.errorMessage}</span>
      )}
      <br />
    </>
  );
};

export const Dropdown = ({ enumValues }: { enumValues: string[] }) => {
  const { field, error } = useTsController<string>();
  const { label, placeholder } = useDescription();
  const id = useId();
  return (
    <>
      <label> {label} </label>
      <br />
      <select
        style={{
          margin: 20,
          width: 200,
        }}
        value={field.value ? field.value : "none"}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      >
        {!field.value && <option value="none">{placeholder}</option>}
        {enumValues.map((e, i) => (
          <option key={id + "-" + i} value={e}>
            {e}
          </option>
        ))}
      </select>
      <span>{error?.errorMessage && error.errorMessage}</span>
      <br />
    </>
  );
};

const ProtectedTextField = () => {
  return <TextField type="password" />;
};

const ProtectedTextFieldSchema = createUniqueFieldSchema(
  z.string().describe("Password").nonempty("Password cannot be empty"),
  "protectedField"
);

const mapping = [
  [z.string(), TextField] as const,
  [ProtectedTextFieldSchema, ProtectedTextField] as const,
  [AddressSchema, AddressFields] as const,
  [z.enum(["values"]), Dropdown] as const,
] as const;

export const BaseForm = createTsForm(mapping);

// const UserSignupSchema = (users: string[]) =>
//   z.object({
//     users: z
//       .enum([users[0] || "No users", ...users.slice(1)])
//       .describe("Users // Select a user"),
//     email: z
//       .string({
//         required_error: "Email is required",
//       })
//       .email("please enter an email")
//       .describe("Email // your email.."),
//     password: ProtectedTextFieldSchema,
//     address: AddressSchema,
//   });

const SignupSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("please enter an email")
    .describe("Email // your email.."),
  // password: ProtectedTextFieldSchema,
  // address: AddressSchema,
});

export const TestForm = () => {
  // const [users, setUsers] = useState<string[] | null>(null);

  const form = useForm<z.infer<typeof SignupSchema>>();

  const watchUsers = form.watch("email");
  console.log(watchUsers)

  const handleSubmit = (values: z.infer<typeof SignupSchema>) => {};
  // useEffect(() => {
  //   async function callAPI() {
  //     const users: Array<UserType> = await getUsers();
  //     setUsers(users.map((user) => user.username));
  //   }
  //   callAPI();
  // }, []);

  return (
    <div>
      <h1> User Details </h1>
      <BaseForm
        // schema={SignupSchema(users ? users : ["Fetching users..."])}
        schema={SignupSchema}
        onSubmit={handleSubmit}
        renderAfter={() => <button type="submit"> Submit </button>}
      />
    </div>
  );
};
