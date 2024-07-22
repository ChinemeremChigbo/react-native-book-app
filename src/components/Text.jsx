import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

// Themeable / Animatable Text
function AnimatedText(props) {
  const { colors, font } = useTheme();
  const {
    children, style, size, bold, center, color, animated,
  } = props;

  const safeChildren = children || '';

  const textStyle = StyleSheet.create({
    text: {
      color: color || colors.text,
      fontSize: size || 14,
      fontWeight: bold ? '500' : '400',
      fontFamily: font,
      textAlign: center ? 'center' : 'left',
    },
  });

  // Animatable
  if (animated) {
    return (
      <Animated.Text allowFontScaling={false} style={[textStyle.text, style]}>
        {safeChildren}
      </Animated.Text>
    );
  }

  return (
    <Text allowFontScaling={false} style={[textStyle.text, style]}>
      {safeChildren}
    </Text>
  );
}

// Define prop types
AnimatedText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  size: PropTypes.number,
  bold: PropTypes.bool,
  center: PropTypes.bool,
  color: PropTypes.string,
  animated: PropTypes.bool,
};

// Default prop values
AnimatedText.defaultProps = {
  style: {},
  size: 14,
  bold: false,
  center: false,
  color: null,
  animated: false,
  children: '',
};

export default React.memo(AnimatedText);
