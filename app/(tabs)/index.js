import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import LabCard from '../../components/LabCard';
import StatusBadge from '../../components/StatusBadge';

const FIAP_RED = '#ED1C24';

const LABS_DATA = [
  { id: 1, nome: 'Lab de Redes', numero: 'T01', andar: '1º Andar', capacidade: 30, disponivel: true, recursos: ['Wi-Fi 6', 'Switches', 'Roteadores'] },
  { id: 2, nome: 'Lab de Programação', numero: 'T02', andar: '1º Andar', capacidade: 25, disponivel: false, recursos: ['Computadores', 'IDE Setup', 'Projetor'] },
  { id: 3, nome: 'Lab de Hardware', numero: 'T03', andar: '2º Andar', capacidade: 20, disponivel: true, recursos: ['Bancadas', 'Ferramentas', 'Componentes'] },
  { id: 4, nome: 'Lab de Cloud', numero: 'T04', andar: '2º Andar', capacidade: 30, disponivel: true, recursos: ['AWS', 'Azure', 'GCP'] },
  { id: 5, nome: 'Lab de Segurança', numero: 'T05', andar: '3º Andar', capacidade: 20, disponivel: false, recursos: ['Kali Linux', 'Wireshark', 'Firewall'] },
];

const PROXIMAS = [
  { id: 1, lab: 'Lab de Redes', data: 'Hoje', hora: '14:00 - 16:00', status: 'confirmada' },
  { id: 2, lab: 'Lab de Cloud', data: 'Amanhã', hora: '09:00 - 11:00', status: 'pendente' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento dos laboratórios
    const timer = setTimeout(() => {
      setLabs(LABS_DATA);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const disponiveis = labs.filter(l => l.disponivel).length;
  const ocupados = labs.filter(l => !l.disponivel).length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.greeting}>Olá, Estudante 👋</Text>
              <Text style={styles.subGreeting}>FIAP Labs</Text>
            </View>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>F</Text>
          </View>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Reserve seu laboratório</Text>
          <Text style={styles.bannerSub}>Escolha o lab ideal para sua aula ou projeto</Text>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() => router.push('/(tabs)/nova-reserva')}
          >
            <Text style={styles.bannerBtnText}>Nova Reserva</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#fff5f5' }]}>
            <Text style={styles.statNum}>{disponiveis}</Text>
            <Text style={styles.statLabel}>Disponíveis</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#f5f5ff' }]}>
            <Text style={[styles.statNum, { color: '#6c5ce7' }]}>{ocupados}</Text>
            <Text style={styles.statLabel}>Ocupados</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#f5fff5' }]}>
            <Text style={[styles.statNum, { color: '#00b894' }]}>{PROXIMAS.length}</Text>
            <Text style={styles.statLabel}>Minhas Reservas</Text>
          </View>
        </View>

        {/* Próximas Reservas */}
        <Text style={styles.sectionTitle}>Próximas Reservas</Text>
        {PROXIMAS.map(r => (
          <View key={r.id} style={styles.reservaCard}>
            <View>
              <Text style={styles.reservaLab}>{r.lab}</Text>
              <Text style={styles.reservaInfo}>{r.data} • {r.hora}</Text>
            </View>
            <StatusBadge status={r.status} />
          </View>
        ))}

        {/* Labs */}
        <Text style={styles.sectionTitle}>Laboratórios</Text>

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={FIAP_RED} />
            <Text style={styles.loadingText}>Carregando laboratórios...</Text>
          </View>
        ) : (
          labs.map(lab => (
            <LabCard
              key={lab.id}
              lab={lab}
              onReservar={() => router.push('/(tabs)/nova-reserva')}
            />
          ))
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fc' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 32, height: 32, borderRadius: 6 },
  greeting: { fontSize: 18, fontWeight: '700', color: '#1a1a2e' },
  subGreeting: { fontSize: 12, color: '#888', marginTop: 1 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: FIAP_RED,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  banner: {
    margin: 16, borderRadius: 16, padding: 20, backgroundColor: FIAP_RED,
  },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  bannerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  bannerBtn: {
    marginTop: 14, backgroundColor: '#fff',
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 10, alignSelf: 'flex-start',
  },
  bannerBtnText: { color: FIAP_RED, fontWeight: '700', fontSize: 14 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 6 },
  statCard: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '800', color: FIAP_RED },
  statLabel: { fontSize: 11, color: '#666', marginTop: 2, textAlign: 'center' },
  sectionTitle: {
    fontSize: 17, fontWeight: '700', color: '#1a1a2e',
    marginHorizontal: 16, marginTop: 20, marginBottom: 10,
  },
  reservaCard: {
    backgroundColor: '#fff', borderRadius: 12,
    marginHorizontal: 16, marginBottom: 8, padding: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  reservaLab: { fontSize: 15, fontWeight: '600', color: '#1a1a2e' },
  reservaInfo: { fontSize: 12, color: '#888', marginTop: 3 },
  loadingBox: { alignItems: 'center', paddingVertical: 40 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#888' },
});
