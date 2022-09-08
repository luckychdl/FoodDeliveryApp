import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const canGoNext = email && password;

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('비밀번호를 입력해주세요.');
    }
    Alert.alert('HI');
  }, [email, password]);
  const onChangeEmail = useCallback(text => {
    setEmail(text.trim());
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text.trim());
  }, []);
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  return (
    <DismissKeyboardView>
      <View style={styles.innerWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요."
          onChangeText={onChangeEmail}
          value={email}
          style={styles.textInput}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          keyboardType="email-address"
          ref={emailRef}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.innerWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={onChangePassword}
          style={styles.textInput}
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp} style={styles.signUpButton}>
          <Text style={styles.loginButtonText}>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}
const styles = StyleSheet.create({
  innerWrapper: {
    padding: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: 'gray',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    color: 'gray',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    flex: 1,
    marginRight: 4,
  },
  signUpButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 4,
    flex: 1,
    color: 'white',
    backgroundColor: 'blue',
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonZone: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
export default SignIn;
