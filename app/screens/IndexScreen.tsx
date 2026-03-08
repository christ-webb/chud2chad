import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

interface Props {
  navigation: IndexScreenNavigationProp;
}

export default function IndexScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleCard}>
          <Text style={styles.title}>CHUD2CHAD</Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Prologue')}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8CFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    marginBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    width: '90%',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textAlign: 'center',
  },
});
