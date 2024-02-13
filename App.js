import React, {View} from 'react-native'
import Signup from "./src/Signup"
import Login from "./src/Login"
const App = () =>{
    return(
        <View>
            <Login/>
            <Signup/>
        </View>
    );
}
export default App;