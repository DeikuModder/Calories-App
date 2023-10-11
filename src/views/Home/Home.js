import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import Ionicons from "@expo/vector-icons/Ionicons"
import { Button } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useFoodStorage from "../../hooks/useFoodStorage";
import { useCallback, useState } from "react";

export default function Home(){
    const {navigate} = useNavigation();
    const {onGetTodaysFood} = useFoodStorage();
    const [todaysFood, setTodaysFood] = useState([]);

    const handleAddCalories = () => {
        navigate("AddFood")
    }

    //the usecallback is used to keep the performance of the application, the usecallback will only return a memoized version of the component if it doesn't have any changes, otherwise it will render the component with the changes
    const loadTodaysFood = useCallback(async () => {
        try {
            
            const result = await onGetTodaysFood();
            setTodaysFood(result)

        } catch (error) {
           setTodaysFood([])
           console.error(error)
        }
    }, [])

    useFocusEffect(useCallback(() => {
        loadTodaysFood().catch(null)
    }, [loadTodaysFood]))

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.caloriesContainer}>
                <View style={styles.leftContainer}>
                    <Text style={{fontSize: 17}}>Calories</Text>
                </View>

                <View style={styles.rightContainer}>
                    <Button 
                        icon={<Ionicons name="add-circle-outline" style={{fontSize: 25, color: "#fff"}}/>}
                        radius="lg"
                        color="#4ecb71"
                        onPress={handleAddCalories}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    caloriesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    }
})