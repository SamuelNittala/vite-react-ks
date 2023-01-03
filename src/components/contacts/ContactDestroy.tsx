import React from 'react'
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { deleteContact } from '../../contacts';


export async function action({ request, params }: ActionFunctionArgs) {
  throw new Error("Cannot delete user");
  const contactId = params.contactId;
  await deleteContact(contactId);
  return redirect(`/`);
}

const ContactDestroy = (props : {}) => {
  return (
    <div>
      
    </div>
  )
}

export default ContactDestroy;
