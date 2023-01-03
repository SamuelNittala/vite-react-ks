import React, { useEffect } from "react";
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  LoaderFunctionArgs,
  useSubmit,
} from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import Contact, { ContactType } from "./contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  const contacts = await getContacts(username);
  return { contacts, username };
}

const Home = (props: {}) => {
  const { contacts, username } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("username");

  useEffect(() => {
    const userNameEle = document.getElementById("username");
    if (userNameEle) {
      userNameEle.value = username;
    }
  }, [username]);
  return (
    <>
      <div id="sidebar">
        <div>
          <Form id="search-form" role="search">
            <input
              id="username"
              aria-label="Search contacts"
              className={ searching ? "loading" : ""}
              placeholder="Search"
              type="search"
              name="username"
              defaultValue={username}
              onChange={(e) => {
                const isFirstSearch = username==null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <h1>React Router Contacts</h1>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i> No contacts </i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Home;
