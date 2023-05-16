import { useState, useEffect, useCallback } from "react";
import "./App.css";
import {
  List,
  ListItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
  Divider
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

import { User } from "./interfaces";
import UserInfo from "./UserInfo";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://random-data-api.com/api/users/random_user?size=3"
      );

      if (response.ok) {
        const json = await response.json();

        const remoteUsers = json.map((user: any) => {
          const { username, avatar, id } = user;

          return {
            id,
            username,
            avatar,
            score: 0,
            row: true,
          };
        });

        setUsers(remoteUsers);
        console.log("users", users);
      } else {
        throw new Error(response.statusText);
      }
    }

    fetchUsers();

    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <>
      <Card p={5} pt={1}>
        <CardHeader fontSize="xl" pb={3}>Users</CardHeader>
        <Divider mb={2}/>
        <List>
          {users.map((user) => {
            return <UserInfo key={user.id} user={user} setUsers={(setUsers)}></UserInfo>;
          })}
        </List>
      </Card>
      <Card p={5} pt={1}>
        <CardHeader fontSize="xl">Users with rating</CardHeader>
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab>Respectable</Tab>
            <Tab>Bully</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <List w={250}>
                <ListItem>Lorem ipsum dolor sit amet</ListItem>
                <ListItem>Consectetur adipiscing elit</ListItem>
              </List>
            </TabPanel>
            <TabPanel>
              <List w={250}>
                <ListItem>Integer molestie lorem at massa</ListItem>
                <ListItem>Facilisis in pretium nisl aliquet</ListItem>
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </>
  );
}

export default App;
