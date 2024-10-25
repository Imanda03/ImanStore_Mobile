import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');
const BANNER_HEIGHT = 180;
const AUTOPLAY_DELAY = 3000; // 3 seconds between slides

interface BannerProps {
  images: string[];
  onPress?: (index: number) => void;
}

const AnimatedBanner: React.FC<BannerProps> = ({images, onPress}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<any>(null);
  const slideTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto play functionality
  const startAutoPlay = () => {
    slideTimer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      slidesRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, AUTOPLAY_DELAY);
  };

  // Setup auto play
  useEffect(() => {
    startAutoPlay();
    return () => {
      if (slideTimer.current) {
        clearInterval(slideTimer.current);
      }
    };
  }, [currentIndex]);

  // Handle manual scroll
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        if (roundIndex !== currentIndex) {
          setCurrentIndex(roundIndex);
        }
      },
    },
  );

  // Handle when user starts/ends touching the banner
  const handleTouchStart = () => {
    if (slideTimer.current) {
      clearInterval(slideTimer.current);
    }
  };

  const handleTouchEnd = () => {
    startAutoPlay();
  };

  const renderDots = () => {
    return (
      <View style={styles.pagination}>
        {images.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={slidesRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={`banner-${index}`}
            activeOpacity={0.9}
            onPress={() => onPress?.(index)}>
            <View style={styles.slide}>
              <Image
                source={{uri: image}}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.gradient} />
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    backgroundColor: '#fff',
    marginVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  slide: {
    width,
    height: BANNER_HEIGHT,
    position: 'relative',
  },
  image: {
    width,
    height: BANNER_HEIGHT,
    borderRadius: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AnimatedBanner;
