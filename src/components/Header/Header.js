import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { View, StyleSheet, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"

const staticInfo = {
    name: 'Gabs',
    uri: 'https://avatars.githubusercontent.com/u/32990459?v=4'
}

export default function Header(){
    const {canGoBack, goBack} = useNavigation();

    return (
        <View style={styles.container}>
            {canGoBack() ? 
                <View style={styles.arrowBack}>
                    <Button 
                        icon={<Ionicons name="arrow-back" size={24}/>} 
                        type="clear"
                        onPress={() => goBack()}
                    />
                </View> 
                    : 
                undefined
            }

            <View style={styles.leftContainer}>
                <Text style={styles.title}>Hello {staticInfo.name}</Text>
                <Text style={styles.subtitle}>Welcome back to your goal!</Text>
            </View>

            <View style={styles.rightContainer}>
                <Image source={{uri: staticInfo.uri}} style={styles.img}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    img: {
        width: 45,
        height: 45,
        borderRadius: 100
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17
    }, 
    subtitle: {
        fontSize: 13,
        color: "#808080"
    },
    arrowBack: {
        marginLeft: -13
    }
})