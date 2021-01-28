import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { readFileSync } from 'fs';
import * as _ from "lodash";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const text = readFileSync('sha.txt','utf8');
    context.res = { body: text };
};

export default httpTrigger;
