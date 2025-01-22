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
import CustomInput from "../Common/CustomInput";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  OtpSection: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "OtpSection">;
const Otpscreen: React.FC = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [count, setCount] = useState(0);
  const [isVerfication, setIsVerification] = useState(false);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  //   console.log("values", values);
  //   console.log("styles", styles.button);
  console.log(isVerfication, "isVerfication");

  const { textInput, errorInput } = styles;
  const inputStyle = [textInput];
  console.log(textInput);

  return (
    <View style={styles.container}>
      <Image source={ImgPaths.authBgIcon} style={styles.backgroundImage} />
      <Image
        source={ImgPaths.OtpBgIcon}
        style={{
          position: "relative",
          width: wp(70),
          height: hp(40),
          top: hp(3),
          resizeMode: "cover",
        }}
      />
      <Text style={styles.headText}>OTP Verification</Text>
      {isVerfication ? (
        <>
          {/* <View> */}
          <Text
            style={{
              ...styles.inputText,
              textAlign: "center",
              lineHeight: hp(2.5),
            }}
          >
            Enter the otp sent to +91-9023109872
          </Text>
          <View>
            <CustomInput
              pinCount={4}
              //   onCodeChanged={(otp: any) => formik.setFieldValue('otp', otp)}
              //   code={formik.values.otp}
              autoFocusOnLoad={false}
              textInputStyle={styles.otpInput}
              style={{
                display: "flex",
                flexDirection: "row",
                // width: wp(80),
                // height: hp(6),
                // margin: 10,
                // backgroundColor: 'red',
                // marginVertical: hp(2),
              }}
              //   onCodeFilled={verifyOTP}
            />
          </View>
          <View>
            <Text style={{ color: "#B9B9B9" }}>
              Didn't you receive the OTP?{" "}
              <Text style={{ color: "#1D3BFF", fontWeight: "bold",textDecorationLine: 'underline'}}>
                Resend OTP
              </Text>
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsVerification(true)}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Verify</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </>
      ) : (
        <>
          {/* <View> */}
          <Text
            style={{
              ...styles.inputText,
              textAlign: "center",
              lineHeight: hp(2.5),
            }}
          >
            We will send you one-time password to your mobile number
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputSection}>
              <View style={styles.inputBoxSection}>
                <TextInput
                  style={styles.inputBox}
                  value={values.password}
                  placeholder="Enter mobile number"
                  onChangeText={(password) =>
                    setValues({ ...values, password })
                  }
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsVerification(true)}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Get OTP</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </>
      )}
    </View>
  );
};

export default Otpscreen;

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
  textInput: {
    height: "100%",
    width: "10%",
    borderColor: "red",
    borderBottomWidth: 1,
    borderRadius: wp(0),
    // justifyContent: "center",
    // alignItems: "center",
    // textAlignVertical: "center",
    // backgroundColor:'red'
    borderWidth: 2,
  },
  errorInput: {
    borderBottomColor: "red",
  },
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
    marginTop: hp(5),
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
    // justifyContent: "center",
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
  otpInput: {
    // backgroundColor: 'red',
    borderWidth: wp(0.2),
    borderRadius: hp(1),
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
