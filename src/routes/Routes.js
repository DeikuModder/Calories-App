import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../views/Home/Home";
import AddFood from "../views/AddFood/AddFood"

const Stack = createNativeStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="AddFood" component={AddFood}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}