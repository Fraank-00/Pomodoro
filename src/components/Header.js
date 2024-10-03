import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Estudio", "Descanso", "Descanso Largo"];

export default function Header({ currentTime, setCurrentTime, setTime }) {

    function handlePress(index) {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={styles.container}>
            {options.map((item, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => handlePress(index)} 
                    style={[styles.itemStyle ,currentTime !== index && {borderColor: "transparent"}]}
                >
                    <Text style={{fontWeight:"bold"}}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    itemStyle: {
        width: "33%",
        borderWidth: 3,
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
        borderColor : "white",
        marginVertical: 20 ,
    },
});
