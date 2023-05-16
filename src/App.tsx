import { useState, useEffect } from "react";
import "./App.css";
import {
  List,  
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel, 
  Box,
  Divider,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";

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
        <CardHeader fontSize="xl" pb={3}>
          Users
        </CardHeader>
        <Divider mb={2} />
        <CardBody pt={1}>
          <List>
            {users
              .filter((user) => user.row)
              .map((user) => {
                return (
                  <UserInfo
                    key={user.id}
                    user={user}
                    setUsers={setUsers}
                  ></UserInfo>
                );
              })}
          </List>
        </CardBody>
      </Card>
      <Card p={5} pt={1}>
        <CardHeader fontSize="xl">Users with rating</CardHeader>
        <Divider mb={2} />
        <CardBody>
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab>Respectable</Tab>
            <Tab>Bully</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {users.filter((user) => user.score > 0).length ? (
                <List>
                  {users
                    .filter((user) => user.score > 0)
                    .map((user) => {
                      return (
                        <UserInfo
                          key={user.id}
                          user={user}
                          setUsers={setUsers}
                        ></UserInfo>
                      );
                    })}
                </List>
              ) : (
                <Box>No users</Box>
              )}
            </TabPanel>
            <TabPanel>
              {users.filter((user) => user.score < 0).length ? (
                <List>
                  {users
                    .filter((user) => user.score < 0)
                    .map((user) => {
                      return (
                        <UserInfo
                          key={user.id}
                          user={user}
                          setUsers={setUsers}
                        ></UserInfo>
                      );
                    })}
                </List>
              ) : (
                <Box>No users</Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        </CardBody>
      </Card>
    </>
  );
}

export default App;
