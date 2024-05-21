import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Detail from "./Detail";

const Movie = ({item}) => {
  return(
    <View style={styles.movieContainer}>
    <Text style={styles.title}>{item.title}</Text>
    <Image
      style={{width: 200, height: 300, alignSelf: 'center'}}
      source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }}
    />
    <Text>Adulto: {item.adult ? 'SI' : 'No' }</Text>
    <Text>{item.id}</Text>
    <Text>{item.video_path}</Text>
    <Text>Descripcion:{'\n'}{item.overview}</Text>
  </View>
  )

} 

const styles = StyleSheet.create({
    movieContainer: {
        backgroundColor: 'yellow',
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 16,
      },
      title: {
        alignSelf: 'center',
        fontWeight: 'bold',
      },  
})
export default Movie;