import { Alert } from 'react-native';
import RNExitApp from 'react-native-kill-app';

export default class Global {

    static appName = "VETVILLE";

    static activeScreen = "DocDashboard";

    //colors 
    static primaryColor = "#012060";
    static secondaryColor = "#1ADEFA";
    static buttonColor1 = "#0AE5AB";
    static buttonColor2 = "#20C0F2";
    static viewButtonColor = "#1CB9AB";
    static backgroundColor = "#14558D";


    //API
    static DOMAIN = "https://vetvilleapi.accepire.co";
    static URL_login = Global.DOMAIN + "/api/identity/login";
    static URL_doctor_getfiltered = Global.DOMAIN + "/api/doctor/getfiltered";
    static URL_patient_appoinments = Global.DOMAIN + "/api/patient/appoinments/";
    static URL_appoinment_getprescriptions = Global.DOMAIN + "/api/appoinment/getprescriptions/";
    static URL_appoinment_getmedicalrecords = Global.DOMAIN + "/api/appoinment/getmedicalrecords/";
    static URL_changepassword = Global.DOMAIN + "/api/identity/changepassword";
    static URL_doctor_appoinments = Global.DOMAIN + "/api/doctor/appoinments/";
    static URL_doctor_getcounts = Global.DOMAIN + "/api/doctor/getcounts/";
    static URL_doctor_getpatients = Global.DOMAIN + "/api/doctor/getpatients/";
    
    //KEY
    static KEY_ISLOGIN = "isLogin";
    static KEY_USER = "user";
    static KEY_USER_TOKEN = "userToken";
    static KEY_USER_ROLES = "roles";
    static KEY_EMAIL = "email";
    static KEY_PASSWORD = "Password";




    static isoToDate = (value) => {
        if (value != "") {
            try {
                var dt = new Date(value);
                var montharr = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];            //return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
                return (dt.getDate() + " " + montharr[dt.getMonth()] + " " + dt.getFullYear());

            } catch (error) {
                alert(error)
            }
        }
        else {
            return new Date();
        }
    }



    static connectionFailed = (callback) => {
        Alert.alert(
            "Connection Failed",
            "Please check your internet connection",
            [
                {
                    text: "Exit",
                    onPress: () => RNExitApp.exitApp(),
                },
                { text: "Try Again", onPress: () => callback() }
            ],
            { cancelable: false }
        );
    }
}
