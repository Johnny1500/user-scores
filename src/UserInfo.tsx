import React, { memo } from "react";
import { User } from "./interfaces";
import {
  ListItem,
  Avatar,
  Box,
  IconButton,
  Button,
  Text,
  Divider,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

interface UserInfoProps {
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function UserInfo({
  user: { id, username, avatar, score, group },
  setUsers,
  setTabIndex,
}: UserInfoProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeRaiting = (newScore: number, newGroup: string) => {
    setUsers((prev: User[]) => {
      const tempArr = [...prev];

      const indexOfUser = tempArr.findIndex((user) => user.id === id);

      tempArr.splice(indexOfUser, 1, {
        id,
        username,
        avatar,
        score: newScore,
        group: group === "none" ? newGroup : newScore == 0 ? "none" : group,
      });

      return tempArr;
    });
  };

  const increaseRaiting = () => {
    if (group === "none") setTabIndex(0);
    const newScore = score + 1;
    changeRaiting(newScore, "respectable");
    console.log(`[User]: User increased rating for ${username}`);

    if (newScore >= 5) onOpen();
  };

  const decreaseRaiting = () => {
    if (group === "none") setTabIndex(1);
    const newScore = score - 1;
    changeRaiting(newScore, "bully");
    console.log(`[User]: User lowered rating for ${username}`);

    if (newScore <= -5) onOpen();
  };

  let modalText: string | null = null;

  if (score >= 5) {
    modalText = `Нужно вознаградить ${username}. Сделать это?`;
  } else if (score <= -5) {
    modalText = `Пора забанить ${username}. Сделать это?`;
  }

  const handleBtnModal = () => {
    const newScore = 0;
    changeRaiting(newScore, "none");
    console.log(`[User]: User returned ${username} to the list`);
    onClose();
  };

  return (
    <>
      <ListItem key={id} className="list__item">
        <Avatar name={username} src={avatar} mr={2} />
        <Box>{username}</Box>
        <Flex ml={2}>
          <IconButton
            aria-label="Increase raiting"
            icon={<AddIcon />}
            colorScheme="teal"
            size="sm"
            style={{ borderRadius: "500px" }}
            mr={1}
            onClick={() => increaseRaiting()}
          />
          {group !== "none" ? <Text fontSize="lg">{score}</Text> : null}
          <IconButton
            aria-label="Increase raiting"
            icon={<MinusIcon />}
            colorScheme="teal"
            size="sm"
            style={{ borderRadius: "500px" }}
            ml={1}
            onClick={() => decreaseRaiting()}
          />
        </Flex>
      </ListItem>
      <Divider />
      <Portal>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Информация</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>{modalText}</Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={() => handleBtnModal()}>
                Да
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Portal>
    </>
  );
}

export default memo(UserInfo);
