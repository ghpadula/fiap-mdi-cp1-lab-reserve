import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const FIAP_RED = '#ED1C24';
const FIAP_DARK = '#1a1a2e';

function TabIcon({ name, focused }) {
  const icons = {
    home: focused ? '🏠' : '🏡',
    reservas: focused ? '📋' : '📄',
    nova: focused ? '➕' : '✚',
  };
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
      {icons[name] || '●'}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: FIAP_RED,
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="nova-reserva"
        options={{
          title: 'Reservar',
          tabBarIcon: ({ focused }) => <TabIcon name="nova" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: 'Minhas Reservas',
          tabBarIcon: ({ focused }) => <TabIcon name="reservas" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 70,
    paddingBottom: 10,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
