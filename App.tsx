import UserList from "./screens/UserList";
import { UserProvider } from "./st-management/context-api/UserContext";

export default function App() {
  return (
    <UserProvider>
      <UserList />
    </UserProvider>
  );
}
