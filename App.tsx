import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import {
  CtxUserList,
  MobXUserList,
  RecoilUserList,
  ReduxUserList,
} from "./screens";
import { UserProvider } from "./st-management/context-api";
import { store } from "./st-management/redux-toolkit";

export default function App() {
  let state_management = "redux";

  const [fontsLoaded] = useFonts({
    medium: require("./assets/fonts/Medium.ttf"),
  });

  if (!fontsLoaded) return null;

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

  if (state_management === "recoil") {
    return (
      <RecoilRoot>
        <RecoilUserList />
      </RecoilRoot>
    );
  }

  if (state_management === "mobX") {
    return <MobXUserList />;
  }
}
