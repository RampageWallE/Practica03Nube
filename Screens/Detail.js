import { StyleSheet, Text, View, Button, Alert, Pressable} from "react-native";
import axios from 'axios';
import React, { useEffect, useState, useCallback} from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import Timer from "./Timer";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function Detail({route}){
    const {id, title, description} = route.params;
    const [data, setData] = useState([]);

    //CRONOMETRO
    const [ diff, setDiff ] = useState(null);
    const [ initial, setInitial ] = useState(null);
    const [ status, setStatus ] = useState(false);

    const tick = () => {
        setDiff(new Date( +new Date() - initial ))
    };
  
    const change = () => {
        if( status === false && initial === null ){
            setStatus(!status)
            setInitial( +new Date() )
        } else {
            setStatus(!status)
        }
    }

    React.useEffect(() => {
        let interval = null;
      
        if ( initial && status === false) {
          interval = setInterval(() => {
            setInitial((initial) => initial + 10);
          }, 10);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
      }, [status, initial]);


    // useEffect(() => {
    //     if(initial && status){
    //         requestAnimationFrame(tick)
    //     }
    // }, [initial, status]);
    
    // useEffect(() => {
    //     if (diff && status ) {
    //         requestAnimationFrame(tick);
    //     }
    // },[diff, status]);
    //CRONOMETRO

    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert('asdas')
        }
    }, []);
    
    const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
    }, []);
    useEffect( () => {
    
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    const options = {
      params: {
      language: "en-US",
      },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODIyYTYwYzY5OGY2YWExYTFlOTE3NWJmNjdlYmVjMiIsInN1YiI6IjY2MzJjYWM0YzYxNmFjMDEyMjE4YjM2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x5d8wczE5GnihUjp7dr_IehKsgJPUfANvTZKxh5G4N4'
      }
    };
    axios.get(url, options)
    .then( response => {
        setData(response.data.results);
    })
    .catch(error => {
        console.error('Error fetching data:', data);
    });

  }, []);

  return (
    <View style={styles.container}>
        <Text style={{marginTop:20, marginHorizontal: 20, textAlign:'center', fontWeight:'bold', fontSize:20}}>{title}</Text>
        <Text style={{margin: 20,textAlign:'justify', }}>{description}</Text>
        <View style={{alignItems: 'center'}}>
            <YoutubePlayer
                height={225}
                width={'91%'}
                play={playing}
                videoId={"6K1WhUepDOI"}
                onChangeState={onStateChange}
            />
        </View>
        <Button title={playing ? "pause" : "play"} onPress={() => {togglePlaying(), change()}}  />
        {/* <Timer/> */}
        <View style={styles.cronoContainer}>
            <Text styles={styles.timer}>{timeFormat(diff)}</Text>
            <Button onPress={change} title="cambiar"/>

        </View>
    </View>
  );
}

const timeFormat = (date) => {
    if(!date) return "00:00:00";

    let mm = date.getUTCMinutes();
    let ss = date.getSeconds();
    let cm = Math.round(date.getMilliseconds() / 10);

    mm = mm < 10 ? "0"+mm : mm;
    ss = ss < 10 ? "0"+ss : ss
    cm = cm < 10 ? "0"+cm : cm;

    return `${mm}:${ss}:${cm}`;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cronoContainer: {
        flex: 1,
        width: '90%',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        backgroundColor: 'yellow',
        width: 325,
        height: 200,

    }
}) 