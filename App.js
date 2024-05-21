import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import Index from './Screens/Index'
import Detail from "./Screens/Detail";
import Movie from "./Screens/Movie";

const Tab = createBottomTabNavigator();  
const Stack = createStackNavigator(); 

function Stacks() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Tabs' component={Tabs}/>
            <Stack.Screen name='Detail' component={Detail} options={{headerShown: true}}/>
            <Stack.Screen name='Movie' component={Movie} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}   
function Tabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Index' component={Index} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

export default function App(){
    return(
        <NavigationContainer>
            <Stacks/>        
        </NavigationContainer>
    )
}