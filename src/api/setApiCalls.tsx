import axios from 'axios';

axios.defaults.withCredentials = true


export const setRegister = async (data:any) => {
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'register',
        data: {
            Email:data.Email,
            Name:data.Name,
            Password:data.Password,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded'},
    });
    
    return result;
}

export const setLogIn = async (User:string,Pass:string) => {
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'login',
        data: {
            username:User,
            password:Pass,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded'},
    });
    
    return result;
}

export const setVerify = async () => {
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'refreshToken',
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true'},
    });

    return result;
}

export const setAddAccount = async (alias:string,type:string,cardType:string,last4Digits:number,cardBrand:string,cutoffDate:number,payDate:number,limit:number,token:string) => {
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'insAccount',
        data: {
            alias: alias,
            type: type,
            cardType: cardType,
            last4Digits: last4Digits,
            cardBrand: cardBrand,
            cutoffDate: cutoffDate,
            payDate: payDate,
            limit: limit,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });
    
    return result;
}

export const getAccounts = async (type:string,token:string) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'Accounts',
        params: {
            type:type,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const insExpense = async (title:string,account:number,date:string,amount:number,category:string,type:string,comments:string,expAuto:boolean,idAccount:string,token:string) => {
    console.log(expAuto);
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'insExpense',
        data:{
            title: title,
            account: account,
            date: date,
            amount: amount,
            category: category,
            type: type,
            comments: comments,
            expAuto: expAuto,
            idAccount: idAccount    
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}