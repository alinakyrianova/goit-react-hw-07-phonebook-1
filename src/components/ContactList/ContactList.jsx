import React from 'react';
import { useEffect } from 'react';
import { List, Item, Button } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVissibleContacts,
  selectError,
  selectLoading,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';
import Spinner from 'components/Spinner/Spinner';

const ContactList = () => {
  const contacts = useSelector(selectVissibleContacts);
  const error = useSelector(selectError);
  const isloading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDelete = id => dispatch(deleteContact(id));

  return (
    <>
      <List>
        {isloading && <Spinner />}
        {contacts.map(({ id, name, number }) => (
          <Item key={id}>
            {name + ' : ' + number}
            <Button type="button" name="delete" onClick={() => onDelete(id)}>
              Delete
            </Button>
          </Item>
        ))}
        {!contacts.length && !error && !isloading && <h2>No contacts found</h2>}
        {error && <h2>{error}</h2>}
      </List>
    </>
  );
};

export default ContactList;
