import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOS from '../constants/colors'
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Predict from '../screens/Predict';
const Tab = createBottomTabNavigator();

const tabs = [
    {
        name: 'Home',
        component: Home,
        label: 'Home',
        icon: 'home',
        inActiveIcon: 'home-outline'
    },
    {
        name: 'Scan',
        component: Predict,
        label: 'Scan',
        icon: 'magnify-scan',
        inActiveIcon: 'line-scan'
    },
    {
        name: 'Profile',
        component: Profile,
        label: 'Profile',
        icon: 'account',
        inActiveIcon: 'account-outline'
    },
];

const { width } = Dimensions.get('window');
const MARGIN = 13;
const TAB_BAR_WIDTH = width - 2 * MARGIN;
const TAB_WIDTH = (TAB_BAR_WIDTH / tabs.length);

function MyTabBar({ state, descriptors, navigation }) {
    const [translateX] = useState(new Animated.Value(0));
    const translateTab = (index) => {
        Animated.spring(translateX, {
            toValue: index * TAB_WIDTH,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        translateTab(state.index)
    }, [state.index])
    return (
        <View style={styles.tabBarContainer}>
            <Animated.View style={styles.slidingTabContainer}>
                <Animated.View style={[styles.slidingTab, { transform: [{ translateX }] }]} />
            </Animated.View>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                const tabBarIcon = options.tabBarIcon;
                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused && { selected: true }}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center' }}
                    >
                        <TabIcon tabIcon={tabBarIcon} isFocused={isFocused} label={label} index={state.index} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const TabIcon = ({ isFocused, tabIcon, label, index }) => {
    const [translateY] = useState(new Animated.Value(0));
    const translateIcon = (val) => {
        Animated.spring(translateY, {
            toValue: val,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        if (isFocused)
            translateIcon(-14);
        else
            translateIcon(0);
    }, [index])
    return (
        <>
            <Animated.View style={{ transform: [{ translateY }] }}>
                <Icon name={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon} size={28} color={isFocused ? COLOS.white : COLOS.black} />
            </Animated.View>
            <Text style={{ color: isFocused ? COLOS.primary : COLOS.black, fontWeight: 'bold' }}>
                {label}
            </Text>
        </>
    );
}

const Bottom = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                header: () => null,
                tabBarHideOnKeyboard: true,
            }}
            tabBar={props => <MyTabBar {...props} />}>
            {tabs.map((tab, index) => (
                <Tab.Screen
                    key={index}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarShowLabel: false,
                        tabColor: COLOS.primary,
                        tabBarIcon: { activeIcon: tab.icon, inActiveIcon: tab.inActiveIcon }
                    }}
                />
            ))}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        width: '94%',
        height: 60,
        position: 'absolute',
        alignSelf: 'center',
        bottom: MARGIN,
        backgroundColor: COLOS.white,
        elevation: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    slidingTabContainer: {
        width: TAB_WIDTH,
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
    },
    slidingTab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLOS.primary,
        bottom: 25,
        borderWidth: 4,
        borderColor: COLOS.white
    }
});
export default Bottom