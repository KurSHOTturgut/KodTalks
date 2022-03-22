import React, { useState } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { Formik, } from 'formik';//form işlemleri için
import auth from '@react-native-firebase/auth'; //db işlemleri
import { showMessage } from "react-native-flash-message";//toast message

//style
import styles from './Sign.style';

//components
import Input from '../../../components/Input';
import Button from '../../../components/Button';


//error
import authErrorMessageParser from '../../../utils/authErrorMessageParser';



const Sign = ({ navigation }) => {
    const [loading, setLoading] = useState(false);


    const handleFormSubmit = async (form) => {
        try {
            setLoading(true);
            if (form.password !== form.repassword) {
                showMessage({
                    message: "Şifreler uyuşmuyor!",
                    type: "danger",
                });
            } else {
                await auth()
                    .createUserWithEmailAndPassword(
                        form.usermail,
                        form.password
                    );

                showMessage({
                    message: "Kullanıcı oluşturuldu!",
                    type: "success",

                });
                navigation.navigate("LoginPage");
            }

        } catch (error) {
            console.log(error)
            showMessage({
                message: authErrorMessageParser(error.code),
                type: "danger",
            });
        }
        setLoading(false);

    };

    const handleLogin = () => {
        navigation.goBack();
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
                        repassword: '',
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

                            <Input
                                placeholder="şifrenizi tekrar giriniz.."
                                onChangeText={handleChange('repassword')}
                                errors={errors.repassword}
                                value={values.repassword}
                                isSecure
                            />

                            <Button
                                text='Kayıt Ol'
                                onPress={handleSubmit}
                                theme="primary"
                                loading={loading}
                            />
                        </>
                    )}
                </Formik>

                <Button
                    text='Geri'
                    onPress={handleLogin}
                    theme="secondary"
                />
            </ScrollView>
        </SafeAreaView>
    );
}


export default Sign;
