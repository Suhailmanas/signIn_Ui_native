//@ts-nocheck
import React, { Component, RefObject } from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  I18nManager,
  StyleSheet,
} from "react-native";
// import Clipboard from '@react-native-clipboard/clipboard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import {Color, FontSize, hp, wp} from '../../Theme';
import { isAutoFillSupported, codeToArray } from "../Common/NativeHelper";

interface OTPInputProps {
  pinCount: number;
  codeInputFieldStyle?: any;
  codeInputHighlightStyle?: any;
  onCodeFilled?: (code: string) => void;
  onCodeChanged?: (code: string) => void;
  autoFocusOnLoad?: boolean;
  code?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  keyboardType?: "default" | "email-address" | "number-pad" | "phone-pad";
  placeholderCharacter?: string;
  placeholderTextColor?: string;
  style?: any;
  selectionColor?: string;
  clearInputs?: boolean;
  keyboardAppearance?: "default" | "dark" | "light";
  textInputStyle?: any;
  error?: any;
  disabled?: boolean;
}

interface OTPInputState {
  digits: string[];
  selectedIndex: number;
}

export default class CustomInput extends Component<
  OTPInputProps,
  OTPInputState
> {
  static defaultProps: OTPInputProps = {
    pinCount: 6,
    autoFocusOnLoad: true,
    secureTextEntry: false,
    editable: true,
    keyboardAppearance: "default",
    keyboardType: "number-pad",
    clearInputs: false,
    placeholderCharacter: "",
    selectionColor: "",
  };

  keyboardDidHideListener: any;
  timer: NodeJS.Timeout | undefined;
  hasCheckedClipBoard = false;
  clipBoardCode = "";
  fields: never[];

  constructor(props: OTPInputProps) {
    super(props);
    const { code } = props;
    this.fields = [];
    this.state = {
      digits: codeToArray(code ?? ""),
      selectedIndex: props.autoFocusOnLoad ? 0 : -1,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: OTPInputProps) {
    const { code } = this.props;
    if (nextProps.code !== code) {
      this.setState({ digits: codeToArray(nextProps.code ?? "") });
    }
  }

  componentDidMount() {
    this.copyCodeFromClipBoardOnAndroid();
    setTimeout(() => this.bringUpKeyBoardIfNeeded(), 100);
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.keyboardDidHideListener?.remove();
  }

  copyCodeFromClipBoardOnAndroid = () => {
    if (Platform.OS === "android") {
      // this.checkPinCodeFromClipBoard();
      // this.timer = setInterval(this.checkPinCodeFromClipBoard, 400);
    }
  };

  bringUpKeyBoardIfNeeded = () => {
    const { autoFocusOnLoad, pinCount } = this.props;
    const digits = this.getDigits();
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (focusIndex < pinCount && autoFocusOnLoad) {
      this.focusField(focusIndex);
    }
  };

  getDigits = () => {
    const { digits: innerDigits } = this.state;
    const { code } = this.props;
    return code === undefined ? innerDigits : code.split("");
  };

  handleKeyboardDidHide = () => {
    this.blurAllFields();
  };

  notifyCodeChanged = () => {
    const { digits } = this.state;
    const code = digits.join("");
    const { onCodeChanged } = this.props;
    if (onCodeChanged) {
      onCodeChanged(code);
    }
  };

  // checkPinCodeFromClipBoard = () => {
  //   const {pinCount, onCodeFilled} = this.props;
  //   const regexp = new RegExp(`^\\d{${pinCount}}$`);
  //   Clipboard.getString()
  //     .then(code => {
  //       if (
  //         this.hasCheckedClipBoard &&
  //         regexp.test(code) &&
  //         this.clipBoardCode !== code
  //       ) {
  //         this.setState(
  //           {
  //             digits: code.split(''),
  //           },
  //           () => {
  //             this.blurAllFields();
  //             this.notifyCodeChanged();
  //             onCodeFilled && onCodeFilled(code);
  //           },
  //         );
  //       }
  //       this.clipBoardCode = code;
  //       this.hasCheckedClipBoard = true;
  //     })
  //     .catch(() => {});
  // };

  basicValidation = (text: string) => {
    const validText = /^[0-9]+$/;
    return text.match(validText);
  };

  handleChangeText = (index: number, text: string) => {
    if (text && !this.basicValidation(text)) {
      return;
    }

    const { onCodeFilled, pinCount } = this.props;
    const digits = this.getDigits();
    let newDigits = digits.slice();

    newDigits[index] = text; // Set the new digit in the corresponding index

    this.setState({ digits: newDigits }, this.notifyCodeChanged); // Update the state with new digits

    const result = newDigits.join("");

    if (result.length >= pinCount) {
      onCodeFilled && onCodeFilled(result);
      this.focusField(pinCount); // Focus on the last field
      this.blurAllFields();
      // Blur all fields after the last digit is entered
    } else {
      if (text.length > 0 && index < pinCount - 1) {
        this.focusField(index + 1); // Focus the next field
      }
    }
  };

  handleKeyPressTextInput = (index: number, key: string) => {
    const digits = this.getDigits();
    if (key === "Backspace") {
      if (!digits[index] && index > 0) {
        this.handleChangeText(index - 1, "");
        this.focusField(index - 1);
      }
    }
  };

  focusField = (index: number) => {
    if (index < this.fields.length && this.fields[index]) {
      this.fields[index].focus(); // No need to use .current here as we are not using RefObject
      this.setState({
        selectedIndex: index,
      });
    }
  };

  blurAllFields = () => {
    this.fields.forEach((field) => field.current?.blur());
    this.setState({
      selectedIndex: -1,
    });
  };

  clearAllFields = () => {
    const { clearInputs, code } = this.props;
    if (clearInputs && code === "") {
      this.setState({ digits: [], selectedIndex: 0 });
    }
  };

  renderOneInputField = (_: any, index: number) => {
    const {
      codeInputFieldStyle,
      secureTextEntry,
      editable,
      keyboardType,
      selectionColor,
      keyboardAppearance,
      textInputStyle,
      error,
      style,
    } = this.props;
    const { textInput, errorInput } = styles;
    const { digits } = this.state;
    const { clearInputs, placeholderCharacter, placeholderTextColor } =
      this.props;
    const { color: defaultPlaceholderTextColor = "black" } = {
      ...textInput,
      ...codeInputFieldStyle,
    };
    const inputStyle = [textInput, textInputStyle];
    console.log("inputStyleinputStyle", inputStyle);

    return (
      <View key={index + "view"} testID="inputSlotView">
        <View style={styles.shadow}>
          <TextInput
            testID="textInput"
            underlineColorAndroid="rgba(0,0,0,0)"
            ref={(ref) => {
              this.fields[index] = ref;
            }}
            onChangeText={(text) => {
              this.handleChangeText(index, text);
            }}
            onKeyPress={({ nativeEvent: { key } }) => {
              this.handleKeyPressTextInput(index, key);
            }}
            value={!clearInputs ? digits[index] ?? "" : ""}
            keyboardAppearance={keyboardAppearance}
            keyboardType={keyboardType}
            textContentType={isAutoFillSupported ? "oneTimeCode" : "none"}
            selectionColor={selectionColor}
            secureTextEntry={secureTextEntry}
            editable={editable}
            placeholder={placeholderCharacter}
            placeholderTextColor={
              placeholderTextColor || defaultPlaceholderTextColor
            }
            style={[inputStyle]}
            maxLength={1}
          />
        </View>
      </View>
    );
  };

  render() {
    const { pinCount, style, clearInputs } = this.props;
    const digits = this.getDigits();
    return (
      <TouchableWithoutFeedback
        style={style}
        onPress={() => {
          if (clearInputs) {
            let filledPinCount = digits.filter((digit) => {
              return digit !== null && digit !== undefined;
            }).length;

            this.focusField(Math.min(filledPinCount, pinCount - 1));
          } else {
            this.clearAllFields();
            this.focusField(0);
          }
        }}
        testID="clickToFocus"
      >
        <View style={[styles.container, style]} testID="textInputContainer">
          {new Array(pinCount).fill(0).map(this.renderOneInputField)}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignSelf: 'flex-start',
    // alignItems: 'center',
    // marginTop: hp(2),
    // marginHorizontal: Horizontal_padding,
    // width: '100%',
    // textAlign: 'left',
  },
  shadow: {
    // height: wp(10),
    // width: wp(10),
    // borderRadius: 10,
    // display: 'flex',
    // justifyContent:"center",
    // alignItems:"center"
    // backgroundColor: 'pink'
  },
  textInput: {
    // width: '100%',
    // textAlign: I18nManager.isRTL ? 'right' : 'center',
    height: "100%",
    // fontSize: FontSize.font14,
    // color: Color.primaryColor,
    // borderColor: 'blue',
    // display: 'flex',
    // flexDirection: 'row',
    margin: 10,
    borderBottomWidth: 1,
    borderRadius: wp(0),
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    // backgroundColor: 'pink'
  },
  errorInput: {
    borderBottomColor: "red",
  },
});
