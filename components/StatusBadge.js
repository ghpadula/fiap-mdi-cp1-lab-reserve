import { View, Text, StyleSheet } from 'react-native';

const STATUS_CONFIG = {
  confirmada: { label: 'Confirmada', bg: '#e8f8f0', color: '#00a65a', icon: '✅' },
  pendente:   { label: 'Pendente',   bg: '#fff8e1', color: '#f39c12', icon: '⏳' },
  concluida:  { label: 'Concluída',  bg: '#f0f0f8', color: '#6c5ce7', icon: '✔️' },
  cancelada:  { label: 'Cancelada',  bg: '#fee',    color: '#e74c3c', icon: '❌' },
  livre:      { label: 'Livre',      bg: '#e8f8f0', color: '#00a65a', icon: '🟢' },
  ocupado:    { label: 'Ocupado',    bg: '#fee',    color: '#e74c3c', icon: '🔴' },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { label: status, bg: '#eee', color: '#666', icon: '●' };

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.color }]}>
        {config.icon} {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
