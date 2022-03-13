interface ICallable {
    execute: (data1?: any, data2?: any) => Promise<any>;
}