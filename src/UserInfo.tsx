import React, { memo } from "react";
import { User } from "./interfaces";
import {
  ListItem,
  Avatar,
  Box,
  IconButton,
  Text,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";

interface UserInfoProps {
  user: User;
  setUsers?: any;
}

export function UserInfo({
  user: { id, username, avatar, score, row },
  setUsers,
}: UserInfoProps): JSX.Element {
  const changeRaiting = (newScore: number) => {
    setUsers((prev: User[]) => {
      const tempArr = [...prev];
      const indexOfUser = tempArr.findIndex((user) => user.id === id);

      tempArr.splice(indexOfUser, 1, {
        id,
        username,
        avatar,
        score: newScore,
        row,
      });
     
      return tempArr;
    });
  };

  const increaseRaiting = () => {
    const newScore = score + 1;
    changeRaiting(newScore);
    console.log(`user increase raiting for ${username}`)

  };

  const decreaseRaiting = () => {
    const newScore = score - 1;
    changeRaiting(newScore);
    console.log(`user decrease raiting for ${username}`)

  };

  return (
    <>
      <ListItem key={id} className="list__item">
        <Avatar name={username} src={avatar} mr={2} />
        <Box>{username}</Box>
        <Box ml={2} className="btn-block">
          <IconButton
            aria-label="Increase raiting"
            icon={<AddIcon />}
            colorScheme="teal"
            size="sm"
            style={{ borderRadius: "500px" }}
            mr={1}
            onClick={() => increaseRaiting()}
          />
          <Text fontSize="lg">{score}</Text>
          <IconButton
            aria-label="Increase raiting"
            icon={<MinusIcon />}
            colorScheme="teal"
            size="sm"
            style={{ borderRadius: "500px" }}
            ml={1}
            onClick={() => decreaseRaiting()}
          />
        </Box>
      </ListItem>
      <Divider />
    </>
  );
}

export default memo(UserInfo);
