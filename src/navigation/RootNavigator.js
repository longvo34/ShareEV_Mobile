import { useEffect, useState } from 'react';
import LoadingScreen from '../screens/Loading/LoadingScreen';
import AuthNavigator from './AuthNavigator';

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // giả lập loading (sau này thay bằng check token)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 giây

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  // sau loading -> vào app
  return <AuthNavigator />;
}
