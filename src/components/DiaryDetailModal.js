
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryDetailModal({
  visible,
  entry,
  onClose,
}) {
  if (!entry) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView>
            <Image
              source={entry.moodImage}
              style={styles.image}
            />

            <Text style={styles.title}>{entry.title}</Text>
            <Text style={styles.date}>{entry.date}</Text>

            <Text style={styles.body}>
              {entry.body || entry.preview}
            </Text>
          </ScrollView>

          <Pressable
            onPress={onClose}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACE.l,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modal: {
    maxHeight: '80%',
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.card,
    marginBottom: SPACE.m,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    marginTop: SPACE.xs,
    marginBottom: SPACE.m,
    color: COLORS.muted,
  },
  body: {
    fontSize: TYPO.body,
    lineHeight: 22,
    color: COLORS.text,
  },
  button: {
    marginTop: SPACE.m,
    padding: SPACE.m,
    alignItems: 'center',
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
