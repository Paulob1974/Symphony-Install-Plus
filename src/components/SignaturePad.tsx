import React, { useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SignatureData } from '../types/report';
import { colors } from '../theme/colors';

type Props = {
  value?: SignatureData;
  onChange: (signature?: SignatureData) => void;
};

export function SignaturePad({ value, onChange }: Props) {
  const [paths, setPaths] = useState<string[]>(value?.paths || []);
  const [size, setSize] = useState({
    width: value?.width || 320,
    height: value?.height || 180,
  });
  const current = useRef('');
  const pathsRef = useRef<string[]>(value?.paths || []);

  const publish = (next: string[]) => {
    pathsRef.current = next;
    setPaths(next);
    onChange(next.length ? { paths: next, width: size.width, height: size.height } : undefined);
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        const { locationX, locationY } = evt.nativeEvent;
        current.current = `M ${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        setPaths([...pathsRef.current, current.current]);
      },
      onPanResponderMove: evt => {
        const { locationX, locationY } = evt.nativeEvent;
        current.current += ` L ${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        setPaths([...pathsRef.current, current.current]);
      },
      onPanResponderRelease: () => {
        if (current.current) {
          publish([...pathsRef.current, current.current]);
          current.current = '';
        }
      },
    })
  ).current;

  const clear = () => {
    current.current = '';
    publish([]);
  };

  return (
    <View>
      <Text style={styles.help}>Sign inside the box with your finger.</Text>
      <View
        style={styles.pad}
        onLayout={e => {
          const { width, height } = e.nativeEvent.layout;
          setSize({ width, height });
        }}
        {...responder.panHandlers}
      >
        <Svg width="100%" height="100%">
          {paths.map((d, i) => (
            <Path
              key={`${i}-${d.length}`}
              d={d}
              stroke={colors.navyDeep}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </Svg>
      </View>
      <Pressable style={styles.clear} onPress={clear}>
        <Text style={styles.clearText}>Clear Signature</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  help: { color: colors.muted, marginBottom: 7, fontSize: 13 },
  pad: {
    height: 180,
    width: '100%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  clear: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 6,
  },
  clearText: { color: colors.red, fontWeight: '800' },
});
