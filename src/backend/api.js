import axios from "axios";

export const getData = async (limit) =>{
    
    const res = await axios.get(`https://api.opendota.com/api/explorer?sql=select * from matches order by start_time desc limit ${limit} offset 0`);
    console.log(res.data.rows);
    return res.data.rows;
}