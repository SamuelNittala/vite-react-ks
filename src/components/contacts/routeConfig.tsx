import React from "react";
import { RouteObject } from "react-router-dom";
import Contact, { loader as contactLoader, action as contactAction } from ".";
import { TestForm } from "../form";
import PTable from "../ptable";
import Role from "../role";
import ContactDestroy, { action as destroyAction } from "./ContactDestroy";
import ContactEdit, { action as editAction } from "./ContactEdit";

const PATH_ROOT = "contacts";

const ContactRoutes: RouteObject[] = [
  {
    path: `${PATH_ROOT}/:contactId`,
    element: <Contact />,
    loader: contactLoader,
    action: contactAction,
  },
  {
    path: `${PATH_ROOT}/:contactId/edit`,
    element: <ContactEdit />,
    loader: contactLoader,
    action: editAction,
  },
  {
    path: `${PATH_ROOT}/:contactId/destroy`,
    errorElement: <div> Cannot delete user </div>,
    element: < ContactDestroy />,
    action: destroyAction,
  },
  {
    path: 'roles',
    element: <Role/>,
  },
  {
    path: 'table',
    element: <PTable />,
  },
  {
    path: 'form',
    element: <TestForm />
  }
];

export default ContactRoutes;
