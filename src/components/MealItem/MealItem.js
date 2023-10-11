import { View, StyleSheet, Text, Alert } from "react-native";
import { Button } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons"
import useFoodStorage from "../../hooks/useFoodStorage";

export default function MealItem({calories, name, portion}){
    const {onSaveTodaysFood} = useFoodStorage();

    const handleAddTodayMeal = async () => {
        try {
            
            await onSaveTodaysFood(calories, name, portion)

            Alert.alert('Food added to the day')

        } catch (error) {
            Alert.alert("Unexpected error happened")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{name}</Text>
                <Text style={{fontSize: 16, color: '#808080'}}>{portion}</Text>
            </View>

            <View style={styles.rightContainer}>
                <Button 
                    icon={<Ionicons name="add-circle-outline" style={{fontSize: 22, marginRight: 10}}/>}
                    type="clear"
                    onPress={handleAddTodayMeal}
                />
                <Text style={{marginRight: 10, fontSize: 18}}>{calories} cal</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ade8af',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center'
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