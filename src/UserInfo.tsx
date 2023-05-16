import { User } from "./interfaces";
import { ListItem, ListIcon } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export function UserInfo({
  avatar,
  username,
  id,
  row,
  score,
}: User): JSX.Element {
  return (
    <ListItem key={id} className="list__item">
      <Avatar name={username} src={avatar} mr={2}/>
      <Box>{username}</Box>
    </ListItem>
  );
}

export default UserInfo;
