/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from './tools/constants';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import DrawerContent from './DrawerContent';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import HomeScreen from './screens/Home';
import AboutScreen from './screens/About';
import AccountScreen from './screens/Account';
import LanguageScreen from './screens/Language';
import RegisterScreen from './screens/Auth/register';
import LoginScreen from './screens/Auth';
import PasswordResetScreen from './screens/Auth/password-reset';
import SplashScreen from './screens/Home/splash_screen';
import PDFViewerScreen from './screens/Home/pdf_viewer';
import VideoPlayerScreen from './screens/Home/video_player';

const StackNav = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { userInfo, splashLoading } = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                statusBarColor: COLORS.dark_danger,
                headerStyle: {
                    backgroundColor: COLORS.danger
                },
                headerTintColor: COLORS.white,
                headerTitleAlign: 'center'
            }}>
            {splashLoading ? (
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
            ) : (
                <>
                    <Stack.Screen name='Home_' component={HomeScreen} options={{
                        title: t('navigation.home'),
                        headerLeft: () => {
                            return (
                                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                    <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='menu' />
                                </TouchableOpacity>
                            );
                        },
                        headerRight: () => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('Language')}>
                                    <MaterialCommunityIcons style={{ fontSize: 30, color: COLORS.white }} name='translate' />
                                </TouchableOpacity>
                            );
                        }
                    }} />
                    <Stack.Screen name='About' component={AboutScreen} options={{ headerShown: false, title: t('navigation.about') }} />
                    <Stack.Screen name='PDFViewer' component={PDFViewerScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='VideoPlayer' component={VideoPlayerScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Language' component={LanguageScreen} options={{ title: t('change_lang') }} />
                    <Stack.Screen name='Account' component={AccountScreen} options={{ title: t('navigation.account') }} />
                    <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false, title: t('register') }} />
                    <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false, title: t('login') }} />
                    <Stack.Screen name='PasswordReset' component={PasswordResetScreen} options={{ headerShown: false, title: t('auth.password.reset') }} />
                </>
            )}
        </Stack.Navigator>
    );
};

const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{ headerShown: false }}>
            <Drawer.Screen name='Home' component={StackNav} />
        </Drawer.Navigator>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <NavigationContainer>
                <DrawerNav />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
