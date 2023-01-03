import { useTsController } from "@ts-react/form";
import React from "react";
import * as z from "zod";

export const AddressSchema = z.object({
  line1: z
    .string({
      required_error: "Line 1 is required",
    })
    .nonempty("Line 1 cannot be empty"),
  line2: z
    .string({
      required_error: "Line 2 is required",
    })
    .nonempty("Line 2 cannot be empty"),
  pincode: z.string().regex(/^[0-9]+$/, "INVALID PINCODE"),
});

const AddreessTextInput = ({
  value,
  handleChange,
  label,
  errorMessage,
}: {
  value: string;
  label: string;
  handleChange: any;
  errorMessage: string;
}) => {
  return (
    <>
      <label> {label} </label>
      <input
        type="string"
        value={value}
        onChange={handleChange}
        style={{
          padding: 10,
          margin: 20,
        }}
      />
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
      <br />
    </>
  );
};

export default function AddressFields() {
  const {
    field: { value, onChange },
    error,
  } = useTsController<z.infer<typeof AddressSchema>>();

  const handleChange =
    (key: keyof z.infer<typeof AddressSchema>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        [key]: e.target.value,
      });
    };

  return (
    <div>
      <h1> Address </h1>
      <AddreessTextInput
        value={value?.line1 || ""}
        handleChange={handleChange("line1")}
        label="Line 1"
        errorMessage={error?.line1?.errorMessage || ""}
      />
      <AddreessTextInput
        value={value?.line2 || ""}
        label="Line 2"
        handleChange={handleChange("line2")}
        errorMessage={error?.line2?.errorMessage || ""}
      />
      <AddreessTextInput
        value={value?.pincode || ""}
        label="Pincode"
        handleChange={handleChange("pincode")}
        errorMessage={error?.pincode?.errorMessage || ""}
      />
      {error?.errorMessage && (
        <span style={{ color: "red" }}>Please fill adddress fields</span>
      )}
    </div>
  );
}
