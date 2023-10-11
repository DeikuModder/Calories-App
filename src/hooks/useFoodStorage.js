//this is a custom hook made to store all the methods for, save and get the items from this app to the local storage of the device, that's why we're using the AsyncStorage library

import AsyncStorage from "@react-native-async-storage/async-storage"
import { isToday } from "date-fns"

const MY_FOOD_KEY = "@MyFood:Key" //key to identify where the async storage is saving the items in the device

const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key' //same thing as before, this time only for the foods of the day

const useFoodStorage = () => {

    //this method will have the logic for saving things in the storage, so we can reutilizate it in other methods
    const saveInfoToTheStorage = async (storageKey, meal) => {
        try {
            //so first let's check for the saved foods we have with the key
            const currentSavedFood = await AsyncStorage.getItem(storageKey);
 
             //if currentSavedFood isn't null, it means it already has values stored inside it
            if (currentSavedFood !== null){
                 //then we need to parse the element that it's stored as a JSON to an actual array
                const currentSavedFoodParsed = JSON.parse(currentSavedFood);
 
                 //then this array will hold all the elements it already has, so we can manipulate this as an standard array, we are going to push the new food object to it.
                currentSavedFoodParsed.push(meal)
 
                 //Now, the object it's saved on the array locally, so we need to set it again on the local storage (we need to stringify the value again before), once again with the key that identifies this item on the storages
                await AsyncStorage.setItem(storageKey, JSON.stringify(currentSavedFoodParsed));
 
                 //we return the resolve of the promise
                return Promise.resolve()
            }
             
             //If currentSavedFood is null, it doesn't has any value stored yet, so we create the first array, with the first object, and then we can keep on pushing items to it
            await AsyncStorage.setItem(
                storageKey,
                JSON.stringify([meal])
            )
 
            return Promise.resolve()
 
        } catch (error) {
            return Promise.reject(error)
        }
    }

    //this method will have the logic for getting things from the storage
    const getInfoFromTheStorage =  async (storageKey) => {
        try {
            //it follows the same logic, check for the item on the storage, parse it to an object, so we can use it for our components in the rest of the app
            const foods = await AsyncStorage.getItem(storageKey)

            if (foods !== null){
                const parsedFood = JSON.parse(foods);
                return Promise.resolve(parsedFood)
            }
            
        } catch (error) {
            return Promise.reject(error)
        }
    }

    //the method for saving the food on the storage
    const handleSaveFood = async (calories, name, portion) => {
        try {
            
            const result = await saveInfoToTheStorage(MY_FOOD_KEY, {
                calories,
                name,
                portion
            });

            return Promise.resolve(result)

        } catch (error) {
            return Promise.reject(error)
        }
    }

    //so in here we'll get the food objects
    const handleGetFood = async () => {
        try {

            const result = await getInfoFromTheStorage(MY_FOOD_KEY)

            return Promise.resolve(result)
            
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleSaveTodaysFood = async (calories, name, portion) => {
        try {
            
            const result = await saveInfoToTheStorage(MY_TODAY_FOOD_KEY, 
            {
                calories,
                name,
                portion,
                date: new Date().toISOString(), //here we create a new date object to send it to the storage
            })

            return Promise.resolve(result)

        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleGetTodaysFood = async () => {
        try {

            const result = await getInfoFromTheStorage(MY_TODAY_FOOD_KEY);

            const todayMeals = result.filter(meal => meal.date && isToday(new Date(meal.date)))

            return Promise.resolve(todayMeals)
            
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return {
        onSaveFood: handleSaveFood,
        onGetFood: handleGetFood,
        onSaveTodaysFood: handleSaveTodaysFood,
        onGetTodaysFood: handleGetTodaysFood, 
    }
}

export default useFoodStorage