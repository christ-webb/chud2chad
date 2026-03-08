import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type ResultsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Results'
>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

export default function ResultsScreen({ navigation, route }: Props) {
  const { analysis, grade, imageUri } = route.params;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getGradeEmoji = (label: string) => {
    switch (label) {
      case 'Gigachad':
        return '💪';
      case 'Chad':
        return '😎';
      case 'Chadding Up':
        return '👍';
      case 'Chud':
        return '😐';
      case 'Full Chud':
        return '😬';
      default:
        return '🤔';
    }
  };

  const getGradeColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#3B82F6'; // Blue
    if (score >= 40) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const handleStartOver = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Index' }],
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#84A6FF', '#D8F0FC']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={[StyleSheet.absoluteFillObject, styles.textureOverlay]} />

      <Animated.View
        style={[
          styles.animatedContent,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>YOUR RESULTS</Text>

          {/* Grade Card */}
          <View style={styles.gradeCard}>
            <Text style={styles.gradeEmoji}>{getGradeEmoji(grade.label)}</Text>
            <Text style={styles.gradeLabel}>{grade.label}</Text>
            <View style={styles.scoreContainer}>
              <View style={styles.scoreBarBackground}>
                <View
                  style={[
                    styles.scoreBarFill,
                    {
                      width: `${grade.score}%`,
                      backgroundColor: getGradeColor(grade.score),
                    },
                  ]}
                />
              </View>
              <Text style={styles.scoreText}>{grade.score}/100</Text>
            </View>
            <View style={styles.scoreBreakdown}>
              <Text style={styles.breakdownText}>
                Style: {grade.styleScore.toFixed(0)}
              </Text>
              <Text style={styles.breakdownText}>
                Hygiene: {grade.hygieneScore}/4
              </Text>
            </View>
          </View>

          {/* Outfit Photo */}
          {imageUri && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.outfitImage} />
            </View>
          )}

          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Summary</Text>
            <Text style={styles.summaryText}>{analysis.summary}</Text>
          </View>

          {/* Color Palette */}
          {analysis.color_palette.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color Palette</Text>
              <View style={styles.colorPalette}>
                {analysis.color_palette.map((color, index) => (
                  <View
                    key={index}
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color.toLowerCase() },
                    ]}
                  >
                    <Text style={styles.colorText}>{color}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💪 What's Working</Text>
              <View style={styles.listContainer}>
                {analysis.strengths.map((strength, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.listText}>{strength}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Room to Improve */}
          {(analysis.improvements.length > 0 ||
            analysis.accessory_suggestions.length > 0 ||
            analysis.layering_suggestions.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔧 Room to Improve</Text>

              {/* Improvements */}
              {analysis.improvements.length > 0 && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>General Tips:</Text>
                  {analysis.improvements.map((improvement, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.listText}>{improvement}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Accessory Suggestions */}
              {analysis.accessory_suggestions.length > 0 && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>Accessory Ideas:</Text>
                  {analysis.accessory_suggestions.map((suggestion, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.listText}>{suggestion}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Layering Suggestions */}
              {analysis.layering_suggestions.length > 0 && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>Layering Tips:</Text>
                  {analysis.layering_suggestions.map((suggestion, index) => (
                    <View key={index} style={styles.listItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.listText}>{suggestion}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Confidence Notes */}
          {analysis.confidence_notes && (
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>{analysis.confidence_notes}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Start Over Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startOverButton}
          onPress={handleStartOver}
          activeOpacity={0.8}
        >
          <Text style={styles.startOverButtonText}>START OVER</Text>
        </TouchableOpacity>
      </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textureOverlay: {
    backgroundColor: 'rgba(240, 240, 240, 0.2)',
  },
  animatedContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 80,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontFamily: 'SquadaOne_400Regular',
    color: '#041C85',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 1,
  },
  gradeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  gradeEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  gradeLabel: {
    fontSize: 32,
    fontFamily: 'SquadaOne_400Regular',
    color: '#041C85',
    marginBottom: 16,
    letterSpacing: 1,
  },
  scoreContainer: {
    width: '100%',
    marginBottom: 12,
  },
  scoreBarBackground: {
    width: '100%',
    height: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 20,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
    textAlign: 'center',
  },
  scoreBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 12,
  },
  breakdownText: {
    fontSize: 14,
    fontFamily: 'Hanuman_400Regular',
    color: '#041C85',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outfitImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    fontFamily: 'Hanuman_400Regular',
    color: '#041C85',
    lineHeight: 24,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorSwatch: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    minWidth: 80,
  },
  colorText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  listContainer: {
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 20,
    color: '#041C85',
    marginRight: 8,
    lineHeight: 24,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Hanuman_400Regular',
    color: '#041C85',
    lineHeight: 24,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontFamily: 'Hanuman_700Bold',
    color: '#041C85',
    marginBottom: 8,
  },
  noteCard: {
    backgroundColor: 'rgba(254, 243, 199, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Hanuman_400Regular',
    color: '#92400E',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: 'transparent',
  },
  startOverButton: {
    backgroundColor: '#041C85',
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  startOverButtonText: {
    fontSize: 24,
    fontFamily: 'SquadaOne_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
});
