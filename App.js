import {StatusBar} from 'expo-status-bar';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import {useState} from "react";

export default function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const openImagePickerAsync = async () => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled) {
            return;
        }

        setSelectedImage({localUri: pickerResult.uri})
    }

    const openShareDialogAsync = async () => {
        if (Platform.OS === 'web') {
            alert(`Uh oh, sharing isn't available on your platform`);

            return;
        }

        const imageTemp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
        await Sharing.shareAsync(imageTemp.uri);
    }

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: selectedImage.localUri}}
                    style={styles.thumbnail}
                />
                <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Share this photo</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.instructions}>
                To share a photo from your phone with a friend, just press the button below!
            </Text>
            <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        textAlign: "center",
        marginHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
});
