import { ImgPaths } from "@/assets/ImgPaths";
import React, { useState } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  OtpSection: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const Login: React.FC<Props> = ({ navigation }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  console.log("values", values);
  console.log("styles", styles.button);
  return (
    <View style={styles.container}>
      <Image source={ImgPaths.authBgIcon} style={styles.backgroundImage}/>
      <Text style={styles.headText}>Login here</Text>
      <Text
        style={{
          ...styles.inputText,
          textAlign: "center",
          lineHeight: hp(2.5),
        }}
      >
        Welcome back you've been missed!
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSection}>
          <View style={styles.inputBoxSection}>
            <TextInput
              style={styles.inputBox}
              value={values.email}
              placeholder="Email"
              onChangeText={(email) => setValues({ ...values, email })}
            />
          </View>
        </View>
        <View style={styles.inputSection}>
          <View style={styles.inputBoxSection}>
            <TextInput
              style={styles.inputBox}
              value={values.password}
              placeholder="Password"
              onChangeText={(password) => setValues({ ...values, password })}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>
      <Text style={styles.linkText}>Forgot Password?</Text>
      <View style={{ width: "100%" }}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{ color: "white", fontWeight: "700" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontWeight: "700" }}>Create new account</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text
            style={{
              fontWeight: "900",
              color: "blue",
              textDecorationLine: "underline",
              textAlign: "center",
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.linkText}>or continue with</Text>
      </View>
      <View style={styles.imgContainer}>
        <View style={styles.imgSection}>
          <Image source={ImgPaths.googleIcon} style={styles.icon}></Image>
        </View>
        <View style={styles.imgSection}>
          <Image source={ImgPaths.fbIcon} style={styles.icon}></Image>
        </View>
        <View style={styles.imgSection}>
          <Image source={ImgPaths.appleIcon} style={styles.icon}></Image>
        </View>
      </View>
    </View>
  );
};

export default Login;

const colors = StyleSheet.create({
  CommonColor: {
    color: "#1F41BB",
  },
  CommonBackgroundColor: {
    backgroundColor: "#1F41BB",
  },
  inputColor: {
    backgroundColor: "#F1F4FF",
  },
});

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wp(100),
    height: hp(100),
    resizeMode: "cover",
  },
  imgContainer: {
    gap: 15,
    display: "flex",
    flexDirection: "row",
  },
  imgSection: {
    padding: 10,
    backgroundColor: "#ECECEC",
    borderRadius: 10,
  },
  icon: {
    width: wp(9.4),
    height: wp(9.3),
    resizeMode: "contain",
  },
  linkText: {
    ...colors.CommonColor,
    fontWeight: "600",
    textAlign: "right",
    width: "100%",
  },
  inputText: {
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "poppins",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    ...colors.CommonBackgroundColor,
    alignItems: "center",
    borderRadius: 10,
    color: "white",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  inputSection: {
    gap: "10",
    width: "100%",
  },
  inputBoxSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: hp(1),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    gap: 30,
    overflow: "hidden",
    backgroundColor: "white",
    height: "100%",
  },
  headText: {
    ...colors.CommonColor,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputBox: {
    ...colors.inputColor,
    fontSize: 14,
    // borderWidth: 1,
    borderRadius: 5,
    // height: 32,
    padding: 15,
    borderColor: "gray",
    flex: 1,
    flexDirection: "row",
  },
});
