import axios, {AxiosRequestConfig} from "axios"

export const fetchWithAxios = async (requestUrl:string, timeout?:number) => {
    let requestConfig:AxiosRequestConfig<any> = {};
    if(timeout) {
        const source = axios.CancelToken?.source();
        requestConfig = {...requestConfig, cancelToken: source?.token}
        setTimeout(()=> {
                source?.cancel()
        },timeout);
    };
    const res = await axios.get(requestUrl,requestConfig);
    return res
}