import { useEffect, useState } from "react";
import LoadingScreen from "../screens/loading/LoadingScreen";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <LoadingScreen />;

  return isLoggedIn ? (
    <MainNavigator setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
  );
}
