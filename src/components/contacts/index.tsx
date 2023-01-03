import { ActionFunctionArgs, Form, useFetcher, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../../contacts";

export type ContactType = {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
};

// const contact = {
//   first: "Your",
//   last: "Name",
//   avatar: "https://placekitten.com/g/200/200",
//   twitter: "your_handle",
//   notes: "Some notes",
//   favorite: true,
// };

export async function action({ params, request} : ActionFunctionArgs) {
  const formData = request.formData();
  await updateContact(params.contactId, {
    favorite: formData.get("favorite") == "true"
  })
}
export async function loader({
  params,
}: {
  params: { contactId: string };
}): Promise<ContactType> {
  return getContact(params.contactId);
}

export default function Contact() {
  const contact = useLoaderData() as ContactType;
  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: ContactType }) {
  // yes, this is a `let` for later
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
