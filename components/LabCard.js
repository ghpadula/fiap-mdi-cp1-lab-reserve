import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';

const FIAP_RED = '#ED1C24';

const LAB_IMAGES = {
  1: require('../assets/icon.png'),
  2: require('../assets/icon.png'),
  3: require('../assets/icon.png'),
  4: require('../assets/icon.png'),
  5: require('../assets/icon.png'),
};

export default function LabCard({ lab, onReservar }) {
  return (
    <View style={styles.card}>
      <Image
        source={LAB_IMAGES[lab.id] || require('../assets/icon.png')}
        style={styles.labImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.cardHeader}>
          <View style={styles.infoBlock}>
            <Text style={styles.labNome}>{lab.nome}</Text>
            <Text style={styles.labInfo}>
              {lab.numero} • {lab.andar} • {lab.capacidade} lugares
            </Text>
          </View>
          <StatusBadge status={lab.disponivel ? 'livre' : 'ocupado'} />
        </View>

        <View style={styles.recursosRow}>
          {lab.recursos.map((r, i) => (
            <View key={i} style={styles.recursoTag}>
              <Text style={styles.recursoText}>{r}</Text>
            </View>
          ))}
        </View>

        {lab.disponivel && onReservar && (
          <TouchableOpacity style={styles.reservarBtn} onPress={() => onReservar(lab)}>
            <Text style={styles.reservarBtnText}>Reservar este Lab</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  labImage: {
    width: '100%',
    height: 80,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoBlock: { flex: 1, marginRight: 10 },
  labNome: { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },
  labInfo: { fontSize: 12, color: '#888', marginTop: 3 },
  recursosRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  recursoTag: {
    backgroundColor: '#f0f0f8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  recursoText: { fontSize: 11, color: '#555', fontWeight: '500' },
  reservarBtn: {
    marginTop: 12,
    backgroundColor: FIAP_RED,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  reservarBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
