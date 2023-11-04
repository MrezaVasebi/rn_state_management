import { CtxUserList } from "./screens";
import { UserProvider } from "./st-management/context-api/UserContext";

export default function App() {
  let state_management = "context";

  if (state_management === "context") {
    return (
      <UserProvider>
        <CtxUserList />
      </UserProvider>
    );
  }

  // return (
  //   <UserProvider>
  //     <CtxUserList />
  //   </UserProvider>
  // );
}
