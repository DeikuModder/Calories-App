import { Text, View, Alert, ScrollView, StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import { Button, Input } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons"
import AddFoodModal from "../../components/AddFoodModal/AddFoodModal";
import { useState } from "react";
import useFoodStorage from "../../hooks/useFoodStorage";
import MealItem from "../../components/MealItem/MealItem";
import { useEffect } from "react";

export default function AddFood(){
    const [isVisible, setIsVisible] = useState(false);
    const [foods, setFoods] = useState([]) //will hold the foods object from local storage
    const [search, setSearch] = useState('')
    const { onGetFood } = useFoodStorage();

    const loadFoods = async () => {
        //here we are going to get the saved items on the storage
        try {               
            const foodResponse = await onGetFood()
            setFoods(foodResponse)
        } catch (error) {
            Alert.alert("Unexpected error")
        }
    }

    const handleModalClose = async (shouldUpdate) => {
        if (shouldUpdate){
            Alert.alert("Food Saved!")

            loadFoods();
        }

        setIsVisible(false)
    }

    //in here we will get one more time the array with the results, in case the other one it's already filtered
    const handleSearching = async () => {
        try {           
            const results = await onGetFood();
            setFoods(results.filter(item => 
                item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim())))

        } catch (error) {
            console.error(error)
            setFoods([])
        }
    }

    //the use effect to charge the foods info once the component is mounted
    useEffect(() => {
        loadFoods().catch(null)
    }, [])

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.addFoodContainer}>

                <View style={styles.leftContainer}>
                    <Text style={{fontSize: 17}}>Add Food</Text>
                </View>

                <View style={styles.rightContainer}>
                    <Button 
                        icon={<Ionicons name="add-circle-outline" style={{fontSize: 25, color: "#fff"}}/>}
                        radius="lg"
                        color="#4ecb71"
                        onPress={() => setIsVisible(true)}
                    />
                </View>

            </View>

            <View style={styles.searchFoodContainer}>
                <View style={styles.inputContainer}>
                    <Input 
                        placeholder="apples, pies, soda..."
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>

                <Button 
                    title='Search' 
                    radius="lg" 
                    color="#ade8af" 
                    titleStyle={{color: '#000', fontSize: 15}}
                    onPress={handleSearching}
                />
        
            </View>

            {/* render the component with the info, only if foods it's not undefined */}
            <ScrollView style={styles.content}> 
                {foods !== undefined ? foods.map(meal => {
                    return (
                        <MealItem 
                            key={`meal-item-${meal.name}`}
                            {...meal}
                        />
                    )
                }) : undefined}
            </ScrollView>

            <AddFoodModal visible={isVisible} onClose={handleModalClose}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "#fff"
    },
    addFoodContainer: {
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
    },


    searchFoodContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: -13
    },
    content: {
        flex: 1
    }
})