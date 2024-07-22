import React from 'react';
import {
  View, StyleSheet, FlatList, Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useTheme, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Text from './Text';
import Book from './Book';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function EmptyList({
  onPress, text, styles, iconColor,
}) {
  return (
    <Pressable onPress={onPress} style={styles.emptyContainer}>
      <AntDesign color={iconColor} size={27} name="book" />
      <Text size={16} center style={styles.emptyText}>
        {text}
      </Text>
    </Pressable>
  );
}

EmptyList.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    emptyContainer: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
      .isRequired,
    emptyText: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
      .isRequired,
  }).isRequired,
  iconColor: PropTypes.string.isRequired,
};

// horizontal flatlist of books
function BookList({ books, title }) {
  const { width, margin, colors } = useTheme();
  const navigation = useNavigation();
  const scrollX = useSharedValue(0);

  // handle horizontal scroll
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollX.value = contentOffset.x;
    },
  });

  // go to search screen
  const searchScreen = () => {
    navigation.push('BookSearch');
  };

  // all styles
  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.card,
      paddingTop: title === 'Reading' ? margin : 0,
    },
    heading: {
      paddingTop: margin,
      paddingHorizontal: margin,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listContainer: {
      padding: margin,
    },
    emptyContainer: {
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: width - margin * 2,
      paddingVertical: margin * 3,
      backgroundColor: colors.background,
    },
    emptyText: {
      padding: margin,
    },
  });

  // render book list
  return (
    <View style={styles.list}>
      <View style={styles.heading}>
        <Text size={17} bold>
          {title}
        </Text>
        <Text size={17}>{books.length}</Text>
      </View>
      <AnimatedFlatList
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={books}
        keyExtractor={(i) => i.bookId}
        renderItem={({ item, index }) => (
          <Pressable>
            <Book book={item} index={index} scrollX={scrollX} />
          </Pressable>
        )}
        ListEmptyComponent={(
          <EmptyList
            onPress={searchScreen}
            text="I'm lonely. Add something here."
            styles={styles}
            iconColor={colors.text}
          />
        )}
      />
    </View>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      bookId: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      bookTitleBare: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default React.memo(BookList);
