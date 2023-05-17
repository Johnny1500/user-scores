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
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { PlusSquareIcon, RepeatIcon } from "@chakra-ui/icons";

import { User } from "./interfaces";
import UserInfo from "./UserInfo";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

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
          group: "none",
        };
      });

      setUsers(remoteUsers);
      console.log("users", users);
    } else {
      throw new Error(response.statusText);
    }
  }

  useEffect(() => {
    fetchUsers();

    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <>
      <Card className="card" minW="360px">
        <CardHeader fontSize="xl">
          <Box>
            <Box display="inline" mr={3}>
              Пользователи
            </Box>
            <Tooltip label="Добавить пользователей">
              <IconButton
                aria-label="Increase amount of users"
                icon={<PlusSquareIcon />}
                colorScheme="teal"
                size="sm"
                style={{ borderRadius: "500px" }}
                mr={2}
                onClick={() => console.log("test")}
              />
            </Tooltip>
            <Tooltip label="Обновить список пользователей">
              <IconButton
                aria-label="Refresh Users"
                icon={<RepeatIcon />}
                colorScheme="teal"
                size="sm"
                style={{ borderRadius: "500px" }}
                mr={1}
                onClick={() => console.log("test")}
              />
            </Tooltip>
          </Box>
          <Divider
            size="xl"
            mt={5}
            style={{ borderWidth: "1px", borderColor: "#000" }}
          />
        </CardHeader>
        <CardBody pt={1}>
          <List>
            {users
              .filter((user) => user.group === "none")
              .map((user) => {
                return (
                  <UserInfo
                    key={user.id}
                    user={user}
                    setUsers={setUsers}
                    setTabIndex={setTabIndex}
                  ></UserInfo>
                );
              })}
          </List>
        </CardBody>
      </Card>
      <Card p={5} pt={1} minW="360px">
        <CardHeader fontSize="xl" pl={0}>
          Пользователи с рейтингом
        </CardHeader>
        <Divider mb={2} style={{ borderWidth: "1px", borderColor: "#000" }} />
        <CardBody>
          <Tabs
            size="md"
            variant="enclosed"
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>Уважаемые</Tab>
              <Tab>Нарушители</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {users.filter((user) => user.group === "respectable").length ? (
                  <List>
                    {users
                      .filter((user) => user.group === "respectable")
                      .map((user) => {
                        return (
                          <UserInfo
                            key={user.id}
                            user={user}
                            setUsers={setUsers}
                            setTabIndex={setTabIndex}
                          ></UserInfo>
                        );
                      })}
                  </List>
                ) : (
                  <Box>Нет пользователей</Box>
                )}
              </TabPanel>
              <TabPanel>
                {users.filter((user) => user.group === "bully").length ? (
                  <List>
                    {users
                      .filter((user) => user.group === "bully")
                      .map((user) => {
                        return (
                          <UserInfo
                            key={user.id}
                            user={user}
                            setUsers={setUsers}
                            setTabIndex={setTabIndex}
                          ></UserInfo>
                        );
                      })}
                  </List>
                ) : (
                  <Box>Нет пользователей</Box>
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
