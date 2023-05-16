import { useState, useEffect } from "react";
import "./App.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

interface User {
  id: string;
  username: string;
  avatar: string;
  score: number;
}

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
          };
        });

        setUsers(remoteUsers);
        console.log("users", users);
      } else {
        throw new Error(response.statusText)
      }
    }

    fetchUsers();

    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <>
      <List ml={10}>
        {users.map((user) => {
          const { avatar, username, score, id } = user;

          return <ListItem key={id}>{username}</ListItem>;
        })}
      </List>
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
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
    </>
  );
}

export default App;
