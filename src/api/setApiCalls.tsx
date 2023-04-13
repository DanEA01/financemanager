import { idID } from '@mui/material/locale';
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

export const setLogout = async (token:String) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'logout',
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const setAddAccount = async (id:string,alias:string,type:string,cardType:string,last4Digits:number,cardBrand:string,cutoffDate:number,payDate:number,limit:number,token:string) => {
    console.log(id);
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'insAccount',
        data: {
            id: id,
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

export const insExpense = async (id:string,title:string,account:number,date:string,amount:number,category:string,type:string,comments:string,expAuto:boolean,idAccount:string,token:string) => {
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'insExpense',
        data:{
            id:id,
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

export const getExpenses = async (idAccount:string,filter:string,token:string) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'Expenses',
        params: {
            idAccount: idAccount,
            filter: filter,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const getExpensesStats = async (idAccount:string,filter:string,token:string) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'expensesStats',
        params: {
            idAccount: idAccount,
            filter: filter,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const insIncome = async (id:string,title:string,account:number,date:string,amount:number,category:string,type:string,comments:string,incAuto:boolean,idAccount:string,token:string) => {
    const result = await axios({
        method: 'post',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'insIncome',
        data:{
            id:id,
            title: title,
            account: account,
            date: date,
            amount: amount,
            category: category,
            type: type,
            comments: comments,
            incAuto: incAuto,
            idAccount: idAccount    
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const getIncomes = async (idAccount:string,filter:string,token:string) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'Incomes',
        params: {
            idAccount: idAccount,
            filter: filter,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const getIncomesStats = async (idAccount:string,filter:string,token:string) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'incomesStats',
        params: {
            idAccount: idAccount,
            filter: filter,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const getAccountStats = async (filter:string,token:string) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'accountStats',
        params: {
            filter: filter,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}

export const topExpensesByMonth = async (month:number,token:string) => {
    const result = await axios({
        method: 'get',
        withCredentials: true,
        url: process.env.REACT_APP_API_ENDPOINT+ 'topExpensesByMonth',
        params: {
            month: month,
        },
        headers:{'Strict-Transport-Security': 'max-age=63072000','Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Credentials': 'true', 'Authorization' : 'Bearer '+token },
    });

    return result;
}