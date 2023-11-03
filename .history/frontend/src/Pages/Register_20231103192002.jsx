import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faInfoCircle,
  faX,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Center,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { register } from "../Redux/action";
import axios from "axios";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9]{4,}@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,15}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const toast = useToast();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [age, setAge] = useState(0);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [show, setShow] = useState(false);
  const handleShowPasswordClick = () => setShow(!show);

  const [confirmShow, setConfirmShow] = useState(false);
  const handleConfirmShowPasswordClick = () => setConfirmShow(!confirmShow);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    // console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const payload = { username: userName, name, email: user, avatar, password: pwd, age, favourites: [], premium: false, elite: false };
      axios.post("https://gifted-kit-cow.cyclic.app/users/register", payload)
        .then((res) => {
          console.log("Register response :", res.data);
          toast({
            title: "Registration Successful",
            description: "Details are correctly provided",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setSuccess(true);
        })
        .catch(err => console.log({ "registration error": err.message }));
      // let result = register({ email: user, password: pwd, name: name, age: age });
      // if (result) {
      //   toast({
      //     title: "Registration Successful",
      //     description: "Details are correctly provided",
      //     status: "success",
      //     duration: 3000,
      //     isClosable: true,
      //     position: "top",
      //   });
      // }
      // setSuccess(true);
      // clear the input field values
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>Register</div>
  )
}

export default Register