import { useEffect, useState } from "react";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import { getAccessToken } from "../utils/authStorage";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!!token);
      setLoading(false);
    };

    bootstrap();
  }, []);

  if (loading) return <LoadingScreen />;

  return isLoggedIn ? (
    <MainNavigator setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
  );
}
