import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

const FIAP_RED = '#ED1C24';

const LABS = [
  { id: 1, nome: 'Lab de Redes (T01)', capacidade: 30 },
  { id: 2, nome: 'Lab de Programação (T02)', capacidade: 25 },
  { id: 3, nome: 'Lab de Hardware (T03)', capacidade: 20 },
  { id: 4, nome: 'Lab de Cloud (T04)', capacidade: 30 },
  { id: 5, nome: 'Lab de Segurança (T05)', capacidade: 20 },
];

const HORARIOS = [
  '07:30 - 09:10', '09:20 - 11:00', '11:10 - 12:50', '13:30 - 15:10',
  '15:20 - 17:00', '17:10 - 18:50', '19:00 - 20:40', '20:50 - 22:30',
];

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function getDatesOfWeek() {
  const today = new Date();
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
}

export default function NovaReservaScreen() {
  const router = useRouter();
  const datas = getDatesOfWeek();

  const [labSelecionado, setLabSelecionado] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [finalidade, setFinalidade] = useState('');
  const [turma, setTurma] = useState('');

  const handleSubmit = () => {
    if (!labSelecionado || diaSelecionado === null || !horarioSelecionado) {
      Alert.alert('Atenção', 'Preencha laboratório, data e horário para continuar.');
      return;
    }
    Alert.alert(
      'Reserva Solicitada! ✅',
      `${LABS[labSelecionado - 1].nome}\n${DIAS[diaSelecionado]}, ${datas[diaSelecionado]}\n${horarioSelecionado}`,
      [
        { text: 'Ver Minhas Reservas', onPress: () => router.push('/(tabs)/reservas') },
        { text: 'OK' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Nova Reserva" subtitle="Preencha os dados abaixo" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Laboratório */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Laboratório</Text>
          {LABS.map(lab => (
            <TouchableOpacity
              key={lab.id}
              style={[styles.labOption, labSelecionado === lab.id && styles.labOptionSelected]}
              onPress={() => setLabSelecionado(lab.id)}
            >
              <View style={[styles.radio, labSelecionado === lab.id && styles.radioSelected]}>
                {labSelecionado === lab.id && <View style={styles.radioDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.labNome, labSelecionado === lab.id && styles.labNomeSelected]}>
                  {lab.nome}
                </Text>
                <Text style={styles.labCap}>{lab.capacidade} lugares</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.datasRow}>
              {DIAS.map((dia, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.diaCard, diaSelecionado === i && styles.diaCardSelected]}
                  onPress={() => setDiaSelecionado(i)}
                >
                  <Text style={[styles.diaNome, diaSelecionado === i && styles.diaSelectedText]}>{dia}</Text>
                  <Text style={[styles.diaNum, diaSelecionado === i && styles.diaSelectedText]}>{datas[i]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Horário */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horário</Text>
          <View style={styles.horariosGrid}>
            {HORARIOS.map((h, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.horarioTag, horarioSelecionado === h && styles.horarioTagSelected]}
                onPress={() => setHorarioSelecionado(h)}
              >
                <Text style={[styles.horarioText, horarioSelecionado === h && styles.horarioTextSelected]}>
                  {h}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Turma */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Turma (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 3TIAR, 2TDSPN..."
            value={turma}
            onChangeText={setTurma}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Finalidade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Finalidade</Text>
          <TextInput
            style={[styles.input, styles.inputMulti]}
            placeholder="Descreva o objetivo da reserva..."
            value={finalidade}
            onChangeText={setFinalidade}
            multiline
            numberOfLines={3}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Resumo dinâmico */}
        {(labSelecionado || diaSelecionado !== null || horarioSelecionado) && (
          <View style={styles.resumo}>
            <Text style={styles.resumoTitle}>📋 Resumo da Reserva</Text>
            {labSelecionado && (
              <Text style={styles.resumoItem}>🏫 {LABS[labSelecionado - 1].nome}</Text>
            )}
            {diaSelecionado !== null && (
              <Text style={styles.resumoItem}>📅 {DIAS[diaSelecionado]}, {datas[diaSelecionado]}</Text>
            )}
            {horarioSelecionado && (
              <Text style={styles.resumoItem}>🕐 {horarioSelecionado}</Text>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Confirmar Reserva</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f8fc' },
  container: { flex: 1 },
  section: {
    backgroundColor: '#fff', marginHorizontal: 16, marginTop: 14,
    borderRadius: 14, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1a1a2e', marginBottom: 12 },
  labOption: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 12,
    borderRadius: 10, borderWidth: 1.5, borderColor: '#eee',
    marginBottom: 8, gap: 12,
  },
  labOptionSelected: { borderColor: FIAP_RED, backgroundColor: '#fff5f5' },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#ccc',
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: FIAP_RED },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: FIAP_RED },
  labNome: { fontSize: 14, fontWeight: '600', color: '#333' },
  labNomeSelected: { color: FIAP_RED },
  labCap: { fontSize: 12, color: '#999', marginTop: 1 },
  datasRow: { flexDirection: 'row', gap: 8, paddingBottom: 4 },
  diaCard: {
    alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16,
    borderRadius: 12, borderWidth: 1.5, borderColor: '#eee',
    backgroundColor: '#fff', minWidth: 56,
  },
  diaCardSelected: { backgroundColor: FIAP_RED, borderColor: FIAP_RED },
  diaNome: { fontSize: 12, fontWeight: '600', color: '#666' },
  diaNum: { fontSize: 18, fontWeight: '800', color: '#1a1a2e', marginTop: 2 },
  diaSelectedText: { color: '#fff' },
  horariosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  horarioTag: {
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 10, borderWidth: 1.5,
    borderColor: '#eee', backgroundColor: '#fafafa',
  },
  horarioTagSelected: { backgroundColor: FIAP_RED, borderColor: FIAP_RED },
  horarioText: { fontSize: 12, fontWeight: '600', color: '#444' },
  horarioTextSelected: { color: '#fff' },
  input: {
    borderWidth: 1.5, borderColor: '#eee', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 11,
    fontSize: 14, color: '#1a1a2e', backgroundColor: '#fafafa',
  },
  inputMulti: { height: 80, textAlignVertical: 'top', paddingTop: 11 },
  resumo: {
    backgroundColor: '#fff', marginHorizontal: 16, marginTop: 14,
    borderRadius: 14, padding: 16,
    borderLeftWidth: 4, borderLeftColor: FIAP_RED,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  resumoTitle: { fontSize: 14, fontWeight: '700', color: FIAP_RED, marginBottom: 6 },
  resumoItem: { fontSize: 13, color: '#444', marginBottom: 3 },
  submitBtn: {
    backgroundColor: FIAP_RED, margin: 16, marginTop: 16,
    borderRadius: 14, paddingVertical: 16, alignItems: 'center',
    shadowColor: FIAP_RED, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
