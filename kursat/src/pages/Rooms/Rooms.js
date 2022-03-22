import React from 'react'
import { SafeAreaView, Text, FlatList } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


//component
import FloatingButton from '../../components/FloatingButton';
import InputModal from '../../components/modal/InputModal';
import RoomsCard from '../../components/card/RoomsCard';


//style
import styles from './Rooms.style';


//parserData
import roomsDataParser from '../../utils/roomsDataParser';

const Rooms = ({ navigation }) => {
    const [addRoomsModalVisible, setAddRoomsModalVisible] = React.useState(false)
    const [roomsList, setRoomsList] = React.useState([]);

    React.useEffect(() => {
        database()
            .ref('/rooms/')
            .on("value", snapshot => {
                const roomsData = snapshot.val();
                const parsedData = roomsDataParser(roomsData || []);
                setRoomsList(parsedData)
            });
    }, []);


    const handleAddRoomsModalToggle = () => {
        setAddRoomsModalVisible(!addRoomsModalVisible);
    }


    const handleSendContent = (content) => {
        sendContent(content);
        handleAddRoomsModalToggle();
    }

    const sendContent = (content) => {
        const userMail = auth().currentUser.email;
        const contentObject = {
            room_name: content,
            username: userMail.split('@')[0],
            date: (new Date()).toISOString(),
        }

        database()
            .ref('/rooms/')
            .push(contentObject);
    }

    const handlePressRoom = (item) => {
        navigation.navigate('MessagesPage', { roomId: item.id })
    }

    const renderRooms = ({ item }) => (
        <RoomsCard
            name={item.room_name}
            onPress={() => handlePressRoom(item)}
        />);

    const keyExtractorRooms = (item) => item.id;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={styles.flatList_content}
                numColumns={2}
                data={roomsList}
                renderItem={renderRooms}
                keyExtractor={keyExtractorRooms}
            />
            <FloatingButton icon="plus" onPress={handleAddRoomsModalToggle} />

            <InputModal
                visible={addRoomsModalVisible}
                onClose={handleAddRoomsModalToggle}
                onSend={handleSendContent}
                textPlaceholder="oda ismi giriniz.."
                buttonText="Ekle"
            />
        </SafeAreaView>
    )
}

export default Rooms;
