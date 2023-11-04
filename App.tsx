import { Provider } from "react-redux";
import { CtxUserList, ReduxUserList } from "./screens";
import { UserProvider } from "./st-management/context-api/UserContext";
import { store } from "./st-management/redux-toolkit";

export default function App() {
  let state_management = "redux";

  if (state_management === "context") {
    return (
      <UserProvider>
        <CtxUserList />
      </UserProvider>
    );
  }

  if (state_management === "redux") {
    return (
      <Provider store={store}>
        <ReduxUserList />
      </Provider>
    );
  }
}
