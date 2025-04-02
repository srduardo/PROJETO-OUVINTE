import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="(auth)/signup/Cadastro" options={{headerTitle:"Voltar!",
        headerStyle: { backgroundColor: '#E5E1E1' },  }} />

      <Stack.Screen name="(auth)/signup/Esquecido" options={{ headerTitle:"Voltar!",
        headerStyle: { backgroundColor: '#E5E1E1' },
        }} />
    </Stack>
  );
}