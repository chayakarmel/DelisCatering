import { makeObservable, observable, action } from 'mobx'



class DataStore {


    //מערך שירותים
    services = [];
    //התחברות  כמנהל
    isLogin = false;
    //מערך פגישות
    appointments = [];
    isAppointment = true;
    //פרטי עסק
    businessDatas = [];





    constructor() {
        makeObservable(this, {

            // --------------Login--------------------
            isLogin: observable,
            setIsLogin: action,
            // --------------services-----------------
            services: observable,
            setServices: action,
            addNewService: action,
            // servicesArray: computed,
            //--------------Appointment----------------
            appointments: observable,
            setAppointment: action,
            addNewAppointment: action,
            isAppointment: observable,
            checkAppointment: action,
            //--------------BusinessData--------------
            businessDatas: observable,
            setBusinessData: action,
            getBusinessDatas:action,
        })
    }

    setIsLogin(status) {
        this.isLogin = status
    }

    setServices = (data) => {

        //  this.services = [...this.services, data];
        this.services = [...servicees, ...data];

    };

    addNewService = (service) => {
        this.services = [...this.services, service];
    }

    setAppointment = (data) => {

        console.log(data);
        const sortedData = [...data].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        this.appointments = sortedData;


    }

    addNewAppointment = (appointment) => {
        this.appointments = [...this.appointments, appointment];
    }

    checkAppointment = (status) => {
        this.isAppointment = status;
    }

    getBusinessDatas = (data) => {
        this.businessDatas = [...data];
    }


    setBusinessData = (data) => {
        console.log(data, "data")
    
        this.businessDatas = [...data];

    }



}

export default new DataStore();


const defaultBusinessData = {
    img: "https://www.delis.co.il/contentManagment/uploadedFiles/new/drushim_top_img.jpg",
    businessName: 'דליס ',
    address: 'בני ברק',
    phone: '073-7146548',
    logo: "https://www.delis.co.il/contentManagment/uploadedFiles/%D7%9C%D7%95%D7%92%D7%95%202020/delis_logo.png"

};

const servicees = [
    {
        name: "בר מתוקים",
        descripition: "לארוע מתוק ",
        price: '60',
        img: "https://delis.co.il/contentManagment/uploadedFiles/new%20photo%202020%20975/DSC_2486_975.jpg"
    }, {
        name: "משלוחי מנות",
        descripition: "משלוח מחמם לב ",
        price: '130',
        img: "https://www.delis.co.il/contentManagment/uploadedFiles/home%20page%20long%202020/DSC_4283_1920_572_2.jpg"
    }, {
        name: "חלבי",
        descripition: "תפריט מדהים ",
        price: '55',
        img: "https://delis.co.il/contentManagment/uploadedFiles/new%20photo%202020%20975/DSC_1138_975_650.jpg"
    }, {
        name: "מארזי אירוח",
        descripition: "לשמח את מי שאוהבים ",
        price: '60',
        img: "https://www.delis.co.il/contentManagment/uploadedFiles/new%20photo%202020%20975/DSC_4424_975.jpg"
    }
]
