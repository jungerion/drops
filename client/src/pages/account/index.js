import React from "react";
import { useSelector } from "react-redux";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import UserForm from "../../components/userForm";

function index() {
  const { userDetails } = useSelector((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <h1>Account</h1>
      <div style={{ padding: "30px", backgroundColor: "pink" }}>
        <p>{userDetails.fullName}</p>
        <p>{userDetails.role}</p>
        <p>{userDetails.phoneNumber}</p>
        <Button onClick={onOpen}>Edit</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UserForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default index;
