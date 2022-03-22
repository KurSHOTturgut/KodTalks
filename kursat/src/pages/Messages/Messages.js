import React from 'react'
import { SafeAreaView, FlatList, View, Text, Image, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


//style
import styles from './Messages.style';

//components
import FloatingButton from '../../components/FloatingButton';
import ContentInputModal from '../../components/modal/InputModal';
import MessageCard from '../../components/card/MessageCard';

//parserData
import contentDataParser from '../../utils/roomsDataParser';

const Messages = ({ route }) => {
    const [inputModalVisible, setInputModalVisible] = React.useState(false)
    const [contentList, setContentList] = React.useState([]);
    const roomId = route.params.roomId;

    React.useEffect(() => {
        database()
            .ref(`/rooms/${roomId}/messsages`)
            .on("value", snapshot => {
                const contentData = snapshot.val();
                const parsedData = contentDataParser(contentData || []);
                setContentList(parsedData)
            });
    }, [])


    const handleAddMessageModalToggle = () => {
        setInputModalVisible(!inputModalVisible);
    }


    const handleSendContent = (content) => {
        sendContent(content);
        handleAddMessageModalToggle();
    }

    const sendContent = (content) => {
        const userMail = auth().currentUser.email;
        const contentObject = {
            text: content,
            username: userMail.split('@')[0],
            date: (new Date()).toISOString(),
        }

        database()
            .ref(`/rooms/${roomId}/messsages`)
            .push(contentObject);
    }

    const renderContent = ({ item }) => (
        <MessageCard
            message={item}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={contentList}
                renderItem={renderContent}
            />

            <FloatingButton icon="plus" onPress={handleAddMessageModalToggle} />

            <ContentInputModal
                visible={inputModalVisible}
                onClose={handleAddMessageModalToggle}
                onSend={handleSendContent}
                textPlaceholder="mesajınızı giriniz.."
                buttonText="Gönder"
            />
        </SafeAreaView>
    );
}


export default Messages;
