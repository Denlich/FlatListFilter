import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

import Paginator from './src/components/Paginator';

const width = Dimensions.get('window').width;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const scrollToIndex = (i) => {
    slidesRef.current.scrollToIndex({ animated: true, index: i})
  }

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const data = [
    { id: '1', text: 'meal' },
    { id: '2', text: 'popular' },
    { id: '3', text: 'plan' }
  ]

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={{flex: 1, width: width, justifyContent: 'center', alignItems: 'center'}}>
              <Text>{ item.text }</Text>
            </View>
          );
        }}
        
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        paddingEnabled
        snapToInterval={width}
        decelerationRate={'fast'}
        removeClippedSubviews={true}
        disableIntervalMomentum={true}
        scrollEnabled={false}

        onScroll={
          Animated.event([{ nativeEvent: { contentOffset: { x: pan.x } } }],
            {
              useNativeDriver: false,
            },
          )
        }
        onViewableItemsChanged={viewableItemsChanged}
        ref={slidesRef}
      />

      <Paginator 
        width={width}
        data={data} 
        pan={pan} 
        scrollToIndex={scrollToIndex} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
