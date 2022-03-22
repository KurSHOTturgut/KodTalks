import React, { useState } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { Formik, } from 'formik';//form işlemleri için
import auth from '@react-native-firebase/auth'; //db işlemleri
import { showMessage } from "react-native-flash-message";//toast message

//style
import styles from './Login.style';

//components
import Input from '../../../components/Input';
import Button from '../../../components/Button';


//error
import authErrorMessageParser from '../../../utils/authErrorMessageParser';



const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(false);


    const handleFormSubmit = async (form) => {
        try {
            setLoading(true);
            await auth()
                .signInWithEmailAndPassword(
                    form.usermail,
                    form.password
                )
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) });

            showMessage({
                message: "Giriş yapıldı!",
                type: "success",

            });
            navigation.navigate("MessagesPage");

        } catch (error) {
            showMessage({
                message: authErrorMessageParser(error.code),
                type: "danger",

            });

        }
        setLoading(false);

    };

    const handleSignUp = () => {
        navigation.navigate("SignPage");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header_container}>
                    <Text style={styles.header}>codetalks</Text>
                </View>

                <Formik
                    initialValues={{
                        usermail: '',
                        password: '',
                    }}
                    onSubmit={handleFormSubmit}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                    }) => (
                        <>
                            <Input
                                placeholder="e-postanızı giriniz.."
                                onChangeText={handleChange('usermail')}
                                errors={errors.usermail}
                                value={values.usermail}
                            />

                            <Input
                                placeholder="şifrenizi giriniz.."
                                onChangeText={handleChange('password')}
                                errors={errors.password}
                                value={values.password}
                                isSecure
                            />

                            <Button
                                text='Giriş Yap'
                                onPress={handleSubmit}
                                theme="primary"
                                loading={loading}
                            />
                        </>
                    )}
                </Formik>

                <Button
                    text='Kayıt Ol'
                    onPress={handleSignUp}
                    theme="secondary"
                />
            </ScrollView>
        </SafeAreaView>
    );
}


export default Login;
