import { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';

const FIAP_RED = '#ED1C24';

const RESERVAS_MOCK = [
  { id: 1, lab: 'Lab de Redes', numero: 'T01', data: 'Hoje, 30 Mar', hora: '14:00 - 16:00', turma: '3TIAR', finalidade: 'Aula prática de roteamento OSPF', status: 'confirmada' },
  { id: 2, lab: 'Lab de Cloud', numero: 'T04', data: 'Amanhã, 31 Mar', hora: '09:00 - 11:00', turma: '2TDSPN', finalidade: 'Deploy em AWS', status: 'pendente' },
  { id: 3, lab: 'Lab de Programação', numero: 'T02', data: '01 Abr', hora: '13:30 - 15:10', turma: '1TDSPC', finalidade: 'Hackathon interno', status: 'confirmada' },
  { id: 4, lab: 'Lab de Hardware', numero: 'T03', data: '25 Mar', hora: '19:00 - 20:40', turma: '3TIAR', finalidade: 'Montagem de servidores', status: 'concluida' },
  { id: 5, lab: 'Lab de Segurança', numero: 'T05', data: '22 Mar', hora: '17:10 - 18:50', turma: '2TDSPN', finalidade: 'Pentest simulado', status: 'cancelada' },
];

const FILTROS = ['Todas', 'Confirmadas', 'Pendentes', 'Concluídas', 'Canceladas'];

export default function ReservasScreen() {
  const router = useRouter();
  const [filtro, setFiltro] = useState('Todas');
  const [expandido, setExpandido] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula busca das reservas do usuário
    const timer = setTimeout(() => {
      setReservas(RESERVAS_MOCK);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filtradas = reservas.filter(r => {
    if (filtro === 'Todas') return true;
    if (filtro === 'Confirmadas') return r.status === 'confirmada';
    if (filtro === 'Pendentes') return r.status === 'pendente';
    if (filtro === 'Concluídas') return r.status === 'concluida';
    if (filtro === 'Canceladas') return r.status === 'cancelada';
    return true;
  });

  const handleCancelar = (id) => {
    Alert.alert(
      'Cancelar Reserva',
      'Tem certeza que deseja cancelar esta reserva?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar', style: 'destructive',
          onPress: () => {
            setReservas(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelada' } : r));
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Minhas Reservas" subtitle={`${reservas.length} reservas no total`} />

      {/* Filtros */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.filtrosScroll}
        contentContainerStyle={styles.filtrosContent}
      >
        {FILTROS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filtroBtn, filtro === f && styles.filtroBtnActive]}
            onPress={() => setFiltro(f)}
          >
            <Text style={[styles.filtroText, filtro === f && styles.filtroTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={FIAP_RED} />
          <Text style={styles.loadingText}>Carregando reservas...</Text>
        </View>
      ) : (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

          {filtradas.length === 0 && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>Nenhuma reserva encontrada</Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => router.push('/(tabs)/nova-reserva')}
              >
                <Text style={styles.emptyBtnText}>Fazer uma reserva</Text>
              </TouchableOpacity>
            </View>
          )}

          {filtradas.map(r => {
            const isExp = expandido === r.id;
            return (
              <TouchableOpacity
                key={r.id}
                style={styles.card}
                onPress={() => setExpandido(isExp ? null : r.id)}
                activeOpacity={0.9}
              >
                <View style={styles.cardTop}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardLab}>{r.lab}</Text>
                    <Text style={styles.cardNumero}>{r.numero}</Text>
                  </View>
                  <StatusBadge status={r.status} />
                </View>

                <View style={styles.cardInfo}>
                  <Text style={styles.cardInfoText}>📅 {r.data}</Text>
                  <Text style={styles.cardInfoText}>🕐 {r.hora}</Text>
                </View>

                {isExp && (
                  <View style={styles.cardExpanded}>
                    <View style={styles.divider} />
                    {r.turma ? <Text style={styles.detailItem}>👥 Turma: {r.turma}</Text> : null}
                    {r.finalidade ? <Text style={styles.detailItem}>📝 {r.finalidade}</Text> : null}
                    {(r.status === 'confirmada' || r.status === 'pendente') && (
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => handleCancelar(r.id)}
                      >
                        <Text style={styles.cancelBtnText}>Cancelar Reserva</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                <Text style={styles.expandHint}>{isExp ? '▲ Menos detalhes' : '▼ Ver detalhes'}</Text>
              </TouchableOpacity>
            );
          })}

          <View style={{ height: 30 }} />
        </ScrollView>
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/(tabs)/nova-reserva')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fc' },
  filtrosScroll: { backgroundColor: '#fff', maxHeight: 58 },
  filtrosContent: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filtroBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, backgroundColor: '#f0f0f0' },
  filtroBtnActive: { backgroundColor: FIAP_RED },
  filtroText: { fontSize: 13, fontWeight: '600', color: '#666' },
  filtroTextActive: { color: '#fff' },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#888' },
  container: { flex: 1, paddingTop: 12 },
  emptyBox: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 20 },
  emptyBtn: { backgroundColor: FIAP_RED, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  emptyBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  card: {
    backgroundColor: '#fff', borderRadius: 14,
    marginHorizontal: 16, marginBottom: 10, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 4, elevation: 3,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardLeft: {},
  cardLab: { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },
  cardNumero: { fontSize: 12, color: '#888', marginTop: 2 },
  cardInfo: { flexDirection: 'row', gap: 14, marginTop: 10 },
  cardInfoText: { fontSize: 13, color: '#555' },
  cardExpanded: { marginTop: 4 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
  detailItem: { fontSize: 13, color: '#555', marginBottom: 6 },
  cancelBtn: {
    marginTop: 8, borderWidth: 1.5, borderColor: '#e74c3c',
    paddingVertical: 9, borderRadius: 10, alignItems: 'center',
  },
  cancelBtnText: { color: '#e74c3c', fontWeight: '700', fontSize: 14 },
  expandHint: { fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 10 },
  fab: {
    position: 'absolute', bottom: 90, right: 20,
    width: 54, height: 54, borderRadius: 27,
    backgroundColor: FIAP_RED, alignItems: 'center', justifyContent: 'center',
    shadowColor: FIAP_RED, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 8, elevation: 8,
  },
  fabText: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 32 },
});
