import { StatusBar } from 'expo-status-bar'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  DangerPath,
  Indicator,
} from 'react-native-cool-speedometer'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Quantico-Regular': require('./assets/fonts/Quantico/Quantico-Regular.ttf'),
    'Aldrich-Regular': require('./assets/fonts/Aldrich/Aldrich-Regular.ttf'),
  })

  const [randomValue, setRandomValue] = useState(
    Math.floor(Math.random() * 101)
  )

  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 101))

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomValue(Math.floor(Math.random() * 101))
      setRandomNum(Math.floor(Math.random() * 101))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <StatusBar style="auto" />
        <View style={styles.speedometerBg}>
          <Speedometer
            accentColor="#000000"
            width={300}
            max={180}
            value={randomValue}
          >
            <Background color="#000000" opacity={1} />
            <Arc color="#ff0000" />
            <Needle color="#ff0000" />
            <Progress color="#11ff00" />
            <Marks />
            <Indicator>
              {(value) => <Text style={styles.indicator}>{value} km/h</Text>}
            </Indicator>
            <DangerPath />
          </Speedometer>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.information}>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Input Voltage (V)</Text>
              <Text style={styles.values}>{randomNum + 9}v</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Input Current (A)</Text>
              <Text style={styles.values}>{randomNum + 1}A</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Temperature (°C)</Text>
              <Text style={styles.values}>{randomNum + 13}°C</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Trip Distance (km)</Text>
              <Text style={styles.values}>{randomNum + 10}km</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Working Status</Text>
              <Text style={styles.values}>Medium</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Mode</Text>
              <Text style={styles.values}>Normal</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>AVS (km/h)</Text>
              <Text style={styles.values}>{randomNum + 78}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>MXS (km/h)</Text>
              <Text style={styles.values}>{randomNum + 8}km/h</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>ODO (km)</Text>
              <Text style={styles.values}>{randomNum + 11}km</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.text}>Remaining Distance (km)</Text>
              <Text style={styles.values}>{randomNum + 2}km</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2b2b2b',
  },
  speedometerBg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: '4%',
    width: '100%',
    height: '43%',
  },
  text: {
    fontFamily: 'Quantico-Regular',
    color: '#ffffff',
    fontSize: 15,
  },
  indicator: {
    position: 'absolute',
    bottom: -270,
    left: 100,
    color: 'white',
    fontSize: 25,
    fontFamily: 'Quantico-Regular',
    letterSpacing: 1,
  },
  information: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  infoBox: {
    width: '48%',
    height: 100,
    margin: '1%',
    padding: 5,
    backgroundColor: '#161616',
    borderRadius: 5,
  },
  values: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quantico-Regular',
    fontSize: 20,
    marginTop: 20,
  },
})
