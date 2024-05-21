import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movie from './Movie';


const MY_STORAGE = 'language';

export default function Index(props) {
  
  const [data, setData] = useState([]);
  
  useEffect( () => {
    const url = 'https://api.themoviedb.org/3/discover/movie';
    const options = {
      params: {
      include_adult: true, 
      include_video: true,
      language: "en",
      page: 20,
      sort_by: 'popularity.desc'
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

  const renderItem = ({ item }) => {
    return(
      <Pressable onPress={()=>props.navigation.navigate('Detail', {title: item.title, id: item.id, description: item.overview})}>
      {/* <Button onPress={()=>{props.navigation.navigate('Detail')}}title='Detalle'></Button> */}
      <Movie item={item}/>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.header}>Lista de Peliculas</Text>
      <FlatList 
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem = {renderItem} 
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#252850',	
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginVertical: 25,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})