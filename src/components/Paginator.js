import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

export default function Paginator({ width, data, pan, scrollToIndex }) {
  return (
    <View style={{flexDirection: 'row'}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const active = pan.x.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp'
        });

        const inactive = pan.x.interpolate({
          inputRange,
          outputRange: [1, 0, 1],
          extrapolate: 'clamp'
        })

        return (
          <View key={i.toString()}>
            {/* active */}
            <Animated.View style={{opacity: active, backgroundColor: '#7DBF7A', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 999, zIndex: 0}}>
              <Text style={{color: '#fff'}}>{ _.text }</Text>
            </Animated.View>

            {/* unactive */}
            <Animated.View style={{position: 'absolute', opacity: inactive, zIndex: 1}}>
              <TouchableWithoutFeedback onPress={() => {
                scrollToIndex(i)
              }}>
                <View style={{backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 999}}>
                  <Text style={{color: '#000'}}>{ _.text }</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
}