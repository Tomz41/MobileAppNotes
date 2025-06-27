import { Slot } from 'expo-router';
import { Stack } from 'expo-router';
export default function Layout() {
  return <Stack initialRouteName="login-method" screenOptions={{ headerShown: false }} />;
}
// export default function Layout() {
//   return <Slot />;
// }
