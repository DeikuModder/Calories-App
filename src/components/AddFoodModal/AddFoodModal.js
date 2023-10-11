import { Button, Input } from "@rneui/themed"
import { Modal, StyleSheet, Text, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useState } from "react"
import useFoodStorage from "../../hooks/useFoodStorage";

export default function AddFoodModal({onClose, visible}){
    const [foodName, setFoodName] = useState("");
    const [foodPortion, setFoodPortion] = useState("");
    const [calories, setCalories] = useState("");
    const { onSaveFood } = useFoodStorage();

    useEffect(() => {   //el useeffect resetea los setters en caso de que el modal no sea visible
        setFoodName('')
        setFoodPortion('')
        setCalories('')
    }, [visible])

    const handleAdding = async () => {
        try {

            await onSaveFood(calories, foodName, foodPortion)

            onClose(true);

        } catch (error) {
            console.error(error)

            onClose(true);
        }
    }
    
    return (
        <Modal visible={visible} onRequestClose={() => onClose(false)} transparent animationType="fade">
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.closeContainer}>
                        <Button 
                            icon={<Ionicons name="close" size={28}/>}
                            onPress={() => onClose(false)}
                            type="clear"
                        />
                    </View>

                    <Text style={{fontSize: 20, marginLeft: 10}}>Add Food</Text>

                    <View style={styleForm.form}>
                        <View style={styleForm.leftContainer}>
                            <Input value={calories} onChangeText={text => setCalories(text)}/>
                        </View>

                        <View style={styleForm.rightContainer}>
                            <Text>CAL</Text>
                        </View>
                    </View>

                    <View style={styleForm.form}>
                        <View style={styleForm.leftContainer}>
                            <Input value={foodName} onChangeText={text => setFoodName(text)}/>
                        </View>

                        <View style={styleForm.rightContainer}>
                            <Text>Name</Text>
                        </View>
                    </View>

                    <View style={styleForm.form}>
                        <View style={styleForm.leftContainer}>
                            <Input value={foodPortion} onChangeText={text => setFoodPortion(text)}/>
                        </View>

                        <View style={styleForm.rightContainer}>
                            <Text>Portion</Text>
                        </View>
                    </View>

                    <View style={styles.addContainer}>
                        <Button 
                            title="Add"
                            icon={<Ionicons name="add" size={28} color="#fff"/>}
                            radius="lg"
                            color="#4ecb71"
                            onPress={handleAdding}
                            disabled={
                                calories.trim() === '' ||     //trim se usa para borrar los espacios
                                foodName.trim() === "" || 
                                foodPortion.trim() === ""
                            }
                        />
                    </View>                  
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:  'rgba(0, 0, 0, 0.5)'
    },
    content: {
        width: '75%',
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,

        elevation: 5,     //this works only for android

        shadowColor: '#000',    ///this works only for ios
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    closeContainer: {
        alignItems: 'flex-end'
    },
    addContainer: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 10
    }

})

const styleForm = StyleSheet.create({
    form: {
        flexDirection: "row",
        alignItems: "center"
    },
    leftContainer: {
        flex: 1
    },
    rightContainer: {
        flex: .5,
    }
})