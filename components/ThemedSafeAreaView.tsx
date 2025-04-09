import {Edge, SafeAreaView} from "react-native-safe-area-context";
import {useColorScheme, ViewStyle} from "react-native";
import {Colors} from "@/constants/Colors";

interface Props {
    style?: ViewStyle;
    edges?: Edge[];
    children: React.ReactNode;
}

export function ThemedSafeAreaView({style, edges = ['top'], children}: Props) {
    const colorScheme = useColorScheme() ?? 'light';

    return (<SafeAreaView
            style={[{flex: 1, backgroundColor: Colors[colorScheme].background}, style]}
            edges={edges}
        >
            {children}
        </SafeAreaView>);
}