import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, Touchable, View } from "react-native";

const Timer = () => {

    const [ diff, setDiff ] = useState(null);
    const [ initial, setInitial ] = useState(null);

    const tick = () => {
        setDiff(new Date( +new Date() - initial ))
    };

    const start = () => {
        setInitial( +new Date() )
    }

    useEffect(() => {
        if(initial){
            requestAnimationFrame(tick)
        }
    }, [initial]);
    

    useEffect(() => {
        if (diff) {
            requestAnimationFrame(tick);
        }
    },[diff]);

    return (
        <Pressable style={styles.container} onPress={start}>
            <Text styles={styles.timer}>{timeFormat(diff)}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
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

export default Timer;