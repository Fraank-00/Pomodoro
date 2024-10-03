
import { StyleSheet, Text, View, Button, Platform, SafeAreaView, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ["#F7DC6F","#A2D9CE","#D7BDE2"];

export default function App() {
  const[isWorking ,setIsWorking] = useState(false);
  const[time ,setTime] = useState(25*60);
  const[currentTime ,setCurrentTime] = useState("ESTUDIO"| "DESCANSO"| "DESCANSO LARGO" );
  const[isActive ,setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1) ;
      },1000)
    }else{
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
  
      setIsWorking((prevIsWorking) => {
          const newIsWorking = !prevIsWorking; 
          setTime(newIsWorking ? 300 : 1500); 
          return newIsWorking;
      })};
  
  

   return () => clearInterval(interval);

  }, [isActive, time])

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

   async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/pick-92276.mp3")
    )
    await sound.playAsync();
  }
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <View style={{paddingHorizontal:15, 
        paddingTop: Platform.OS === "android" && 30,
        flex:1 , }} >
       <Text style={styles.tex}>Pomodoro</Text>
  
        <Header currentTime={currentTime} 
         setCurrentTime={setCurrentTime} 
         setTime={setTime}
        />
        <Timer  time={time}/>
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
        <Text style={{color:"white",fontVariant:"bold"}}>{isActive ? "STOP": "START"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tex: {
    fontSize: 33,
    fontWeight: "bold"
  },
  button:{
    backgroundColor: "#333333",
    alignItems: "center",
    padding: 15,
    marginTop: 15 ,
    borderRadius:15,
  }
});
